import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    angleDelta,
    forwardKinematics,
    lerpAngle,
    solveTwoLinkIK,
    toDegrees,
    type ArmConfig,
    type Vec2,
} from "../../lib/kinematics";

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

const SIZE = 240;
const BASE: Vec2 = { x: 198, y: 214 };
const ARM: ArmConfig = { upperArm: 82, forearm: 72, elbowSign: -1 };
/** Where the gripper idles when the cursor leaves the window. */
const REST_TARGET: Vec2 = { x: 112, y: 112 };
/** Folded pose the arm unfolds from on mount. */
const INITIAL_ANGLES = { shoulder: -Math.PI / 2, elbow: 2.6 };

/** Per-frame interpolation toward the IK solution; lower = heavier arm. */
const FOLLOW = 0.16;
const GRAB_FOLLOW = 0.35;
const GRAB_HOLD_MS = 160;
const CLAW_OPEN_DEG = 26;
const CLAW_CLOSED_DEG = 4;

const MEDIA_QUERY = "(pointer: fine) and (min-width: 768px)";

interface Ping {
    id: number;
    x: number;
    y: number;
}

/**
 * Two-link robotic arm anchored to the bottom-right corner of the viewport.
 * The gripper tracks the cursor via analytic inverse kinematics; clicking
 * anywhere snaps the claws shut and emits a ping ring at the gripper.
 *
 * Only rendered for mouse-driven viewports (`pointer: fine`, ≥ md). Purely
 * decorative: `aria-hidden`, no pointer events, and it sits below the navbar.
 */
export function RoboticArm() {
    const [enabled, setEnabled] = useState(false);
    const [pings, setPings] = useState<Ping[]>([]);
    const reduceMotion = useReducedMotion();

    const svgRef = useRef<SVGSVGElement>(null);
    const upperArmRef = useRef<SVGGElement>(null);
    const forearmRef = useRef<SVGGElement>(null);
    const clawLeftRef = useRef<SVGGElement>(null);
    const clawRightRef = useRef<SVGGElement>(null);
    const readoutRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const mq = window.matchMedia(MEDIA_QUERY);
        const sync = () => setEnabled(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const svg = svgRef.current;
        if (!svg) return;

        const angles = { ...INITIAL_ANGLES };
        let target: Vec2 | null = null;
        let grab = 0;
        let grabTarget = 0;
        let grabTimer = 0;
        let frame = 0;
        let pingId = 0;
        const follow = reduceMotion ? 1 : FOLLOW;

        const toSvgSpace = (clientX: number, clientY: number): Vec2 => {
            const rect = svg.getBoundingClientRect();
            return {
                x: ((clientX - rect.left) / rect.width) * SIZE,
                y: ((clientY - rect.top) / rect.height) * SIZE,
            };
        };

        const render = () => {
            const shoulderDeg = toDegrees(angles.shoulder);
            const elbowDeg = toDegrees(angles.elbow);
            const clawDeg = CLAW_OPEN_DEG + (CLAW_CLOSED_DEG - CLAW_OPEN_DEG) * grab;

            upperArmRef.current?.setAttribute("transform", `translate(${BASE.x} ${BASE.y}) rotate(${shoulderDeg})`);
            forearmRef.current?.setAttribute("transform", `translate(${ARM.upperArm} 0) rotate(${elbowDeg})`);
            clawLeftRef.current?.setAttribute("transform", `translate(${ARM.forearm} 0) rotate(${-clawDeg})`);
            clawRightRef.current?.setAttribute("transform", `translate(${ARM.forearm} 0) rotate(${clawDeg})`);

            if (readoutRef.current) {
                readoutRef.current.textContent = `θ₁ ${Math.round(shoulderDeg)}°  θ₂ ${Math.round(elbowDeg)}°`;
            }
        };

        const tick = () => {
            frame = 0;
            const goal = solveTwoLinkIK(BASE, target ?? REST_TARGET, ARM);

            angles.shoulder = lerpAngle(angles.shoulder, goal.shoulder, follow);
            angles.elbow = lerpAngle(angles.elbow, goal.elbow, follow);
            grab += (grabTarget - grab) * GRAB_FOLLOW;

            render();

            const settled =
                Math.abs(angleDelta(angles.shoulder, goal.shoulder)) < 5e-4 &&
                Math.abs(angleDelta(angles.elbow, goal.elbow)) < 5e-4 &&
                Math.abs(grabTarget - grab) < 5e-3;

            if (!settled) frame = window.requestAnimationFrame(tick);
        };

        const wake = () => {
            if (frame === 0) frame = window.requestAnimationFrame(tick);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            target = toSvgSpace(e.clientX, e.clientY);
            wake();
        };

        const onPointerLeave = () => {
            target = null;
            wake();
        };

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            grabTarget = 1;
            window.clearTimeout(grabTimer);
            grabTimer = window.setTimeout(() => {
                grabTarget = 0;
                wake();
            }, GRAB_HOLD_MS);

            if (!reduceMotion) {
                const { effector } = forwardKinematics(BASE, angles, ARM);
                const id = ++pingId;
                setPings((current) => [...current, { id, x: effector.x, y: effector.y }]);
                window.setTimeout(() => setPings((current) => current.filter((p) => p.id !== id)), 600);
            }
            wake();
        };

        render();
        wake();
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerdown", onPointerDown, { passive: true });
        document.documentElement.addEventListener("pointerleave", onPointerLeave);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(grabTimer);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerdown", onPointerDown);
            document.documentElement.removeEventListener("pointerleave", onPointerLeave);
        };
    }, [enabled, reduceMotion]);

    if (!enabled) return null;

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed bottom-10 right-3 z-40 flex select-none flex-col items-end"
        >
            <svg ref={svgRef} width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="overflow-visible">
                {/* Mount plate */}
                <rect
                    x={BASE.x - 24}
                    y={BASE.y - 4}
                    width={48}
                    height={16}
                    rx={3}
                    className="fill-ink-raised stroke-ink-borderStrong"
                    strokeWidth={1}
                />
                <circle cx={BASE.x - 16} cy={BASE.y + 4} r={1.5} className="fill-ink-borderStrong" />
                <circle cx={BASE.x + 16} cy={BASE.y + 4} r={1.5} className="fill-ink-borderStrong" />

                {/* Upper arm: local +x runs shoulder → elbow */}
                <g ref={upperArmRef}>
                    <rect
                        x={0}
                        y={-6.5}
                        width={ARM.upperArm}
                        height={13}
                        rx={6.5}
                        className="fill-ink-raised stroke-ink-borderStrong"
                        strokeWidth={1}
                    />
                    <line x1={12} x2={ARM.upperArm - 12} y1={0} y2={0} className="stroke-ink-border" strokeWidth={1} />

                    {/* Forearm: local +x runs elbow → gripper */}
                    <g ref={forearmRef}>
                        <rect
                            x={0}
                            y={-5}
                            width={ARM.forearm}
                            height={10}
                            rx={5}
                            className="fill-ink-raised stroke-ink-borderStrong"
                            strokeWidth={1}
                        />
                        <line x1={10} x2={ARM.forearm - 14} y1={0} y2={0} className="stroke-ink-border" strokeWidth={1} />

                        {/* Elbow joint */}
                        <circle r={7} className="fill-ink-bg stroke-ink-borderStrong" strokeWidth={1} />
                        <circle r={2.2} className="fill-keyword" />

                        {/* Wrist */}
                        <rect
                            x={ARM.forearm - 4}
                            y={-6}
                            width={8}
                            height={12}
                            rx={2}
                            className="fill-ink-surface stroke-ink-borderStrong"
                            strokeWidth={1}
                        />

                        {/* Claws pivot at the wrist tip */}
                        <g ref={clawLeftRef}>
                            <path
                                d="M0 0 L14 -4 L18 -1"
                                className="fill-none stroke-text-secondary"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g ref={clawRightRef}>
                            <path
                                d="M0 0 L14 4 L18 1"
                                className="fill-none stroke-text-secondary"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </g>

                    {/* Shoulder joint, drawn last so it sits over both segments */}
                    <circle r={9} className="fill-ink-bg stroke-ink-borderStrong" strokeWidth={1} />
                    <circle r={2.8} className="fill-keyword" />
                </g>

                <AnimatePresence>
                    {pings.map((ping) => (
                        <motion.circle
                            key={ping.id}
                            cx={ping.x}
                            cy={ping.y}
                            initial={{ r: 4, opacity: 0.9 }}
                            animate={{ r: 24, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="fill-none stroke-keyword"
                            strokeWidth={1.5}
                        />
                    ))}
                </AnimatePresence>
            </svg>

            <span ref={readoutRef} className="mt-1 font-mono text-2xs tabular-nums text-text-comment/70" />
        </div>
    );
}
