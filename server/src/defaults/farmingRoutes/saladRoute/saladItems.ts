import { ITEM_TYPE } from '@AthenaShared/enums/itemTypes';
import { Item } from '@AthenaShared/interfaces/item';

export const saladItems: Array<Item> = [
    {
        name: 'Salad',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Salad',
        rarity: 0,
        version: 1,
    },
];
