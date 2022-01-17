import * as alt from 'alt-server';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';

export interface IFarming {
    routeName: string;
    requiredTool?: Array<string>;
    isAnimation: boolean;
    farmDuration: number;

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
        bobUpAndDown: boolean;
        rotate: boolean;
        isMarker: boolean;
    };

    animation?: {
        dict: string;
        name: string;
        flags: ANIMATION_FLAGS;
    };

    attacheable?: {
        bone: number;
        model: string;
        pos: alt.Vector3;
        rot: alt.Vector3;
    };

    particles?: {
        pos: alt.Vector3,
        dict: string,
        name: string,
        duration: number,
        scale: number
    };

    spots: {
        positions: Array<alt.Vector3>;
    };

    outcome?: {
        common: Array<string>;
        uncommon?: Array<string>;
        rare?: Array<string>;
        veryRare?: Array<string>;
        epic?: Array<string>;
        legendary?: Array<string>;
        unique?: Array<string>;
    }
}
