import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import * as FarmConfig from '@AthenaPlugins/plugin-farming/server/src/config/index.js';
import IAttachable from '../../../../shared/interfaces/iAttachable.js';
import { BaseItem, SharedItem } from '../../../../shared/interfaces/item.js';
import { Particle } from '../../../../shared/interfaces/particle.js';
import { IFarming } from './interfaces/iFarming.js';

export class FarmingUtility {
    static async handleFarming(player: alt.Player, data: IFarming) {
        if (player.getMeta(`IsFarming`) === true) {
            return;
        }

        player.setMeta(`IsFarming`, true);

        FarmingUtility.handleFreezeAndMeta(player);
        FarmingUtility.attachFarmingObject(player, data);
        FarmingUtility.playFarmingAnimation(player, data);
        FarmingUtility.createFarmingProgressBar(player, data);

        const farmingItems = await FarmingUtility.calculatePercentageBasedOutcome(player, data);

        if (farmingItems.length === 0) {
            FarmingUtility.notify(player, {
                subTitle: 'No Luck',
                message: `You've found absolutely nothing.`,
            });
            return;
        }

        for (const farmingItem of farmingItems) {
            const isAdded = await FarmingUtility.addFarmingItemToInventory(player, farmingItem);

            if (!isAdded) {
                FarmingUtility.notify(player, {
                    subTitle: 'Error',
                    message: `Can't add ${farmingItem.name} - Is your inventory full?`,
                });
                return;
            }
        }

        player.frozen = false;
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

    static handleFreezeAndMeta(player: alt.Player) {
        player.setMeta(`IsFarming`, true);
        Athena.player.safe.setPosition(player, player.pos.x, player.pos.y, player.pos.z);
        player.frozen = true;
    }

    static async handleFarmingReward(player: alt.Player, data: IFarming) {
        const farmingItems = await this.calculatePercentageBasedOutcome(player, data);
        if (farmingItems.length === 0) {
            Athena.player.emit.notification(player, 'You did not find anything.');
            FarmingUtility.notify(player, {
                icon: '🧑‍🌾',
                subTitle: 'No Luck',
                message: `You've found absolutely nothing.`,
                duration: 10000,
                title: 'Plugin - Farming',
            });
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
                FarmingUtility.notify(player, {
                    icon: '🧑‍🌾',
                    subTitle: 'Error',
                    message: `Can't add ${farmingItem.name} - Is your inventory full?`,
                    duration: 10000,
                    title: 'Plugin - Farming',
                });
                return;
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
            Athena.player.emit.objectAttach(player, objectToAttach, data.duration);
        }
    }

    static playFarmingAnimation(player: alt.Player, data: IFarming) {
        Athena.player.emit.animation(
            player,
            data.animation.dict,
            data.animation.name,
            data.animation.flags,
            data.duration,
        );
    }

    static createFarmingProgressBar(player: alt.Player, data: IFarming) {
        const playerData = Athena.document.character.get(player);
        if (data.progressBar) {
            Athena.player.emit.createProgressBar(player, {
                uid: `Farming-${playerData._id.toString()}`,
                color: data.progressBar.color,
                distance: data.progressBar.distance,
                milliseconds: data.duration,
                position: player.pos,
                text: data.progressBar.text,
            });
        }
    }

    static async calculatePercentageBasedOutcome(player: alt.Player, data: IFarming) {
        const outcomeList: Array<BaseItem> = [];
        const outcomeNames: Array<string> = [];

        const random = Math.random() * 100;

        for (const outcome of data.outcome) {
            const droppedItem = outcome as unknown as SharedItem<{ dropchance: number }>;
            if (random <= droppedItem.data.dropchance) {
                outcomeList.push(outcome);
                outcomeNames.push(outcome.name);
                FarmingUtility.log(`${outcome.name} has dropped.`);
            }
        }

        FarmingUtility.notify(player, {
            icon: '🧑‍🌾',
            title: 'Plugin - Farming',
            subTitle: 'Success',
            message: `You found ${outcomeNames.join(',')}!`,
            duration: 10000,
        });

        return outcomeList;
    }

    static async addFarmingItemToInventory(player: alt.Player, farmingItem: BaseItem) {
        const isAdded = await Athena.player.inventory.add(player, {
            dbName: farmingItem.dbName,
            quantity: 1,
            data: farmingItem.data,
        });

        return isAdded;
    }

    static async notify(
        player: alt.Player,
        { subTitle = 'No Luck', message = '', duration = 10000, icon = '🧑‍🌾', title = 'Plugin - Farming' },
    ) {
        const Notify = await Athena.systems.plugins.useAPI('notification-api');
        Notify.addNotification(player, { icon, subTitle, message, duration, title });
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
