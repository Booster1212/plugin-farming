import { ItemFactory } from "../../../../../server/systems/item";
import { ITEM_TYPE } from "../../../../../shared/enums/itemTypes";
import { Item } from "../../../../../shared/interfaces/item";

export const farmingItems: Array<Item> = [
    {
        name: 'Iron Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Iron-Ore',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Cooper Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Cooper-Ore',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Silver Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Silver-Ore',
        rarity: 2,
        version: 1,
    },
    {
        name: 'Gold Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Gold-Ore',
        rarity: 4,
        version: 1,
    },
    {
        name: 'Titanium Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Titanium-Ore',
        rarity: 4,
        version: 1,
    },
    {
        name: 'Oak Wood',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Oak-Wood',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Rotten Wood',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Rotten-Wood',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Tomato',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Tomato',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Orange',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Orange',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Salad',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Salad',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Potato',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Potate',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Pepper',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Pepper',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Grape',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE,
        quantity: 1,
        data: {
        },
        dbName: 'OS-Farming-Grape',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Calico bass',
        description:
            'This species attains a maximum total length of 72 centimetres (28 in) and a maximum published weight of 7.0 kilograms (15.4 lb)',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Calico-bass',
        rarity: 0,
        version: 1,
    },
    {
        name: 'White seabass',
        description: '20 pounds in weight and 28 inches.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'White-seabass',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Rockfish',
        description:
            'It is a very versatile fish. From fried to grilled to steamed and even raw, you have plenty of preparation options. It is fantastic in almost any fish recipe, and if you have a recipe that does not specify a type of fish, rockfish would be a great choice.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Rockfish',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Largemouth Bass',
        description:
            'Believe it or not, the Los Santos metropolitan are is kind of a freshwater fishing paradise. Not only is it home to the Los Santos River, but there are also plenty of bountiful lakes within the limits of downtown LS and beyond. One of the most notable fish you can catch.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Largemouth-Bass',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Trout',
        description:
            'While trout can be caught with a normal rod and reel, fly fishing is a distinctive method developed primarily for trout, and now extended to other species. Understanding how moving water shapes the stream channel makes it easier to find trout. In most streams, the current creates a riffle-run-pool pattern that repeats itself over and over.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Trout',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Catfish',
        description:
            'Despite their name, not all catfish have prominent barbels or "whiskers". Members of the Siluriformes order are defined by features of the skull and swimbladder. Catfish are of considerable commercial importance; many of the larger species are farmed or fished for food.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Catfish',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Tilapia',
        description:
            'Whole tilapia fish can be processed into skinless, boneless fillets. The yield is from 30 to 37%, depending on fillet size and final trim. In some of the commercial strains, the yield has been reported up to 47% at harvest weight.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Tilapia',
        rarity: 0,
        version: 1,
    },
    {
        name: 'Bluegills',
        description:
            'Bluegill live in the shallow waters of many lakes and ponds, along with streams, creeks, and rivers. They prefer water with many aquatic plants, and seclude themselves within or near fallen logs, water weeds or any other structure (natural or manmade) that is underwater. They can often be found around weed beds, where they search for food or spawn.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Bluegills',
        rarity: 2,
        version: 1,
    },
    {
        name: 'Salmon',
        description:
            'Typically, salmon are anadromous: they hatch in fresh water, migrate to the ocean, then return to fresh water to reproduce. However, populations of several species are restricted to fresh water throughout their lives. Folklore has it that the fish return to the exact spot where they hatched to spawn.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Salmon',
        rarity: 2,
        version: 1,
    },
    {
        name: 'Green Sunfish',
        description:
            'The species prefers areas in sluggish backwaters, lakes, and ponds with gravel, sand, or bedrock bottoms. They also can be found in very muddy waters and are able to tolerate poor water conditions. Green sunfish tend to spend their time hiding around rocks, submerged logs, plants, and other things that provide cover.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Gree-Sunfish',
        rarity: 2,
        version: 1,
    },
    {
        name: 'Yellowtail Amberjack',
        description:
            'It is hard to think of a fish more closely associated with Southern San Andreas waters. Not only is it super tasty, but it is also incredibly fun to catch. Aside from a few months in winter, Yellowtail Amberjack will kepp your biceps engaged in a testy battle.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Yellowtail-Amberjack',
        rarity: 4,
        version: 1,
    },
    {
        name: 'Tuna',
        description:
            'Tuna is one of the the only species of fish that can maintain a body temperature higher than that of the surrounding water. An active and agile predator, the tuna has a sleek, streamlined body, and is among the fastest-swimming pelagic fish - the yellowfin tuna, for example, is capable of speeds of up to 75 km/h (47 mph).',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Tuna',
        rarity: 4,
        version: 1,
    },
    {
        name: 'Mosquitofish',
        description:
            'Mosquitofish can survive relatively inhospitable environments, and are resilient to low oxygen concentrations, high salt concentrations (up to twice that of sea water), and temperatures up to 42 C (108 F) for short periods. Because of their notable adaptability to harsh conditions and their global introduction into many habitats for mosquito control, they have been described as the most widespread freshwater fish in the world.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Mosquitofish',
        rarity: 4,
        version: 1,
    },
];

for (let x = 0; x < farmingItems.length; x++) {
    await ItemFactory.add(farmingItems[x]);
    await ItemFactory.update(farmingItems[x].dbName, farmingItems[x]);
}
