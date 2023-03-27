import { BaseItem } from '@AthenaShared/interfaces/item';

const tomatoBehavior = { canDrop: true, canStack: true };
export const tomatoItems: Array<BaseItem> = [
    {
        name: 'Tomato',
        icon: 'crate',
        behavior: tomatoBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Tomato',
    },
];
