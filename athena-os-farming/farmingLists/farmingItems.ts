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
    }
]