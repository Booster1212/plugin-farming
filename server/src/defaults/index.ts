import { ItemFactory } from '../../../../../server/systems/item';
import { farmingTools } from './farmingLists/farmingTools';
import { miningItems } from './farmingRoutes/miningRoute/miningItems';
import { woodItems } from './farmingRoutes/woodRoute/woodItems';

const itemsToRegister = [...miningItems, ...woodItems, ...farmingTools];

itemsToRegister.forEach((item) => {
    ItemFactory.add(item);
    ItemFactory.update(item.dbName, item);
});
