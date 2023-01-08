import { ITEM_TYPE } from '@AthenaShared/enums/itemTypes';
import { Item } from '@AthenaShared/interfaces/item';

export const miningItems: Array<Item> = [
    {
        name: 'Iron Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Iron-Ore',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Cooper Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 50,
        },
        dbName: 'OS-Farming-Cooper-Ore',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Silver Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 30,
        },
        dbName: 'OS-Farming-Silver-Ore',
        rarity: 2,
        version: 1,
    },
    {
        name: 'Gold Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 10,
        },
        dbName: 'OS-Farming-Gold-Ore',
        rarity: 4,
        version: 1,
    },
    {
        name: 'Titanium Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 5,
        },
        dbName: 'OS-Farming-Titanium-Ore',
        rarity: 4,
        version: 1,
    },
];
