import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import * as FarmRegistry from '@AthenaPlugins/plugin-farming/server/src/config/registry';
import * as FarmConfig from '@AthenaPlugins/plugin-farming/server/src/config/index';

import { IFarming } from './interfaces/iFarming';
import { FarmingUtility } from './utility';

export class FarmingController {
    static createSpots() {
        for (let x = 0; x < FarmRegistry.main.length; x++) {
            let currentFarm = FarmRegistry.main[x];

            if (currentFarm.blips) {
                currentFarm.blips.forEach((blip) =>
                    Athena.controllers.blip.append({
                        pos: blip.position,
                        shortRange: true,
                        sprite: blip.sprite,
                        color: blip.color,
                        text: blip.text,
                        scale: blip.scale,
                        identifier: `${currentFarm.routeName}-${x}`,
                    }),
                );
            }

            for (let spot = 0; spot < currentFarm.spots.positions.length; spot++) {
                if (currentFarm.marker.isMarker) {
                    Athena.controllers.marker.append({
                        pos: {
                            x: currentFarm.spots.positions[spot].x,
                            y: currentFarm.spots.positions[spot].y,
                            z: currentFarm.spots.positions[spot].z + 1,
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
        if (farm.requiredTool.find((t) => t.toLowerCase() === item.dbName.toLowerCase())) {
            FarmingUtility.log('Farming: Item included');
            if (FarmingController.handleAntiMacro(player, farmingSpot, farm.spots.positions)) {
                FarmingUtility.log('AntiMacro is true!');
                FarmingController.handleFarming(player, farm, slot, type);
            } else {
                FarmingUtility.log('AntiMacro is false!');
                Athena.player.emit.notification(player, `[ANTIMACRO] - Already used this spot before.`);
            }
        } else {
            FarmingUtility.log(`requiredTool => ${farm.requiredTool} | item = ${item.dbName.toLowerCase()}`);
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

    private static handleAntiMacro(
        player: alt.Player,
        currentPosition: alt.Vector3,
        positions: Array<alt.Vector3>,
    ): boolean {
        if (positions.length === 1) {
            FarmingUtility.log('AntiMacro - length == 1');
            return true;
        }

        const macroKey = 'OSFarming:Spotused-antiMacro';

        let meta: Array<alt.Vector3> = player.getMeta(macroKey) as Array<alt.Vector3>;
        if (!meta) {
            FarmingUtility.log('AntiMacro: Meta is empty');
            player.setMeta(macroKey, Array.of(currentPosition));
            return true;
        }

        const randomInt = FarmingUtility.getRandomInt(meta.length / 2, positions.length - 1);
        FarmingUtility.log('AntiMacro: position-length ' + positions.length);
        FarmingUtility.log('AntiMacro: Random int ' + randomInt);

        let checkingList: Array<alt.Vector3> =
            meta.length <= randomInt || meta.length === 1 ? meta : meta.slice(randomInt);
        FarmingUtility.log('AntiMacro: checkingList-length ' + checkingList.length);

        if (
            checkingList.find(
                (c) => c.x === currentPosition.x && c.y === currentPosition.y && c.z === currentPosition.z,
            )
        ) {
            if (!FarmConfig.general.antiMacro) return true;

            FarmingUtility.log('AntiMacro: position was recent');
            player.setMeta(macroKey, checkingList);
            return false;
        } else {
            FarmingUtility.log('AntiMacro: position wasnt used recent');
            checkingList.push(currentPosition);
            player.setMeta(macroKey, checkingList);
            return true;
        }
    }

    private static async handleFarming(
        player: alt.Player,
        data: IFarming,
        itemSlot: number,
        inventoryType: 'inventory' | 'toolbar',
    ) {
        FarmingUtility.handleFreezeAndMeta(player);
        FarmingUtility.playFarmingAnimation(player, data);
        FarmingUtility.attachFarmingObject(player, data);
        FarmingUtility.createFarmingProgressBar(player, data);
        FarmingUtility.createFarmingParticles(player, data);

        alt.setTimeout(async () => {
            FarmingUtility.handleFarmingReward(player, data);
            FarmingUtility.checkItemDurability(player, itemSlot, inventoryType);

            player.deleteMeta(`IsFarming`);
        }, data.farmDuration);
    }
}
