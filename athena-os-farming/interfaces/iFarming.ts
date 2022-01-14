import * as alt from 'alt-server';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';

export interface IFarming {
    routeName: string;
    requiredTool?: string;
    isAnimation?: boolean;

    blip?: {
        text: string;
        sprite: number;
        color: number;
        scale: number;
        isBlip: boolean;
        position: alt.Vector3;
    };

    marker?: {
        type: number;
        color: {
            r: number;
            g: number;
            b: number;
            a: number;
        };
        isMarker: boolean;
    };

    animation?: {
        dict: string;
        name: string;
        flags: ANIMATION_FLAGS;
        duration: number;
    };

    spots: {
        positions: Array<alt.Vector3>;
    };
}
