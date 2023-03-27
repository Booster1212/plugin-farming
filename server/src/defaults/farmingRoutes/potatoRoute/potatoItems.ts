import { BaseItem } from '@AthenaShared/interfaces/item';

const potatoBehavior = { canDrop: true, canStack: true };
export const potatoItems: Array<BaseItem> = [
    {
        name: 'Potato',
        icon: 'crate',
        behavior: potatoBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Potate',
    },
];
