import * as alt from 'alt-server';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { ServerMarkerController } from '../../../server/streamers/marker';
import { ServerBlipController } from '../../../server/systems/blip';
import { InteractionController } from '../../../server/systems/interaction';
import { ItemFactory } from '../../../server/systems/item';
import { farmRegistry } from '../farmingLists/farmRegistry';
import { IFarming } from '../interfaces/iFarming';
import { OSFARMING_TRANSLATIONS } from './translations';
import { ItemSpecial } from '../../../shared/interfaces/item';

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

                InteractionController.add({
                    description: currentFarm.spots.interactionText,
                    position: currentFarm.spots.positions[spot],
                    callback: (player: alt.Player) => {
                        this.handleFarming(player, currentFarm, currentFarm.spots.positions[spot]);
                    },
                });
            }
        }
    }

    static async handleFarming(player: alt.Player, farmingData: IFarming, antiMacro: alt.Vector3) {
        if (farmingData.requiredTool != null) {
            const hasTool = playerFuncs.inventory.isInInventory(player, { name: farmingData.requiredTool });
            if (!hasTool) {
                playerFuncs.emit.notification(player, OSFARMING_TRANSLATIONS.NO_TOOL);
                return;
            }

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

            alt.setTimeout(async () => {
                let outcomeList = [];
                let allItems = playerFuncs.inventory
                    .getAllItems(player)
                    .filter((item) => item.name === farmingData.requiredTool && item.data.durability > 0);

                let currentTool: ItemSpecial = allItems.find((item) => item.rarity >= 0);
                switch (currentTool.rarity) {
                    // Rare Tool
                    case 1: {
                        outcomeList.push(farmingData.outcome.rare);
                    }
                    // Epic Tool
                    case 2: {
                        outcomeList.push(farmingData.outcome.epic);
                        // break; -> UNWANTED
                    }
                    // Common Tool
                    default: {
                        outcomeList.push(farmingData.outcome.common);
                        break;
                    }
                }
                
                const randomized = getRandomInt(0, outcomeList.length + 1);
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
                currentTool.data.durability -= 1;
                if (currentTool.data.durability <= 1) {
                    playerFuncs.inventory.findAndRemove(player, farmingData.requiredTool);
                } else if (currentTool.isEquipment) {
                    player.data.equipment[currentTool.dataIndex].data.durability = currentTool.data.durability;
                } else if (currentTool.isInventory) {
                    player.data.inventory[currentTool.dataIndex].data.durability = currentTool.data.durability;
                } else if (currentTool.isToolbar) {
                    player.data.toolbar[currentTool.dataIndex].data.durability = currentTool.data.durability;
                }

                playerFuncs.save.field(player, 'inventory', player.data.inventory);
                playerFuncs.sync.inventory(player);
                player.deleteMeta(`IsFarming`);
            }, farmingData.farmDuration);
        }
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
