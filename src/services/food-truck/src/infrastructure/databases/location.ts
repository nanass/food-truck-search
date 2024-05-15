import {
    Generated,
    Selectable
} from 'kysely';

export interface LocationTable {
    id: Generated<number>;
    address: string;
    zip_code: string;
    lon: string;
    lat: string;
}

export type Location = Selectable<LocationTable>;