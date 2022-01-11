import * as alt from 'alt-server';

export const farmingBlips = [
    {
        text: 'Miners Place.',
        sprite: 88,
        scale: 1,
        color: 1,
        pos: { x: 2912.41748046875, y: 2778.765380859375, z: 44.96366882324219 - 1 } as alt.Vector3,
    },
    {
        text: 'Woodfellers Place.',
        sprite: 88,
        scale: 1,
        color: 1,
        pos: { x: -474.09478759765625, y: 5587.1962890625, z: 69.96195220947266 } as alt.Vector3,
    },
];

const miningPositions: alt.Vector3[] = [
    { x: 2975.733154296875, y: 2791.59716796875, z: 40.515140533447266 - 1 } as alt.Vector3,
    { x: 2966.3916015625, y: 2775.824462890625, z: 38.95657730102539 - 1 } as alt.Vector3,
    { x: 2951.238037109375, y: 2770.526611328125, z: 38.99069595336914 - 1 } as alt.Vector3,
    { x: 2937.0654296875, y: 2778.3662109375, z: 39.21839141845703 - 1 } as alt.Vector3,
    { x: 2927.2353515625, y: 2794.62744140625, z: 40.72378921508789 - 1 } as alt.Vector3,
    { x: 2932.526611328125, y: 2813.072021484375, z: 43.69724655151367 - 1 } as alt.Vector3,
    { x: 2947.60986328125, y: 2817.997802734375, z: 42.51972579956055 - 1 } as alt.Vector3,
    { x: 2966.80712890625, y: 2806.69384765625, z: 42.09012222290039 - 1 } as alt.Vector3,
    { x: 2953.723876953125, y: 2789.539794921875, z: 41.44651794433594 - 1 } as alt.Vector3,
];

export const woodPositions: alt.Vector3[] = [
    { x: -474.09478759765625, y: 5587.1962890625, z: 69.96195220947266 - 1 } as alt.Vector3,
    { x: -475.7586975097656, y: 5583.57177734375, z: 70.50320434570312 - 1 } as alt.Vector3,
    { x: -480.1531982421875, y: 5614.33544921875, z: 65.89505004882812 - 1 } as alt.Vector3,
    { x: -485.7178955078125, y: 5620.8798828125, z: 64.20068359375 - 1 } as alt.Vector3,
];

// Build it yourself, its free and open source, so what? ;)
export const tomatoPositions: alt.Vector3[] = [
    // { },
];

export const allRoutes = [miningPositions, woodPositions /*tomatoPositions*/];
