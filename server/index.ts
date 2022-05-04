import * as alt from 'alt-server';
import { FarmingController } from './src/controller';
import { PluginSystem } from '../../../server/systems/plugins';
import { config } from './src/config';
import './src/defaults/index';

PluginSystem.registerPlugin(config.pluginName, () => {
    const spots = FarmingController.createSpots();
    alt.log(`~lg~[PLUGIN] ==> ${config.pluginName} successfully loaded. ${spots} spots created.`);
});
