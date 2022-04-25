import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { ServerMarkerController } from '../../../../server/streamers/marker';
import { ServerBlipController } from '../../../../server/systems/blip';
import { ItemFactory } from '../../../../server/systems/item';
import { ItemEffects } from '../../../../server/systems/itemEffects';
import { INVENTORY_TYPE } from '../../../../shared/enums/inventoryTypes';
import IAttachable from '../../../../shared/interfaces/iAttachable';
import { Item } from '../../../../shared/interfaces/item';
import { Particle } from '../../../../shared/interfaces/particle';
import { farmRegistry } from './defaults/farmingLists/farmRegistry';
import { IFarming } from './interfaces/iFarming';

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
        ItemEffects.add('OSFarming:Server:handleFarming', FarmingController.handleFarmingEvent);
        return farmRegistry.length;
    }

    private static async handleFarmingEvent(player: alt.Player, item: Item, slot: number, type: INVENTORY_TYPE) {
        let wasFarming = false;
        for (const farm of farmRegistry) {
            if (farm.requiredTool.includes(item.name)) {
                farm.spots.positions.forEach((farmingSpot) => {
                    if (player.pos.isInRange(farmingSpot, 3.5)) {
                        FarmingController.handleFarming(player, item, farm, farmingSpot, slot, type);
                        wasFarming = true;
                    }
                });
            }
        }
        if (!wasFarming) {
            Athena.player.emit.notification(player, `You can't use this item here!`);
        }
    }

    private static async handleFarming(
        player: alt.Player,
        toolToUse: Item,
        farmingData: IFarming,
        antiMacro: alt.Vector3,
        itemSlot: number,
        inventoryType: INVENTORY_TYPE,
    ) {
        if (player.getMeta(`IsFarming`) === true) {
            return;
        }

        if (player.getMeta(`Spotused-${antiMacro.x}`) === antiMacro.x) {
            Athena.player.emit.notification(player, `[ANTIMACRO] - Already used this spot before.`);
            return;
        }

        player.setMeta(`Spotused-${antiMacro.x}`, antiMacro.x);
        player.setMeta(`IsFarming`, true);

        Athena.player.safe.setPosition(player, player.pos.x, player.pos.y, player.pos.z);
        Athena.player.set.frozen(player, true);

        alt.setTimeout(() => {
            player.deleteMeta(`Spotused-${antiMacro.x}`);
        }, FarmingController.getRandomInt(60000, 180000));

        Athena.player.emit.animation(
            player,
            farmingData.animation.dict,
            farmingData.animation.name,
            farmingData.animation.flags,
            farmingData.farmDuration,
        );

        if (farmingData.attacheable) {
            const objectToAttach: IAttachable = {
                model: farmingData.attacheable.model,
                pos: farmingData.attacheable.pos,
                rot: farmingData.attacheable.rot,
                bone: farmingData.attacheable.bone,
            };
            Athena.player.emit.objectAttach(player, objectToAttach, farmingData.farmDuration);
        }

        if (farmingData.progressBar) {
            Athena.player.emit.createProgressBar(player, {
                uid: `Farming-${player.data._id.toString()}`,
                color: farmingData.progressBar.color as alt.RGBA,
                distance: farmingData.progressBar.distance,
                milliseconds: farmingData.farmDuration,
                position: player.pos,
                text: farmingData.progressBar.text,
            });
        }

        if (farmingData.particles) {
            const particle: Particle = {
                pos: farmingData.particles.pos,
                dict: farmingData.particles.dict,
                name: farmingData.particles.name,
                duration: farmingData.particles.duration,
                scale: farmingData.particles.scale,
            };
            Athena.player.emit.particle(player, particle, true);
        }

        alt.setTimeout(async () => {
            let outcomeList = [];

            // If tool is not required or we dont have one, we just return the common list.
            if ((!toolToUse.rarity || toolToUse.rarity === 0 || toolToUse.rarity < 3) && farmingData.outcome.common) {
                outcomeList.push(farmingData.outcome.common);
            }

            if (toolToUse.rarity >= 1 && toolToUse.rarity < 3 && farmingData.outcome.uncommon) {
                outcomeList.push(farmingData.outcome.uncommon);
            }

            if (toolToUse.rarity >= 2 && toolToUse.rarity < 4 && farmingData.outcome.rare) {
                outcomeList.push(farmingData.outcome.rare);
            }

            if (toolToUse.rarity >= 3 && toolToUse.rarity < 5 && farmingData.outcome.veryRare) {
                outcomeList.push(farmingData.outcome.veryRare);
            }

            if (toolToUse.rarity >= 4 && toolToUse.rarity < 6 && farmingData.outcome.epic) {
                outcomeList.push(farmingData.outcome.epic);
            }

            if (toolToUse.rarity >= 5 && toolToUse.rarity <= 6 && farmingData.outcome.legendary) {
                outcomeList.push(farmingData.outcome.legendary);
            }

            if (toolToUse.rarity == 6 && farmingData.outcome.unique) {
                outcomeList.push(farmingData.outcome.unique);
            }

            if (!outcomeList || outcomeList.length === 0) {
                Athena.player.emit.notification(player, `You found nothing!`);
                return;
            }

            const randomized = FarmingController.getRandomInt(0, outcomeList.length);
            const itemToAdd = await ItemFactory.getByName(outcomeList[0][randomized]);
            const hasItem = Athena.player.inventory.isInInventory(player, { name: itemToAdd.name });
            const emptySlot = Athena.player.inventory.getFreeInventorySlot(player);

            if (!hasItem) {
                Athena.player.inventory.inventoryAdd(player, itemToAdd, emptySlot.slot);
                Athena.player.emit.notification(player, `You've found ${itemToAdd.name}!`);
            } else {
                player.data.inventory[hasItem.index].quantity += 1;
                Athena.player.emit.notification(player, `You've found ${itemToAdd.name}!`);
            }

            //Does the Item have a durability?
            if (toolToUse.data.durability) {
                if (INVENTORY_TYPE.INVENTORY == inventoryType) {
                    if (toolToUse.data.durability <= 1) {
                        Athena.player.inventory.inventoryRemove(player, itemSlot);
                    } else {
                        let index = player.data.inventory.findIndex((item) => item.slot === itemSlot);
                        player.data.inventory[index].data.durability -= 1;
                    }
                } else if (INVENTORY_TYPE.TOOLBAR == inventoryType) {
                    if (toolToUse.data.durability <= 1) {
                        Athena.player.inventory.toolbarRemove(player, itemSlot);
                    } else {
                        let index = player.data.toolbar.findIndex((item) => item.slot === itemSlot);
                        player.data.toolbar[index].data.durability -= 1;
                    }
                }
            }
            Athena.player.save.field(player, 'inventory', player.data.inventory);
            Athena.player.save.field(player, 'toolbar', player.data.toolbar);
            Athena.player.sync.inventory(player);
            Athena.player.set.frozen(player, false);
            
            player.deleteMeta(`IsFarming`);
        }, farmingData.farmDuration);
    }

    /**
     * Generate a random integer between two numbers.
     * @param {number} min - The minimum number in the range.
     * @param {number} max - the maximum number of times the function will be called.
     * @returns A random integer between min and max.
     */
    private static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}