import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { ServerMarkerController } from '../../../../server/streamers/marker';
import { ServerBlipController } from '../../../../server/systems/blip';
import { ItemEffects } from '../../../../server/systems/itemEffects';
import { INVENTORY_TYPE } from '../../../../shared/enums/inventoryTypes';
import { farmRegistry } from './defaults/farmingLists/farmRegistry';
import { Item } from '../../../../shared/interfaces/item';
import { IFarming } from './interfaces/iFarming';
import { config } from './config';
import { FarmingUtility } from './utility';
import { FarmingEvents } from './defaults/events';

export class FarmingController {
    static createSpots() {
        for (let x = 0; x < farmRegistry.length; x++) {
            let currentFarm = farmRegistry[x];

            if (currentFarm.blips) {
                currentFarm.blips.forEach((blip) =>
                    ServerBlipController.append({
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
                    ServerMarkerController.append({
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
        ItemEffects.add(FarmingEvents.HANDLE_FARMING, FarmingController.handleFarmingEvent);
        return farmRegistry.length;
    }

    private static handleRequiredTool(
        player: alt.Player,
        item: Item,
        farmingSpot: alt.Vector3,
        farm: IFarming,
        slot: number,
        type: INVENTORY_TYPE,
    ): void {
        FarmingUtility.log('Player is in range');
        if (
            farm.requiredTool.find(
                (t) => t.toLowerCase() === item.name.toLowerCase() || t.toLowerCase() === item.dbName.toLowerCase(),
            )
        ) {
            FarmingUtility.log('Farming: Item included');
            if (FarmingController.handleAntiMacro(player, farmingSpot, farm.spots.positions)) {
                FarmingUtility.log('AntiMacro is true!');
                FarmingController.handleFarming(player, item, farm, slot, type);
            } else {
                FarmingUtility.log('AntiMacro is false!');
                Athena.player.emit.notification(player, `[ANTIMACRO] - Already used this spot before.`);
            }
        } else {
            Athena.player.emit.notification(player, `You can't use this item here!`);
        }
    }

    private static async handleFarmingEvent(player: alt.Player, item: Item, slot: number, type: INVENTORY_TYPE) {
        FarmingUtility.log('Item Event was triggered');
        for (const farm of farmRegistry) {
            farm.spots.positions.forEach((farmingSpot) => {
                if (player.pos.isInRange(farmingSpot, config.rangeToSpot)) {
                    FarmingController.handleRequiredTool(player, item, farmingSpot, farm, slot, type);
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

        const makroKey = 'OSFarming:Spotused-antiMacro';

        let meta: Array<alt.Vector3> = player.getMeta(makroKey) as Array<alt.Vector3>;
        if (!meta) {
            FarmingUtility.log('AntiMacro: Meta is empty');
            player.setMeta(makroKey, Array.of(currentPosition));
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
            if (!config.useAntiMacro) return true;

            FarmingUtility.log('AntiMacro: position was recent');
            player.setMeta(makroKey, checkingList);
            return false;
        } else {
            FarmingUtility.log('AntiMacro: position wasnt used recent');
            checkingList.push(currentPosition);
            player.setMeta(makroKey, checkingList);
            return true;
        }
    }

    private static async handleFarming(
        player: alt.Player,
        toolToUse: Item,
        data: IFarming,
        itemSlot: number,
        inventoryType: INVENTORY_TYPE,
    ) {
        FarmingUtility.handleFreezeAndMeta(player);
        FarmingUtility.playFarmingAnimation(player, data);
        FarmingUtility.attachFarmingObject(player, data);
        FarmingUtility.createFarmingProgressBar(player, data);
        FarmingUtility.createFarmingParticles(player, data);

        alt.setTimeout(async () => {
            FarmingUtility.handleFarmingReward(player, data);
            FarmingUtility.checkItemDurability(player, toolToUse, inventoryType, itemSlot);
            FarmingUtility.resyncInventory(player);

            player.deleteMeta(`IsFarming`);
        }, data.farmDuration);
    }
}
