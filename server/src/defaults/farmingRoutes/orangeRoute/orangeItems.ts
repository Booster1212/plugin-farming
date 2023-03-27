import { BaseItem } from '@AthenaShared/interfaces/item';

const orangeBehavior = { canDrop: true, canStack: true };
export const orangeItems: Array<BaseItem> = [
    {
        name: 'Orange',
        icon: 'crate',
        behavior: orangeBehavior,
        data: {
            dropchance: 100,
        },
        dbName: 'OS-Farming-Orange',
    },
];
