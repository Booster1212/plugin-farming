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
    // {}
]
const farmableTomatoItems = [
    // {}
];

export const itemLists = [farmableMiningItems, farmableWoodItems /*farmableTomatoItems*/];
export const farmingTools = [miningTool, woodTool, /*tomatoTool*/];