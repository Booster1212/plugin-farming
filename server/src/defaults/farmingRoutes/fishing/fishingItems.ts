import { ITEM_TYPE } from '@AthenaShared/enums/itemTypes';
import { BaseItem } from '@AthenaShared/interfaces/item';

const fishBehavior = { canDrop: true, canStack: true };

export const fishingItems: Array<BaseItem> = [
    {
        name: 'Calico bass',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'Calico-bass',
    },
    {
        name: 'White seabass',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'White-seabass',
    },
    {
        name: 'Rockfish',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 50,
        },
        dbName: 'Rockfish',
    },
    {
        name: 'Largemouth Bass',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 20,
        },
        dbName: 'Largemouth-Bass',
    },
    {
        name: 'Trout',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 10,
        },
        dbName: 'Trout',
    },
    {
        name: 'Catfish',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 5,
        },
        dbName: 'Catfish',
    },
    {
        name: 'Tilapia',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 7,
        },
        dbName: 'Tilapia',
    },
    {
        name: 'Bluegills',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 12,
        },
        dbName: 'Bluegills',
    },
    {
        name: 'Salmon',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 10,
        },
        dbName: 'Salmon',
    },
    {
        name: 'Green Sunfish',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 15,
        },
        dbName: 'Gree-Sunfish',
    },
    {
        name: 'Yellowtail Amberjack',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 20,
        },
        dbName: 'Yellowtail-Amberjack',
    },
    {
        name: 'Tuna',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 35,
        },
        dbName: 'Tuna',
    },
    {
        name: 'Mosquitofish',
        icon: 'crate',
        behavior: fishBehavior,
        data: {
            dropchance: 15,
        },
        dbName: 'Mosquitofish',
    },
];
