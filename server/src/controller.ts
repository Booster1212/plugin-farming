import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { ServerMarkerController } from '../../../../server/streamers/marker';
import { ServerBlipController } from '../../../../server/systems/blip';
import { ItemFactory } from '../../../../server/systems/item';
import { ItemEffects } from '../../../../server/systems/itemEffects';
import { INVENTORY_TYPE } from '../../../../shared/enums/inventoryTypes';
import IAttachable from '../../../../shared/interfaces/iAttachable';
import { farmRegistry } from './defaults/farmingLists/farmRegistry';
import { Item } from '../../../../shared/interfaces/item';
import { Particle } from '../../../../shared/interfaces/particle';
import { IFarming } from './interfaces/iFarming';
import { config } from './config';

export class FarmingController {
    static log(message: string) {
        if (!config.enableLogging) return;

        alt.log(`~lg~[OS-Farming]: ${message}`);
    }

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
        this.log('Item Event was triggered');
        for (const farm of farmRegistry) {
            farm.spots.positions.forEach((farmingSpot) => {
                if (player.pos.isInRange(farmingSpot, 2.5)) {
                    this.log('Player is in range');
                    if (
                        farm.requiredTool.find(
                            (t) =>
                                t.toLowerCase() === item.name.toLowerCase() ||
                                t.toLowerCase() === item.dbName.toLowerCase(),
                        )
                    ) {
                        this.log('Farming: Item included');
                        if (FarmingController.handleAntiMacro(player, farmingSpot, farm.spots.positions)) {
                            this.log('AntiMacro is true!');
                            FarmingController.handleFarming(player, item, farm, slot, type);
                        } else {
                            this.log('AntiMacro is false!');
                            Athena.player.emit.notification(player, `[ANTIMACRO] - Already used this spot before.`);
                        }
                    } else {
                        Athena.player.emit.notification(player, `You can't use this item here!`);
                    }
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
            this.log('AntiMacro - length == 1');
            return true;
        }

        const makroKey = 'OSFarming:Spotused-antiMacro';

        let meta: Array<alt.Vector3> = player.getMeta(makroKey) as Array<alt.Vector3>;
        if (!meta) {
            this.log('AntiMacro: Meta is empty');
            player.setMeta(makroKey, Array.of(currentPosition));
            return true;
        }

        const randomInt = FarmingController.getRandomInt(meta.length / 2, positions.length - 1);
        this.log('AntiMacro: position-length ' + positions.length);
        this.log('AntiMacro: Random int ' + randomInt);

        let checkingList: Array<alt.Vector3> =
            meta.length <= randomInt || meta.length === 1 ? meta : meta.slice(randomInt);
        this.log('AntiMacro: checkingList-length ' + checkingList.length);

        if (
            checkingList.find(
                (c) => c.x === currentPosition.x && c.y === currentPosition.y && c.z === currentPosition.z,
            )
        ) {
            this.log('AntiMacro: position was recent');
            player.setMeta(makroKey, checkingList);
            return false;
        } else {
            this.log('AntiMacro: position wasnt used recent');
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
        if (player.getMeta(`IsFarming`) === true) {
            return;
        }
        player.setMeta(`IsFarming`, true);

        Athena.player.safe.setPosition(player, player.pos.x, player.pos.y, player.pos.z);
        Athena.player.set.frozen(player, true);

        Athena.player.emit.animation(
            player,
            data.animation.dict,
            data.animation.name,
            data.animation.flags,
            data.farmDuration,
        );

        if (data.attacheable) {
            const objectToAttach: IAttachable = {
                model: data.attacheable.model,
                pos: data.attacheable.pos,
                rot: data.attacheable.rot,
                bone: data.attacheable.bone,
            };
            Athena.player.emit.objectAttach(player, objectToAttach, data.farmDuration);
        }

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

        alt.setTimeout(async () => {
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
                return;
            }

            const randomized = FarmingController.getRandomInt(0, outcomeList.length);
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
        }, data.farmDuration);
    }

    private static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
