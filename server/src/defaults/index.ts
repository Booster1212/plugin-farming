import { ItemFactory } from '../../../../../server/systems/item';
import { farmingItems } from './farmingLists/farmingItems';
import { farmingTools } from './farmingLists/farmingTools';

const itemsToRegister = [...farmingItems, ...farmingTools];

for (const item of itemsToRegister) {
    const factoryItem = await ItemFactory.get(item.dbName);
    await ItemFactory.add(item);
    
    if (!item || !item.version || !factoryItem || !factoryItem.version) continue;
    if (item.version != factoryItem.version) {
        await ItemFactory.update(factoryItem.dbName, item);
        console.log(`Updated item ${item.name} new version => ${item.version}`);
    }
}
