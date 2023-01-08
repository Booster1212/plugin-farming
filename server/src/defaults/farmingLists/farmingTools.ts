import { ITEM_TYPE } from '../../../../../../shared/enums/itemTypes';
import { Item } from '../../../../../../shared/interfaces/item';
import { FarmingEvents } from '../events';

export const farmingTools: Array<Item> = [
    {
        name: 'Mining-Drill',
        icon: 'crate',
        description: 'This drill can be used to mine different stones.',
        behavior:
            ITEM_TYPE.CAN_DROP |
            ITEM_TYPE.CAN_TRADE |
            ITEM_TYPE.IS_TOOLBAR |
            ITEM_TYPE.CONSUMABLE |
            ITEM_TYPE.SKIP_CONSUMABLE,
        quantity: 1,
        data: {
            durability: 75,
            event: FarmingEvents.HANDLE_FARMING,
        },
        rarity: 0,
        dbName: 'OS-Farming-Drill',
        version: 1,
    },
    {
        name: 'Woodfellers Axe',
        icon: 'crate',
        description: 'This is an axe which can be used to fell off trees.',
        behavior:
            ITEM_TYPE.CAN_DROP |
            ITEM_TYPE.CAN_TRADE |
            ITEM_TYPE.IS_TOOLBAR |
            ITEM_TYPE.CONSUMABLE |
            ITEM_TYPE.SKIP_CONSUMABLE,
        quantity: 1,
        data: {
            durability: 25,
            event: FarmingEvents.HANDLE_FARMING,
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
            event: FarmingEvents.HANDLE_FARMING,
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
            event: FarmingEvents.HANDLE_FARMING,
        },
        rarity: 0,
        dbName: 'OS-Farming-Fishing-Rod',
        version: 1,
    },
];
