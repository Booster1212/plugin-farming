import { Item } from '@AthenaShared/interfaces/item';
import * as alt from 'alt-server';
import { ANIMATION_FLAGS } from '../../../../../shared/flags/animationFlags';

export interface IFarming {
    routeName: string;
    requiredTool?: Array<string>;
    isAnimation: boolean;
    farmDuration: number;

    blips?: [
        {
            text: string;
            sprite: number;
            color: number;
            scale: number;
            position: alt.Vector3;
        },
    ];

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

    progressBar?: {
        color: {
            r: number;
            g: number;
            b: number;
            a: number;
        };
        distance: number;
        text: string;
    };

    particles?: {
        pos: alt.Vector3;
        dict: string;
        name: string;
        duration: number;
        scale: number;
    };

    spots: {
        positions: Array<alt.Vector3>;
    };

    outcome?: Array<Item>;
}
