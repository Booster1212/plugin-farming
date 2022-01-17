import * as alt from 'alt-server';
import IAttachable from '../../../shared/interfaces/iAttachable';

import { ServerMarkerController } from '../../../server/streamers/marker';
import { ServerBlipController } from '../../../server/systems/blip';
import { farmRegistry } from '../farmingLists/farmRegistry';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { ItemFactory } from '../../../server/systems/item';
import { Particle } from '../../../shared/interfaces/particle';
import { IFarming } from '../interfaces/IFarming';
import { Item } from '../../../shared/interfaces/item';

export class FarmingController {
    /**
     * Create all the spots and blips for the farms.
     * @returns None
     */
    static createSpots() {
        for (let x = 0; x < farmRegistry.length; x++) {
            let currentFarm = farmRegistry[x];

            if (currentFarm.blip.isBlip) {
                ServerBlipController.append({
                    pos: currentFarm.blip.position,
                    shortRange: true,
                    sprite: currentFarm.blip.sprite,
                    color: currentFarm.blip.color,
                    text: currentFarm.blip.text,
                    scale: currentFarm.blip.scale,
                    identifier: `${currentFarm.routeName}-${x}`,
                });
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
                        },
                        uid: `${currentFarm.routeName}-${x}`,
                    });
                }
            }
        }
        alt.on('OSFarming:Server:handleFarming', (player: alt.Player, item: Item) => {
            let wasFarming = false;
            for (const farm of farmRegistry) {
                if (farm.requiredTool.includes(item.name)) {
                    farm.spots.positions.forEach((farmimngSpot) => {
                        if (player.pos.isInRange(farmimngSpot, 3.5)) {
                            FarmingController.handleFarming(player, item, farm, farmimngSpot);
                            wasFarming = true;
                        }
                    });
                }
            }
            if (!wasFarming) {
                playerFuncs.emit.notification(player, `You can't use this item here!`);
            }
        });
    }

    static async handleFarming(player: alt.Player, toolToUse: Item, farmingData: IFarming, antiMacro: alt.Vector3) {
        if (player.getMeta(`IsFarming`) === true) {
            return;
        }
        if (player.getMeta(`Spotused-${antiMacro.x}`) === antiMacro.x) {
            playerFuncs.emit.notification(player, `[ANTIMACRO] - Already used this spot before.`);
            return;
        }
        player.setMeta(`Spotused-${antiMacro.x}`, antiMacro.x);
        player.setMeta(`IsFarming`, true);

        alt.setTimeout(() => {
            player.deleteMeta(`Spotused-${antiMacro.x}`);
        }, getRandomInt(60000, 180000));

        playerFuncs.emit.animation(
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
            playerFuncs.emit.objectAttach(player, objectToAttach, farmingData.farmDuration);
        }

        if (farmingData.particles) {
            const particle: Particle = {
                pos: farmingData.particles.pos,
                dict: farmingData.particles.dict,
                name: farmingData.particles.name,
                duration: farmingData.particles.duration,
                scale: farmingData.particles.scale,
            };
            playerFuncs.emit.particle(player, particle, true);
        }

        alt.setTimeout(async () => {
            let outcomeList = [];
            // console.log(`index 0`);
            // console.log(player.data.toolbar[0]);

            // console.log(`index 1`);
            // console.log(player.data.toolbar[1]);
            // console.log(JSON.stringify(player.data.toolbar, null, '\t'));
            //Wenn wir kein Tool brauchen/haben, nehmen wir auch die common-Liste
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
                playerFuncs.emit.notification(player, `You found nothing!`);
                return;
            }

            const randomized = getRandomInt(0, outcomeList.length);
            const itemToAdd = await ItemFactory.getByName(outcomeList[0][randomized]);
            const hasItem = playerFuncs.inventory.isInInventory(player, { name: itemToAdd.name });
            const emptySlot = playerFuncs.inventory.getFreeInventorySlot(player);

            if (!hasItem) {
                playerFuncs.inventory.inventoryAdd(player, itemToAdd, emptySlot.slot);
                playerFuncs.emit.notification(player, `You've found ${itemToAdd.name}!`);
            } else {
                player.data.inventory[hasItem.index].quantity += 1;
                playerFuncs.emit.notification(player, `You've found ${itemToAdd.name}!`);
            }

            let toolbarItem = playerFuncs.inventory.isInToolbar(player, { name: toolToUse.name });
            if (toolbarItem) {
                if (toolToUse.data.durability <= 1) {
                    playerFuncs.inventory.toolbarRemove(player, toolbarItem.index);
                } else {
                    player.data.toolbar[toolbarItem.index].data.durability -= 1;
                }
            }
            
            let invItem = playerFuncs.inventory.isInInventory(player, {name: toolToUse.name });
            if (invItem) {
                if (toolToUse.data.durability <= 1) {
                    playerFuncs.inventory.inventoryRemove(player, toolbarItem.index);
                } else {
                    player.data.inventory[invItem.index].data.durability -= 1;
                }
            }
            playerFuncs.save.field(player, 'inventory', player.data.inventory);
            playerFuncs.save.field(player, 'toolbar', player.data.toolbar);
            playerFuncs.sync.inventory(player);
            player.deleteMeta(`IsFarming`);
        }, farmingData.farmDuration);
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
