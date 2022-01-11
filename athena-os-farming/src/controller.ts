import * as alt from 'alt-server';
import { OSFarming } from '../index';
import { ServerMarkerController } from '../../../server/streamers/marker';
import { ServerBlipController } from '../../../server/systems/blip';
import { InteractionController } from '../../../server/systems/interaction';
import { ItemFactory } from '../../../server/systems/item';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';
import { Animation } from '../../../shared/interfaces/animation';
import { farmingTools, itemLists } from '../data/farmableItems';
import { animationLists } from '../data/farmAnimations';
import { allRoutes, farmingBlips } from '../data/farmPositions';
import { playerFuncs } from '../../../server/extensions/extPlayer';

export class FarmingController {
    /**
     * Create all the blips and markers for the farming spots.
     * @returns nothing
     */
    static buildSpots() {
        for (let i = 0; i < farmingBlips.length; i++) {
            ServerBlipController.append({
                pos: farmingBlips[i].pos,
                shortRange: true,
                sprite: farmingBlips[i].sprite,
                color: farmingBlips[i].color,
                text: farmingBlips[i].text,
                scale: farmingBlips[i].scale,
            });
        }
        for (let i = 0; i < allRoutes.length; i++) {
            allRoutes[i].forEach((route, x) => {
                InteractionController.add({
                    position: { x: route.x, y: route.y, z: route.z },
                    description: 'Start Farming...',
                    range: OSFarming.interactionRange,
                    uid: `IC-${x}`, 
                    debug: false,
                    callback: (player: alt.Player) => {
                        const toolInInventory = playerFuncs.inventory.isInInventory(player, { name: farmingTools[i][0].name});
                        if(!toolInInventory) {
                            playerFuncs.emit.notification(player, `Not the right tools in Inventory!`);
                            return;
                        }
                        player.data.inventory[toolInInventory.index].data.durability -= 1;
                        if(player.data.inventory[toolInInventory.index].data.durability <= 1) {
                            playerFuncs.inventory.findAndRemove(player, player.data.inventory[toolInInventory.index].name)
                        }
                        playerFuncs.save.field(player, 'inventory', player.data.inventory);
                        playerFuncs.sync.inventory(player);

                        if (player.getMeta(`SpotUsed-${x}`) != null) {
                            playerFuncs.emit.notification(player, `You've used the Spot before already, wait a bit.`);
                            return;
                        }

                        const newAnimation: Animation = {
                            dict: animationLists[i][0].dict,
                            name: animationLists[i][0].name,
                            flags: ANIMATION_FLAGS.REPEAT,
                            duration: null,
                        };

                        this.startFarming(player, newAnimation, itemLists[i]);
                        player.setMeta(`SpotUsed-${x}`, x);

                        alt.setTimeout(() => {
                            player.deleteMeta(`SpotUsed-${x}`);
                        }, OSFarming.spotRespawnTime);
                        return;
                    },
                });

                ServerMarkerController.append({
                    uid: `route-${x}`,
                    pos: { x: route.x, y: route.y, z: route.z + 1 },
                    type: 2,
                    color: {
                        r: 50,
                        g: 205,
                        b: 50,
                        a: 255,
                    },
                    bobUpAndDown: true,
                    rotate: true,
                });
            });
        }
    }

    /**
     * The player will play an animation for a random amount of time, and then add a random item to
    their inventory.
    * @param {alt.Player} player - The player who is farming
    * @param {Animation} animation - Animation
    * @param {Array} itemList - An array of objects, each containing the name of the item to be added
    to the player's inventory.
    * @returns The item that was added to the player's inventory.
    */
    private static async startFarming(player: alt.Player, animation: Animation, itemList?: Array<any>) {
        const freeInvSlot = playerFuncs.inventory.getFreeInventorySlot(player);
        const itemToAdd = await ItemFactory.get(itemList[getRandomInt(0, itemList.length)]['name']);
        const isInInv = playerFuncs.inventory.isInInventory(player, { name: itemToAdd.name });
        if (!freeInvSlot) {
            playerFuncs.emit.notification(player, 'No Space in Inventory!');
            return;
        }
        if (player.hasMeta('IsFarming') && player.getMeta('IsFarming') === true) return;
        if(!player.hasMeta('IsFarming'))  {
            player.setMeta('IsFarming', true);
            const farmDuration = getRandomInt(OSFarming.minFarmDuration, OSFarming.maxFarmDuration);
            playerFuncs.emit.animation(player, animation.dict, animation.name, animation.flags, farmDuration);
            alt.setTimeout(() => {
                if (!isInInv) {
                    playerFuncs.inventory.inventoryAdd(player, itemToAdd, freeInvSlot.slot);
                    playerFuncs.save.field(player, 'inventory', player.data.inventory);
                    playerFuncs.sync.inventory(player);
                    playerFuncs.emit.notification(player, `You get x1 ${itemToAdd.name}!`);
                    player.deleteMeta('IsFarming');
                    return;
                } else {
                    player.data.inventory[isInInv.index].quantity += 1;
                    playerFuncs.save.field(player, 'inventory', player.data.inventory);
                    playerFuncs.sync.inventory(player);
                    playerFuncs.emit.notification(player, `You get x1 ${itemToAdd.name}!`);
                    player.deleteMeta('IsFarming');
                    return;
                }
            }, farmDuration);
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
