import * as alt from 'alt-server';

import './src/controller';
import './data/registerFarmableItems';
import './data/farmableItems';

import { PluginSystem } from '../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { FarmingController } from './src/controller';

export const OSFarming = {
    name: 'OSFarming',
    version: '1.0',
    interactionRange: 1,
    minFarmDuration: 5000, // In Milliseconds.. each spot takes 5 seconds to farm, so.
    maxFarmDuration: 15000,
  //  spotRespawnTime: 180000, // Should be higher then maxFarmDuration (3 Minutes default)
    minspotRespawnTime: 60000, // Should be higher then maxFarmDuration (1 Minutes default)
    maxspotRespawnTime: 1800000, // Should be higher then maxFarmDuration (3 Minutes default)

}

PluginSystem.registerPlugin(OSFarming.name, () => {
    alt.log(`~lg~${OSFarming.name} ${OSFarming.version} successfully loaded.`);
});

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, () => {
    FarmingController.buildSpots();
});