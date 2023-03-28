import * as alt from 'alt-server';
import * as FarmingItems from '@AthenaPlugins/plugin-farmingsystem/server/src/config/items';
import * as FarmingLocations from '@AthenaPlugins/plugin-farmingsystem/server/src/config/locations';

import { IFarming } from '../interfaces/iFarming';
import { ANIMATION_FLAGS } from '@AthenaShared/flags/animationFlags';

export const main: Array<IFarming> = [
    // MINING ROUTE
    {
        routeName: 'Mining Route',
        requiredTool: ['os-farming-drill'],
        isAnimation: true,
        farmDuration: 10000,
        blips: [
            {
                text: 'Miners Place',
                color: 40,
                sprite: 88,
                scale: 1,
                position: { x: 2912.41748046875, y: 2778.765380859375, z: 44.96366882324219 - 1 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        animation: {
            dict: 'amb@world_human_const_drill@male@drill@base',
            name: 'base',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Mining...',
        },

        attacheable: {
            bone: 61,
            model: 'prop_tool_jackham',
            pos: { x: 0, y: 0, z: 0 } as alt.Vector3,
            rot: { x: 0, y: 0, z: 0 } as alt.Vector3,
        },

        spots: {
            positions: FarmingLocations.miningLocations,
        },

        outcome: [...FarmingItems.miningItems],
    },
    // WOOD ROUTE
    {
        routeName: 'Wood-Route',
        requiredTool: ['os-farming-axe'],
        isAnimation: true,
        farmDuration: 3000,

        blips: [
            {
                text: 'Woodfellers Place',
                color: 56,
                sprite: 801,
                scale: 1,
                position: { x: -474.09478759765625, y: 5587.1962890625, z: 69.96195220947266 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Woodfelling...',
        },

        attacheable: {
            bone: 91,
            model: 'prop_ld_fireaxe',
            pos: { x: 0.05, y: -0.1, z: -0.06 } as alt.Vector3,
            rot: { x: 60, y: 0, z: -180 } as alt.Vector3,
        },

        animation: {
            dict: 'melee@large_wpn@streamed_core',
            name: 'car_down_attack',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        spots: {
            positions: FarmingLocations.woodLocations,
        },

        outcome: [...FarmingItems.woodItems],
    },
    {
        routeName: 'Fishing-Route-1',
        requiredTool: ['os-farming-fishing-rod'],
        isAnimation: true,
        farmDuration: 3000,
        blips: [
            {
                text: 'Fishermens Place',
                color: 56,
                sprite: 801,
                scale: 1,
                position: { x: 32.57453536987305, y: 855.6867065429688, z: 197.7342987060547 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        animation: {
            dict: 'amb@world_human_stand_fishing@idle_a',
            name: 'idle_c',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Farming...',
        },

        attacheable: {
            model: 'prop_fishing_rod_01',
            pos: { x: 0, y: -0.01, z: 0.01 } as alt.Vector3,
            rot: { x: 0, y: -0.01, z: 0.01 } as alt.Vector3,
            bone: 61,
        },

        spots: {
            positions: FarmingLocations.fishingLocations,
        },

        outcome: [...FarmingItems.fishingItems],
    },
    {
        routeName: 'Tomato-Route',
        requiredTool: ['os-farming-garden-shears'],
        isAnimation: true,
        farmDuration: 60000,
        blips: [
            {
                text: 'Tomato Plantation',
                color: 1,
                sprite: 88,
                scale: 1,
                position: { x: 322.28570556640625, y: 6487.79345703125, z: 29.161865234375 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        animation: {
            dict: 'anim@amb@business@cfm@cfm_machine_oversee@',
            name: 'button_press_operator',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Farming...',
        },

        attacheable: {
            bone: 71,
            model: 'v_ret_gc_scissors',
            pos: { x: 0.2, y: 0.09, z: 0.05 } as alt.Vector3,
            rot: { x: -55, y: -145, z: 10 } as alt.Vector3,
        },

        spots: {
            positions: FarmingLocations.tomatoLocations,
        },

        outcome: [...FarmingItems.tomatoItems],
    },

    {
        routeName: 'Orange-Route',
        requiredTool: ['os-farming-garden-shears'],
        isAnimation: true,
        farmDuration: 60000,
        blips: [
            {
                text: 'Orange Plantation',
                color: 17,
                sprite: 88,
                scale: 1,
                position: { x: 350.9010925292969, y: 6516.77783203125, z: 28.5216064453125 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Farming...',
        },

        attacheable: {
            model: 'ng_proc_food_ornge1a',
            bone: 71,
            pos: { x: 0.16, y: 0.01, z: -0.01 } as alt.Vector3,
            rot: { x: -15, y: -150, z: -95 } as alt.Vector3,
        },

        animation: {
            dict: 'amb@prop_human_movie_bulb@idle_a',
            name: 'idle_a',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        spots: {
            positions: FarmingLocations.orangeLocations,
        },

        outcome: [...FarmingItems.orangeItems],
    },
    {
        routeName: 'Salad-Route',
        requiredTool: ['os-farming-garden-shears'],
        isAnimation: true,
        farmDuration: 60000,
        blips: [
            {
                text: 'Salad Plantation',
                color: 2,
                sprite: 88,
                scale: 1,
                position: { x: 551.5120849609375, y: 6518.59765625, z: 29.819091796875 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        animation: {
            dict: 'amb@world_human_gardener_plant@male@base',
            name: 'base',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Farming...',
        },

        attacheable: {
            bone: 71,
            model: 'prop_cs_trowel',
            pos: { x: 0.1, y: 0.01, z: -0.03 } as alt.Vector3,
            rot: { x: 130, y: 70, z: -5 } as alt.Vector3,
        },

        spots: {
            positions: FarmingLocations.saladLocations,
        },

        outcome: [...FarmingItems.saladItems],
    },
    {
        routeName: 'Potato-Route',
        requiredTool: ['os-farming-garden-shears'],
        isAnimation: true,
        farmDuration: 60000,
        blips: [
            {
                text: 'Potato Plantation',
                color: 21,
                sprite: 88,
                scale: 1,
                position: { x: 545.1692504882812, y: 6517.595703125, z: 29.920166015625 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        animation: {
            dict: 'amb@world_human_gardener_plant@male@base',
            name: 'base',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Farming...',
        },

        attacheable: {
            bone: 71,
            model: 'prop_cs_trowel',
            pos: { x: 0.1, y: 0.01, z: -0.03 } as alt.Vector3,
            rot: { x: 130, y: 70, z: -5 } as alt.Vector3,
        },

        spots: {
            positions: FarmingLocations.potatoLocations,
        },

        outcome: [...FarmingItems.potatoItems],
    },
    {
        routeName: 'Pepper-Route',
        requiredTool: ['os-farming-garden-shears'],
        isAnimation: true,
        farmDuration: 60000,
        blips: [
            {
                text: 'Pepper Plantation',
                color: 25,
                sprite: 88,
                scale: 1,
                position: { x: 393.6263732910156, y: 6594.98876953125, z: 28.5047607421875 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        animation: {
            dict: 'amb@world_human_gardener_plant@male@base',
            name: 'base',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Farming...',
        },

        attacheable: {
            bone: 71,
            model: 'prop_cs_trowel',
            pos: { x: 0.1, y: 0.01, z: -0.03 } as alt.Vector3,
            rot: { x: 130, y: 70, z: -5 } as alt.Vector3,
        },

        spots: {
            positions: FarmingLocations.pepperLocations,
        },

        outcome: [...FarmingItems.pepperItems],
    },
    {
        routeName: 'Grape-Route',
        requiredTool: ['os-farming-garden-shears'],
        isAnimation: true,
        farmDuration: 60000,
        blips: [
            {
                text: 'Grape Plantation',
                color: 58,
                sprite: 88,
                scale: 1,
                position: { x: -1888.3385009765625, y: 2049.62646484375, z: 140.977294921875 } as alt.Vector3,
            },
        ],

        marker: {
            type: 2,
            color: {
                r: 10,
                g: 156,
                b: 0,
                a: 255,
            },
            bobUpAndDown: true,
            rotate: true,
            isMarker: true,
        },

        animation: {
            dict: 'anim@amb@business@cfm@cfm_machine_oversee@',
            name: 'button_press_operator',
            flags: ANIMATION_FLAGS.REPEAT,
        },

        progressBar: {
            color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
            },
            distance: 15,
            text: 'Farming...',
        },

        attacheable: {
            bone: 71,
            model: 'prop_cs_trowel',
            pos: { x: 0.1, y: 0.01, z: -0.03 } as alt.Vector3,
            rot: { x: 130, y: 70, z: -5 } as alt.Vector3,
        },
        spots: {
            positions: FarmingLocations.grapeLocations,
        },
        outcome: [...FarmingItems.grapeItems],
    },
];
