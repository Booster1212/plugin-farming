import * as alt from 'alt-server';
import { OSFarming } from '..';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { ServerMarkerController } from '../../../server/streamers/marker';
import { ServerBlipController } from '../../../server/systems/blip';
import { InteractionController } from '../../../server/systems/interaction';
import { farmRegistry } from '../farmingLists/farmRegistry';
import { IFarming } from '../interfaces/iFarming';
import { OSFARMING_TRANSLATIONS } from './translations';

export class FarmingController {
    /**
     * Create all the spots and blips for the farms.
     * @returns None
     */
    static createSpots() {
        for (let x = 0; x < farmRegistry.length; x++) {
            if (farmRegistry[x].blip.isBlip) {
                ServerBlipController.append({
                    pos: farmRegistry[x].blip.position,
                    shortRange: true,
                    sprite: farmRegistry[x].blip.sprite,
                    color: farmRegistry[x].blip.color,
                    text: farmRegistry[x].blip.text,
                    scale: farmRegistry[x].blip.scale,
                    identifier: `${farmRegistry[x].routeName}-${x}`,
                });
            }

            for (let spot = 0; spot < farmRegistry[x].spots.positions.length; spot++) {
                if (farmRegistry[x].marker.isMarker) {
                    ServerMarkerController.append({
                        pos: {
                            x: farmRegistry[x].spots.positions[spot].x,
                            y: farmRegistry[x].spots.positions[spot].y,
                            z: farmRegistry[x].spots.positions[spot].z + 1,
                        },
                        type: farmRegistry[x].marker.type,
                        bobUpAndDown: true,
                        color: {
                            r: farmRegistry[x].marker.color.r,
                            g: farmRegistry[x].marker.color.g,
                            b: farmRegistry[x].marker.color.b,
                            a: farmRegistry[x].marker.color.a,
                        },
                        uid: `${farmRegistry[x].routeName}-${x}`,
                    });
                }

                InteractionController.add({
                    description: 'Start Farming...',
                    position: farmRegistry[x].spots.positions[spot],
                    callback: (player: alt.Player) => {
                        this.startFarming(player, farmRegistry[x]);
                    },
                });
            }
        }
    }

    static startFarming(player: alt.Player, farmingData: IFarming) {

    }
}

/**
 * Generate a random integer between two numbers.
 * @param {number} min - The minimum number in the range.
 * @param {number} max - number
 * @returns A random integer between min and max.
 */
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
