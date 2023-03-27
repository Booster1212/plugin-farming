import { BaseItem } from '@AthenaShared/interfaces/item';

const saladBehavior = { canDrop: true, canStack: true };
export const saladItems: Array<BaseItem> = [
    {
        name: 'Salad',
        icon: 'crate',
        behavior: saladBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Salad',
    },
];
