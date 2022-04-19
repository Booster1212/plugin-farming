import * as alt from 'alt-server';
import { PluginSystem } from '../../../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../../../shared/enums/system';
import './farmingLists/farmingItems';
import './farmingLists/farmingTools';
import { FarmingController } from './src/controller';



export const OSFarming = {
    name: 'OSFarming',
    version: 'v1.0',
}

PluginSystem.registerPlugin(OSFarming.name, () => {
    alt.log(`~lg~${OSFarming.name} ${OSFarming.version} successfully loaded.`);
});

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, () => {
    FarmingController.createSpots();
});