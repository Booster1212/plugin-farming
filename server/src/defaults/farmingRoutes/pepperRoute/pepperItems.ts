import { BaseItem } from '@AthenaShared/interfaces/item';

const pepperBehavior = { canDrop: true, canStack: true };
export const pepperItems: Array<BaseItem> = [
    {
        name: 'Pepper',
        icon: 'crate',
        behavior: pepperBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Pepper',
    },
];
