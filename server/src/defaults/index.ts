import { ItemFactory } from '../../../../../server/systems/item';
import { farmingItems } from './farmingLists/farmingItems';
import { farmingTools } from './farmingLists/farmingTools';

const itemsToRegister = [...farmingItems, ...farmingTools];
for (let x = 0; x < itemsToRegister.length; x++) {
    const item = itemsToRegister[x];
    ItemFactory.add(item);
    ItemFactory.update(item.dbName, item);
}