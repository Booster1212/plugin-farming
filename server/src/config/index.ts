import * as Athena from '@AthenaServer/api';
import * as FarmingItems from '@AthenaPlugins/plugin-farming/server/src/config/items';

export const general = {
    debug: true,
    rangeToSpot: 2.5,
    antiMacro: true,
};

const itemsToRegister = [
    ...FarmingItems.farmingTools,
    ...FarmingItems.fishingItems,
    ...FarmingItems.grapeItems,
    ...FarmingItems.miningItems,
    ...FarmingItems.orangeItems,
    ...FarmingItems.pepperItems,
    ...FarmingItems.potatoItems,
    ...FarmingItems.saladItems,
    ...FarmingItems.tomatoItems,
    ...FarmingItems.woodItems,
];

itemsToRegister.forEach(async (item) => {
    await Athena.systems.inventory.factory.upsertAsync(item);
});
