import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import * as FarmRegistry from '@AthenaPlugins/plugin-farming/server/src/config/registry.js';
import * as FarmConfig from '@AthenaPlugins/plugin-farming/server/src/config/index.js';

import { IFarming } from './interfaces/iFarming.js';
import { FarmingUtility } from './utility.js';

export class FarmingController {
    static createSpots() {
        for (let x = 0; x < FarmRegistry.main.length; x++) {
            let currentFarm = FarmRegistry.main[x];

            if (currentFarm.blips) {
                currentFarm.blips.forEach((blip) =>
                    Athena.controllers.blip.append({
                        pos: blip.pos,
                        shortRange: true,
                        sprite: blip.sprite,
                        color: blip.color,
                        text: blip.name,
                        scale: blip.scale,
                        identifier: `${currentFarm.routeName}-${x}`,
                    }),
                );
            }

            if (currentFarm.marker) {
                for (const element of currentFarm.spots.positions) {
                    Athena.controllers.marker.append({
                        pos: {
                            x: element.x,
                            y: element.y,
                            z: element.z + 1,
                        },
                        type: currentFarm.marker.type,
                        bobUpAndDown: currentFarm.marker.bobUpAndDown,
                        rotate: currentFarm.marker.rotate,
                        color: {
                            r: currentFarm.marker.color.r,
                            g: currentFarm.marker.color.g,
                            b: currentFarm.marker.color.b,
                            a: currentFarm.marker.color.a,
                        } as alt.RGBA,
                        uid: `${currentFarm.routeName}-${x}`,
                    });
                }
            }
        }
        return FarmRegistry.main.length;
    }

    private static handleRequiredTool(
        player: alt.Player,
        farmingSpot: alt.Vector3,
        farm: IFarming,
        slot: number,
        type: 'inventory' | 'toolbar',
    ): void {
        FarmingUtility.log('Player is in range');

        const item = Athena.player.toolbar.getAt(player, slot);

        if (!item) {
            FarmingUtility.log(`No item in slot ${slot}`);
            Athena.player.emit.notification(player, `You don't have an item in this slot.`);
            return;
        }

        const lowerCaseItemName = item.dbName.toLowerCase();
        const requiredToolFound = farm.requiredTool.find((t) => t.toLowerCase() === lowerCaseItemName);

        if (requiredToolFound) {
            FarmingUtility.log('Farming: Item included');

            if (FarmingController.handleAntiMacro(player, farmingSpot, farm.spots.positions)) {
                FarmingUtility.log('AntiMacro is true!');
                FarmingController.handleFarming(player, farm);
            } else {
                FarmingUtility.log('AntiMacro is false!');
                Athena.player.emit.notification(player, `[ANTIMACRO] - Already used this spot before.`);
            }
        } else {
            FarmingUtility.log(`requiredTool => ${farm.requiredTool} | item = ${lowerCaseItemName}`);
            Athena.player.emit.notification(player, `You can't use this item here!`);
        }
    }

    static async handleFarmingEvent(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
        FarmingUtility.log('Item Event was triggered');
        for (const farm of FarmRegistry.main) {
            farm.spots.positions.forEach((farmingSpot) => {
                if (player.pos.isInRange(farmingSpot, FarmConfig.general.rangeToSpot)) {
                    FarmingController.handleRequiredTool(player, farmingSpot, farm, slot, type);
                }
            });
        }
    }

    private static handleAntiMacro(player: alt.Player, curPos: alt.Vector3, positions: Array<alt.Vector3>) {
        const macroKey = 'OSFarming:Spotused-antiMacro';

        let meta: Array<alt.Vector3> = (player.getMeta(macroKey) as Array<alt.Vector3>) || [];

        if (positions.length === 1) {
            FarmingUtility.log('AntiMacro - length == 1');
            return true;
        }

        const randomInt = FarmingUtility.getRandomInt(meta.length / 2, positions.length - 1);
        FarmingUtility.log('AntiMacro: position-length ' + positions.length);
        FarmingUtility.log('AntiMacro: Random int ' + randomInt);

        let checkingList: Array<alt.Vector3> =
            meta.length <= randomInt || meta.length === 1 ? meta : meta.slice(randomInt);
        FarmingUtility.log('AntiMacro: checkingList-length ' + checkingList.length);

        if (checkingList.some((c) => c.x === curPos.x && c.y === curPos.y && c.z === curPos.z)) {
            if (!FarmConfig.general.antiMacro) {
                FarmingUtility.log('AntiMacro: position was recent');
                player.setMeta(macroKey, checkingList);
                return false;
            }
        } else {
            FarmingUtility.log('AntiMacro: position was not used recently');
            checkingList.push(curPos);
            player.setMeta(macroKey, checkingList);
            return true;
        }
        return false;
    }

    private static async handleFarming(player: alt.Player, data: IFarming) {
        FarmingUtility.handleFreezeAndMeta(player);
        FarmingUtility.playFarmingAnimation(player, data);
        FarmingUtility.attachFarmingObject(player, data);
        FarmingUtility.createFarmingProgressBar(player, data);
        FarmingUtility.createFarmingParticles(player, data);

        alt.setTimeout(async () => {
            FarmingUtility.handleFarmingReward(player, data);
            player.deleteMeta(`IsFarming`);
        }, data.duration);
    }
}
