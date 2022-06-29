import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { ItemFactory } from '../../../../server/systems/item';
import { INVENTORY_TYPE } from '../../../../shared/enums/inventoryTypes';
import IAttachable from '../../../../shared/interfaces/iAttachable';
import { Item } from '../../../../shared/interfaces/item';
import { Particle } from '../../../../shared/interfaces/particle';
import { config } from './config';
import { IFarming } from './interfaces/iFarming';

export class FarmingUtility {
    static handleFreezeAndMeta(player: alt.Player) {
        if (player.getMeta(`IsFarming`) === true) {
            return;
        }
        player.setMeta(`IsFarming`, true);

        Athena.player.safe.setPosition(player, player.pos.x, player.pos.y, player.pos.z);
        Athena.player.set.frozen(player, true);
    }

    static checkItemDurability(
        player: alt.Player,
        toolToUse: Item,
        inventoryType: INVENTORY_TYPE,
        itemSlot: number,
    ) {
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
    }

    static attachFarmingObject(player: alt.Player, data: IFarming) {
        if (data.attacheable) {
            const objectToAttach: IAttachable = {
                model: data.attacheable.model,
                pos: data.attacheable.pos,
                rot: data.attacheable.rot,
                bone: data.attacheable.bone,
            };
            Athena.player.emit.objectAttach(player, objectToAttach, data.farmDuration);
        }
    }

    static playFarmingAnimation(player: alt.Player, data: IFarming) {
        Athena.player.emit.animation(
            player,
            data.animation.dict,
            data.animation.name,
            data.animation.flags,
            data.farmDuration,
        );
    }

    static createFarmingProgressBar(player: alt.Player, data: IFarming) {
        if (data.progressBar) {
            Athena.player.emit.createProgressBar(player, {
                uid: `Farming-${player.data._id.toString()}`,
                color: data.progressBar.color as alt.RGBA,
                distance: data.progressBar.distance,
                milliseconds: data.farmDuration,
                position: player.pos,
                text: data.progressBar.text,
            });
        }
    }

    static createFarmingParticles(player: alt.Player, data: IFarming) {
        if (data.particles) {
            const particle: Particle = {
                pos: data.particles.pos,
                dict: data.particles.dict,
                name: data.particles.name,
                duration: data.particles.duration,
                scale: data.particles.scale,
            };
            Athena.player.emit.particle(player, particle, true);
        }
    }

    static calculateOutcome(player: alt.Player, toolToUse: Item, data: IFarming) {
        let outcomeList = [];

        if ((!toolToUse.rarity || toolToUse.rarity === 0 || toolToUse.rarity < 3) && data.outcome.common) {
            outcomeList.push(data.outcome.common);
        }

        if (toolToUse.rarity >= 1 && toolToUse.rarity < 3 && data.outcome.uncommon) {
            outcomeList.push(data.outcome.uncommon);
        }

        if (toolToUse.rarity >= 2 && toolToUse.rarity < 4 && data.outcome.rare) {
            outcomeList.push(data.outcome.rare);
        }

        if (toolToUse.rarity >= 3 && toolToUse.rarity < 5 && data.outcome.veryRare) {
            outcomeList.push(data.outcome.veryRare);
        }

        if (toolToUse.rarity >= 4 && toolToUse.rarity < 6 && data.outcome.epic) {
            outcomeList.push(data.outcome.epic);
        }

        if (toolToUse.rarity >= 5 && toolToUse.rarity <= 6 && data.outcome.legendary) {
            outcomeList.push(data.outcome.legendary);
        }

        if (toolToUse.rarity == 6 && data.outcome.unique) {
            outcomeList.push(data.outcome.unique);
        }

        if (!outcomeList || outcomeList.length === 0) {
            Athena.player.emit.notification(player, `You found nothing!`);
        }

        return outcomeList;
    }

    static async handleFarmingReward(player: alt.Player, outcomeList: Array<string>) {
        const randomized = FarmingUtility.getRandomInt(0, outcomeList.length);

        let itemToAdd = await ItemFactory.get(outcomeList[0][randomized]);
        if (!itemToAdd) {
            itemToAdd = await ItemFactory.getByName(outcomeList[0][randomized]);
        }

        const leftOvers = await Athena.player.inventory.addAmountToInventoryReturnRemainingAmount(
            player,
            itemToAdd.dbName,
            1,
        );

        if (!leftOvers) {
            Athena.player.emit.notification(player, `You've found ${itemToAdd.name}!`);
        } else {
            Athena.player.emit.notification(player, `Your inventory is full!`);
        }
    }
    static resyncInventory(player: alt.Player) {
        Athena.player.save.field(player, 'inventory', player.data.inventory);
        Athena.player.save.field(player, 'toolbar', player.data.toolbar);
        Athena.player.sync.inventory(player);
        Athena.player.set.frozen(player, false);
    }

    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static log(message: string) {
        if (!config.enableLogging) return;

        alt.log(`~lg~[OS-Farming]: ${message}`);
    }
}