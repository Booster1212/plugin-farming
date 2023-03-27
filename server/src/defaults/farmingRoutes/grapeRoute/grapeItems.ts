import { BaseItem } from '@AthenaShared/interfaces/item';

const grapeBehavior = { canDrop: true, canStack: true };

export const grapeItems: Array<BaseItem> = [
    {
        name: 'Grape',
        icon: 'crate',
        behavior: grapeBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Grape',
    },
];
