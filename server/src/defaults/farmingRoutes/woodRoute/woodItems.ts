import { BaseItem } from '@AthenaShared/interfaces/item';

const woodBehavior = { canDrop: true, canStack: true };
export const woodItems: Array<BaseItem> = [
    {
        name: 'Oak Wood',
        icon: 'crate',
        behavior: woodBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Oak-Wood',
    },
    {
        name: 'Rotten Wood',
        icon: 'crate',
        behavior: woodBehavior,
        data: {
            dropchance: 85,
        },
        dbName: 'OS-Farming-Rotten-Wood',
    },
];
