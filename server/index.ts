import * as alt from 'alt-server';
import { FarmingController } from './src/controller';
import { PluginSystem } from '../../../server/systems/plugins';

import './src/defaults/index';

const PLUGIN_NAME = 'Farming System';
const AUTHORS = ['Der Lord!', 'deeMace'];

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    const spots = FarmingController.createSpots();
    alt.log(`~lg~[PLUGIN] ==> ${PLUGIN_NAME} successfully loaded. ${spots} Farmingspots created! (~w~Authors: ${AUTHORS.join(', ')}~lg~)`);
});
