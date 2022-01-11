import { ItemFactory } from '../../../server/systems/item';
import { ITEM_TYPE } from '../../../shared/enums/itemTypes';
import { Item } from '../../../shared/interfaces/item';
import { farmingTools, itemLists } from './farmableItems';

farmingTools.forEach((tool, index) => {
    tool.forEach(async (item, x) => {
        const osFarmingTools: Item = {
            name: item.name,
            description: item.description,
            icon: item.icon,
            quantity: 0,
            behavior: ITEM_TYPE.CAN_TRADE | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK,
            data: item.data,
            dbName: item.name,
            version: 1
        }
        await ItemFactory.add(osFarmingTools);
        await ItemFactory.update(osFarmingTools.name, osFarmingTools);
    });
});

itemLists.forEach((entry, index) => {
    entry.forEach(async (item, x) => {
        const osFarmingItems: Item = {
            name: item.name,
            description: item.description,
            icon: item.icon,
            quantity: 1,
            behavior: ITEM_TYPE.CAN_TRADE | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_STACK,
            data: item.data,
            dbName: item.name,
            version: 1
        }
        await ItemFactory.add(osFarmingItems);
        await ItemFactory.update(osFarmingItems.name, osFarmingItems);
    });
});