/**
 * Planar two-link inverse kinematics.
 *
 * Coordinate convention is screen/SVG space: +x right, +y down, angles in
 * radians measured from +x with positive values rotating clockwise (the
 * natural result of atan2 on y-down coordinates). All functions are pure.
 */

export interface Vec2 {
    readonly x: number;
    readonly y: number;
}

export interface ArmConfig {
    /** Length of the shoulder → elbow segment. */
    readonly upperArm: number;
    /** Length of the elbow → end-effector segment. */
    readonly forearm: number;
    /**
     * Which of the two mirror-image solutions to use. Positive bends the
     * elbow clockwise (toward +y, "down" on screen); negative bends it
     * counter-clockwise ("up" on screen).
     */
    readonly elbowSign: 1 | -1;
}

export interface JointAngles {
    /** Absolute angle of the upper arm. */
    readonly shoulder: number;
    /** Bend of the forearm relative to the upper arm. 0 = fully extended. */
    readonly elbow: number;
}

export interface IKSolution extends JointAngles {
    /** False when the target was outside the reachable annulus and had to be clamped. */
    readonly reachable: boolean;
    /** The point the end-effector will actually land on (equals `target` when reachable). */
    readonly effector: Vec2;
}

export const TAU = Math.PI * 2;

/** Tiny margin that keeps acos() off the ±1 singularities where the arm would lock straight. */
const EPSILON = 1e-3;

export function distance(a: Vec2, b: Vec2): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
}

export function clamp(value: number, min: number, max: number): number {
    return value < min ? min : value > max ? max : value;
}

/**
 * Solve joint angles so the end-effector reaches `target` from `base`.
 *
 * Law of cosines on the triangle (base, elbow, target):
 *   d² = L1² + L2² − 2·L1·L2·cos(π − elbow)
 *   ⇒ cos(elbow) = (d² − L1² − L2²) / (2·L1·L2)
 * The shoulder is the direction to the target minus the angle the forearm
 * contributes to that direction, atan2(L2·sin e, L1 + L2·cos e).
 */
export function solveTwoLinkIK(base: Vec2, target: Vec2, config: ArmConfig): IKSolution {
    const { upperArm: l1, forearm: l2, elbowSign } = config;

    const dx = target.x - base.x;
    const dy = target.y - base.y;
    const rawDistance = Math.hypot(dx, dy);

    const minReach = Math.abs(l1 - l2) + EPSILON;
    const maxReach = l1 + l2 - EPSILON;
    const d = clamp(rawDistance, minReach, maxReach);
    const reachable = d === rawDistance;

    // Direction to the target; fall back to "straight up" when the target sits on the base.
    const heading = rawDistance > EPSILON ? Math.atan2(dy, dx) : -Math.PI / 2;

    const cosElbow = clamp((d * d - l1 * l1 - l2 * l2) / (2 * l1 * l2), -1, 1);
    const elbow = elbowSign * Math.acos(cosElbow);
    const shoulder = heading - Math.atan2(l2 * Math.sin(elbow), l1 + l2 * Math.cos(elbow));

    const effector: Vec2 = reachable
        ? target
        : { x: base.x + Math.cos(heading) * d, y: base.y + Math.sin(heading) * d };

    return { shoulder, elbow, reachable, effector };
}

/** Joint positions for a given pose. Used to place the ping ring at the gripper. */
export function forwardKinematics(
    base: Vec2,
    angles: JointAngles,
    config: ArmConfig,
): { readonly elbow: Vec2; readonly effector: Vec2 } {
    const elbow: Vec2 = {
        x: base.x + Math.cos(angles.shoulder) * config.upperArm,
        y: base.y + Math.sin(angles.shoulder) * config.upperArm,
    };
    const total = angles.shoulder + angles.elbow;
    const effector: Vec2 = {
        x: elbow.x + Math.cos(total) * config.forearm,
        y: elbow.y + Math.sin(total) * config.forearm,
    };
    return { elbow, effector };
}

/** Signed shortest difference from `a` to `b`, in (−π, π]. */
export function angleDelta(a: number, b: number): number {
    let delta = (b - a) % TAU;
    if (delta > Math.PI) delta -= TAU;
    if (delta <= -Math.PI) delta += TAU;
    return delta;
}

/** Wrap an angle into (−π, π]. */
export function normalizeAngle(angle: number): number {
    return angleDelta(0, angle);
}

/** Interpolate between angles along the shortest arc so the arm never spins the long way round. */
export function lerpAngle(a: number, b: number, t: number): number {
    return normalizeAngle(a + angleDelta(a, b) * t);
}

export function toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
}
