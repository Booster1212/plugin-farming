import { BaseItem } from '@AthenaShared/interfaces/item.js';

export const Events = {
    FARMING_START: 'os-farming:start-farming',
    HANDLE_FARMING: 'os-farming:handle-farming',
};

/* <-- TOOL SECTION --> */
const toolBehavior = { isToolbar: true, canDrop: true };
export const farmingTools: Array<BaseItem> = [
    {
        name: 'Mining-Drill',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 75,
        },
        consumableEventToCall: Events.HANDLE_FARMING,
        dbName: 'OS-Farming-Drill',
    },
    {
        name: 'Woodfellers Axe',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 25,
        },
        consumableEventToCall: Events.HANDLE_FARMING,
        dbName: 'OS-Farming-Axe',
    },
    {
        name: 'Garden Shears',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 25,
        },
        consumableEventToCall: Events.HANDLE_FARMING,
        dbName: 'OS-Farming-Garden-Shears',
    },
    {
        name: 'Fishing Rod',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 25,
        },
        consumableEventToCall: Events.HANDLE_FARMING,
        dbName: 'OS-Farming-Fishing-Rod',
    },
];

/* <-- MINING ITEMS --> */
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

/* <-- WOOD ITEMS --> */
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

/* <-- FISHING ITEMS --> */
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

/* <-- TOMATO ITEMS --> */
const tomatoBehavior = { canDrop: true, canStack: true };
export const tomatoItems: Array<BaseItem> = [
    {
        name: 'Tomato',
        icon: 'crate',
        behavior: tomatoBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Tomato',
    },
];

/* <-- ORANGE ITEMS --> */
const orangeBehavior = { canDrop: true, canStack: true };
export const orangeItems: Array<BaseItem> = [
    {
        name: 'Orange',
        icon: 'crate',
        behavior: orangeBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Orange',
    },
];

/* <-- SALAD ITEMS --> */
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

/* <-- POTATO ITEMS --> */
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

/* <-- PEPPER ITEMS --> */
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

/* <-- GRAPE ITEMS --> */
const grapeBehavior = { canDrop: true, canStack: true };
export const grapeItems: Array<BaseItem> = [
    {
        name: 'Grape',
        icon: 'crate',
        behavior: grapeBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Grape',
    },
];
