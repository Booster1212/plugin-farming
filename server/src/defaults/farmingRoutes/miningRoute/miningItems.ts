import { BaseItem } from '@AthenaShared/interfaces/item';

const miningItemBehavior = {
    canStack: true,
    canDrop: true,
};

export const miningItems: Array<BaseItem> = [
    {
        name: 'Iron Ore',
        icon: 'crate',
        behavior: miningItemBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Iron-Ore',
    },
    {
        name: 'Cooper Ore',
        icon: 'crate',
        behavior: miningItemBehavior,
        data: {
            dropchance: 50,
        },
        dbName: 'OS-Farming-Cooper-Ore',
    },
    {
        name: 'Silver Ore',
        icon: 'crate',
        behavior: miningItemBehavior,
        data: {
            dropchance: 30,
        },
        dbName: 'OS-Farming-Silver-Ore',
    },
    {
        name: 'Gold Ore',
        icon: 'crate',
        behavior: miningItemBehavior,
        data: {
            dropchance: 10,
        },
        dbName: 'OS-Farming-Gold-Ore',
    },
    {
        name: 'Titanium Ore',
        icon: 'crate',
        behavior: miningItemBehavior,
        data: {
            dropchance: 5,
        },
        dbName: 'OS-Farming-Titanium-Ore',
    },
];
