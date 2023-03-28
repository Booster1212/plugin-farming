import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import * as FarmItems from '@AthenaPlugins/plugin-farmingsystem/server/src/config/items';

import { FarmingController } from './src/controller';

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
