import { BaseItem } from '../../../../../../shared/interfaces/item';
import { FarmingEvents } from '../events';

const toolBehavior = {
    isToolbar: true,
    canDrop: true,
};

export const farmingTools: Array<BaseItem> = [
    {
        name: 'Mining-Drill',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 75,
        },
        consumableEventToCall: FarmingEvents.HANDLE_FARMING,
        dbName: 'OS-Farming-Drill',
    },
    {
        name: 'Woodfellers Axe',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 25,
        },
        consumableEventToCall: FarmingEvents.HANDLE_FARMING,
        dbName: 'OS-Farming-Axe',
    },
    {
        name: 'Garden Shears',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 25,
        },
        consumableEventToCall: FarmingEvents.HANDLE_FARMING,
        dbName: 'OS-Farming-Garden-Shears',
    },
    {
        name: 'Fishing Rod',
        icon: 'crate',
        behavior: toolBehavior,
        data: {
            durability: 25,
        },
        consumableEventToCall: FarmingEvents.HANDLE_FARMING,
        dbName: 'OS-Farming-Fishing-Rod',
    },
];
