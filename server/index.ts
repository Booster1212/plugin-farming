import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import * as FarmItems from '@AthenaPlugins/plugin-farming/server/src/config/items.js';

import { FarmingController } from './src/controller.js';

const PLUGIN_NAME = 'Farming System';
const AUTHORS = ['Der Lord!', 'deeMace'];

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    const spots = FarmingController.createSpots();
    alt.log(
        `~lg~[PLUGIN] ==> ${PLUGIN_NAME} successfully loaded. ${spots} Farmingspots created! (~w~Authors: ${AUTHORS.join(
            ', ',
        )}~lg~)`,
    );
    Athena.systems.inventory.effects.add(FarmItems.Events.HANDLE_FARMING, FarmingController.handleFarmingEvent);
});
