import { ItemFactory } from "../../../server/systems/item";
import { ITEM_TYPE } from "../../../shared/enums/itemTypes";
import { Item } from "../../../shared/interfaces/item";

export const farmingTools: Array<Item> = [
    {
        name: 'Mining Drill',
        icon: 'drill',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP, 
        quantity: 1,
        data: {
            rarity: 'common',
            durability: 25,
        },
        dbName: 'OS-Farming-Drill',
        version: 1
    },
    {
        name: 'Woodfellers Axe',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP, 
        quantity: 1,
        data: {
            rarity: 'common',
            durability: 25,
        },
        dbName: 'OS-Farming-Axe',
        version: 1 
    },
    {
        name: 'Garden Shears',
        icon: 'crate',
        description: 'Some example description.',
        behavior: ITEM_TYPE.CAN_DROP, 
        quantity: 1,
        data: {
            rarity: 'common',
            durability: 25,
        },
        dbName: 'OS-Farming-Garden-Shears',
        version: 1 
    }
];

for(let x = 0; x < farmingTools.length; x ++) {
    await ItemFactory.add(farmingTools[x]);
    
    const needsUpdate = await ItemFactory.get(farmingTools[x].dbName);
    if(needsUpdate.version != farmingTools[x].version) {
        await ItemFactory.update(farmingTools[x].dbName, farmingTools[x]); 
    }
}