import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import * as FarmConfig from '@AthenaPlugins/plugin-farming/server/src/config/index';

import IAttachable from '../../../../shared/interfaces/iAttachable';
import { BaseItem, SharedItem } from '../../../../shared/interfaces/item';
import { Particle } from '../../../../shared/interfaces/particle';
import { IFarming } from './interfaces/iFarming';

export class FarmingUtility {
    static handleFreezeAndMeta(player: alt.Player) {
        if (player.getMeta(`IsFarming`) === true) {
            return;
        }
        player.setMeta(`IsFarming`, true);

        Athena.player.safe.setPosition(player, player.pos.x, player.pos.y, player.pos.z);
        player.frozen = true;
    }

    static checkItemDurability(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
        // TODO: Rebuild Durability System
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
        const playerData = Athena.document.character.get(player);
        if (data.progressBar) {
            Athena.player.emit.createProgressBar(player, {
                uid: `Farming-${playerData._id.toString()}`,
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

    static calculatePercentageBasedOutcome(player: alt.Player, data: IFarming) {
        const outcomeList: Array<BaseItem> = [];
        const random = Math.random() * 100;
        for (const outcome of data.outcome) {
            const droppedItem = outcome as unknown as SharedItem<{ dropchance: number }>;
            if (random <= droppedItem.data.dropchance) {
                outcomeList.push(outcome);
                alt.log(`${outcome.name} has dropped.`);
            }
        }
        return outcomeList;
    }

    static async handleFarmingReward(player: alt.Player, data: IFarming) {
        const farmingItems = this.calculatePercentageBasedOutcome(player, data);
        if (farmingItems.length === 0) {
            Athena.player.emit.notification(player, 'You did not find anything.');
            return;
        }

        for (const farmingItem of farmingItems) {
            const isAdded = await Athena.player.inventory.add(player, {
                dbName: farmingItem.dbName,
                quantity: 1,
                data: farmingItem.data,
            });
            player.frozen = false;

            if (!isAdded) {
                Athena.player.emit.notification(player, `Can't add ${farmingItem.name} - Inventory full?`);
                return;
            }
        }
    }

    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static log(message: string) {
        if (!FarmConfig.general.debug) return;

        alt.log(`~lg~[OS-Farming]: ${message}`);
    }
}
