import * as alt from 'alt-server';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';
import { Item } from '../../../shared/interfaces/item';

export interface IFarming {
    routeName: string;
    requiredTool?: string;
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

    spots: {
        interactionText?: string;
        positions: Array<alt.Vector3>;
    };

    outcome?: {
        common: Array<string>;
        uncommon?: Array<string>;
        rare?: Array<string>;
        epic?: Array<string>;
        legendary?: Array<string>;
        ultra?: Array<string>;
    }
}
