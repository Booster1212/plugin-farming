import { ItemFactory } from '../../../server/systems/item';
import { ITEM_TYPE } from '../../../shared/enums/itemTypes';
import { Item } from '../../../shared/interfaces/item';

export const farmingTools: Array<Item> = [
    {
        name: 'Mining-Drill',
        icon: 'crate',
        description: 'Some example description.',
        behavior:
            ITEM_TYPE.CAN_DROP |
            ITEM_TYPE.CAN_TRADE |
            ITEM_TYPE.IS_TOOLBAR |
            ITEM_TYPE.CONSUMABLE |
            ITEM_TYPE.SKIP_CONSUMABLE,
        quantity: 1,
        data: {
            durability: 25,
            event: 'OSFarming:Server:handleFarming',
        },
        rarity: 0,
        dbName: 'OS-Farming-Drill',
        version: 1,
    },
    {
        name: 'Mining-Drill 6',
        icon: 'crate',
        description: 'Some example description.',
        behavior:
            ITEM_TYPE.CAN_DROP |
            ITEM_TYPE.CAN_TRADE |
            ITEM_TYPE.IS_TOOLBAR |
            ITEM_TYPE.CONSUMABLE |
            ITEM_TYPE.SKIP_CONSUMABLE,
        quantity: 1,
        data: {
            durability: 25,
            event: 'OSFarming:Server:handleFarming',
        },
        rarity: 6,
        dbName: 'OS-Farming-Drill-6',
        version: 1,
    },
    {
        name: 'Woodfellers Axe',
        icon: 'crate',
        description: 'Some example description.',
        behavior:
            ITEM_TYPE.CAN_DROP |
            ITEM_TYPE.CAN_TRADE |
            ITEM_TYPE.IS_TOOLBAR |
            ITEM_TYPE.CONSUMABLE |
            ITEM_TYPE.SKIP_CONSUMABLE,
        quantity: 1,
        data: {
            durability: 25,
            event: 'OSFarming:Server:handleFarming',
        },
        rarity: 0,
        dbName: 'OS-Farming-Axe',
        version: 1,
    },
    {
        name: 'Garden Shears',
        icon: 'crate',
        description: 'Some example description.',
        behavior:
            ITEM_TYPE.CAN_DROP |
            ITEM_TYPE.CAN_TRADE |
            ITEM_TYPE.IS_TOOLBAR |
            ITEM_TYPE.CONSUMABLE |
            ITEM_TYPE.SKIP_CONSUMABLE,
        quantity: 1,
        data: {
            durability: 25,
            event: 'OSFarming:Server:handleFarming',
        },
        rarity: 0,
        dbName: 'OS-Farming-Garden-Shears',
        version: 1,
    },
    {
        name: 'Fishing Rod',
        icon: 'crate',
        description: 'Some example description.',
        behavior:
            ITEM_TYPE.CAN_DROP |
            ITEM_TYPE.CAN_TRADE |
            ITEM_TYPE.IS_TOOLBAR |
            ITEM_TYPE.CONSUMABLE |
            ITEM_TYPE.SKIP_CONSUMABLE,
        quantity: 1,
        data: {
            durability: 25,
            event: 'OSFarming:Server:handleFarming',
        },
        rarity: 0,
        dbName: 'OS-Farming-Fishing-Rod',
        version: 1,
    },
];

for (let x = 0; x < farmingTools.length; x++) {
    await ItemFactory.add(farmingTools[x]);
    await ItemFactory.update(farmingTools[x].dbName, farmingTools[x]);
}
//
