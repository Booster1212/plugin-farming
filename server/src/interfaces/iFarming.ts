import * as alt from 'alt-server';
import IAttachable from '@AthenaShared/interfaces/iAttachable.js';

import { BaseItem } from '@AthenaShared/interfaces/item.js';
import { Marker } from '@AthenaShared/interfaces/marker.js';
import { Blip } from 'alt-server';
import { Animation } from '@AthenaShared/interfaces/animation.js';
import { ProgressBar } from '@AthenaShared/interfaces/progressBar.js';
import { Particle } from '@AthenaShared/interfaces/particle.js';

interface CustomMarker extends Marker {
    isMarker: boolean;
}
export interface IFarming {
    routeName: string;
    requiredTool?: Array<string>;
    isAnimation: boolean;
    duration: number;

    blips?: Array<Partial<Blip>>;
    marker?: Partial<CustomMarker>;
    animation?: Partial<Animation>;
    attacheable?: IAttachable;
    progressBar?: Partial<ProgressBar>;
    particles?: Particle;

    spots: {
        positions: Array<alt.Vector3>;
    };

    outcome: Array<BaseItem>;
}
