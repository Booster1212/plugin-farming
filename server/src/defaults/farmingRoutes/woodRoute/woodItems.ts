import { ITEM_TYPE } from '@AthenaShared/enums/itemTypes';
import { Item } from '@AthenaShared/interfaces/item';

export const woodItems: Array<Item> = [
    {
        name: 'Oak Wood',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Oak-Wood',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Rotten Wood',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 85,
        },
        dbName: 'OS-Farming-Rotten-Wood',
        rarity: 0,
        version: 1,
    },
];
