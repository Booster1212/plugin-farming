import * as Athena from '@AthenaServer/api/index.js';
import * as FarmItems from '@AthenaPlugins/plugin-farming/server/src/config/items.js';

import { FarmingController } from './src/controller.js';

const PLUGIN_NAME = 'Farming System';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    FarmingController.createSpots();
    Athena.systems.inventory.effects.add(FarmItems.Events.HANDLE_FARMING, FarmingController.handleFarmingEvent);
});
