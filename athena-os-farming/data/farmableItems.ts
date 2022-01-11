// Add as many items as you want in that file. So i'll leave this example here so you have an idea how to
// append multiple items at once to Athena's ItemFactory.

const miningTool = [
    {
        name: 'Drill',
        icon: 'crate',
        description: 'Some very loud drill to mine ores.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
];
const farmableMiningItems = [
    {
        name: 'Iron Ore',
        icon: 'crate',
        description: 'Could be usefull to make iron bars?',
        data: {
            valueable: 'No',
            otherDataTag: 'Data Examples - Change me if you want.',
        },
    },
    {
        name: 'Cooper Ore',
        icon: 'crate',
        description: 'Could be usefull to make cooper bars?',
        data: {
            valueable: 'No',
            otherDataTag: 'Data Examples - Change me if you want.',
        },
    },
];

const woodTool = [
    {
        name: 'Axe',
        icon: 'crate',
        description: 'Some Sharp Axe to fell wood.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
]
const farmableWoodItems = [
    {
        name: 'Oak Wood',
        icon: 'crate',
        description: 'Could be usefull to make wood planks?',
        data: {},
    },
    {
        name: 'Rotten Wood',
        icon: 'crate',
        description: 'Could be usefull to make rotten wood planks?',
        data: {},
    },
];

const tomatoTool = [
    {
        name: 'Garden shears',
        icon: 'crate',
        description: 'Garden shears.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
]
const farmableTomatoItems = [
    {
        name: 'Tomato',
        icon: 'crate',
        description: 'Tomato',
        data: {},
    },
];

const orangeTool = [
    {
        name: 'Garden shears',
        icon: 'crate',
        description: 'Garden shears.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
]
const farmableOrangeItems = [
    {
        name: 'Orange',
        icon: 'crate',
        description: 'Orange',
        data: {},
    },
];

const saladTool = [
    {
        name: 'Garden shears',
        icon: 'crate',
        description: 'Garden shears.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
]
const farmableSaladItems = [
    {
        name: 'Salad',
        icon: 'crate',
        description: 'Salad',
        data: {},
    },
];

const potateTool = [
    {
        name: 'Garden shears',
        icon: 'crate',
        description: 'Garden shears.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
]
const farmablePotateItems = [
    {
        name: 'Potate',
        icon: 'crate',
        description: 'Potate',
        data: {},
    },
];

const pepperTool = [
    {
        name: 'Garden shears',
        icon: 'crate',
        description: 'Garden shears.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
]
const farmablePepperItems = [
    {
        name: 'Pepper',
        icon: 'crate',
        description: 'Pepper',
        data: {},
    },
];

const grapeTool = [
    {
        name: 'Garden shears',
        icon: 'crate',
        description: 'Garden shears.',
        data: {
            durability: 25,
            rarity: 'Common'
        },
    },
]
const farmableGrapeItems = [
    {
        name: 'Grape',
        icon: 'crate',
        description: 'Grape',
        data: {},
    },
];

export const itemLists = [farmableMiningItems, farmableWoodItems, farmableTomatoItems, farmableOrangeItems, farmableSaladItems, farmablePotateItems, farmablePepperItems, farmableGrapeItems,       ];
export const farmingTools = [miningTool, woodTool, tomatoTool, orangeTool, saladTool, potateTool, pepperTool, grapeTool,  ];