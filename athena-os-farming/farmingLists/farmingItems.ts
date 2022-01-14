import { ItemFactory } from "../../../server/systems/item";
import { ITEM_TYPE } from "../../../shared/enums/itemTypes";
import { Item } from "../../../shared/interfaces/item";

export const farmingItems: Array<Item> = [
    {
        name: 'Iron Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE, 
        quantity: 1,
        data: {
            rarity: 'common',
        },
        dbName: 'OS-Farming-Iron-Ore',
        version: 1 
    },
    {
        name: 'Cooper Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE, 
        quantity: 1,
        data: {
            rarity: 'common',
        },
        dbName: 'OS-Farming-Cooper-Ore',
        version: 1 
    },
    {
        name: 'Silver Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE, 
        quantity: 1,
        data: {
            rarity: 'common',
        },
        dbName: 'OS-Farming-Silver-Ore',
        version: 1 
    },
    {
        name: 'Gold Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE, 
        quantity: 1,
        data: {
            rarity: 'common',
        },
        dbName: 'OS-Farming-Gold-Ore',
        version: 1 
    },
    {
        name: 'Titanium Ore',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_TRADE, 
        quantity: 1,
        data: {
            rarity: 'common',
        },
        dbName: 'OS-Farming-Titanium-Ore',
        version: 1 
    },
]

for(let x = 0; x < farmingItems.length; x++) {
    await ItemFactory.add(farmingItems[x]);
    await ItemFactory.update(farmingItems[x].dbName, farmingItems[x])
}