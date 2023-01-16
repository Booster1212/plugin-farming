import { ItemFactory } from '../../../../../server/systems/item';
import { farmingTools } from './farmingLists/farmingTools';
import { fishingItems } from './farmingRoutes/fishing/fishingItems';
import { grapeItems } from './farmingRoutes/grapeRoute/grapeItems';
import { miningItems } from './farmingRoutes/miningRoute/miningItems';
import { orangeItems } from './farmingRoutes/orangeRoute/orangeItems';
import { pepperItems } from './farmingRoutes/pepperRoute/pepperItems';
import { potatoItems } from './farmingRoutes/potatoRoute/potatoItems';
import { saladItems } from './farmingRoutes/saladRoute/saladItems';
import { tomatoItems } from './farmingRoutes/tomatoRoute/tomatoItems';
import { woodItems } from './farmingRoutes/woodRoute/woodItems';

const itemsToRegister = [
    ...miningItems,
    ...woodItems,
    ...grapeItems,
    ...orangeItems,
    ...saladItems,
    ...pepperItems,
    ...potatoItems,
    ...tomatoItems,
    ...fishingItems,
    ...farmingTools,
];

itemsToRegister.forEach((item) => {
    ItemFactory.add(item);
    ItemFactory.update(item.dbName, item);
});
