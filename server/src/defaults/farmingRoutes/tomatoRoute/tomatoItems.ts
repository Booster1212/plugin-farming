import { ITEM_TYPE } from '@AthenaShared/enums/itemTypes';
import { Item } from '@AthenaShared/interfaces/item';

export const tomatoItems: Array<Item> = [
    {
        name: 'Tomato',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Tomato',
        rarity: 0,
        version: 1,
    },
];
