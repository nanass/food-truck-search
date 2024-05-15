import {
    Generated,
    Selectable
} from 'kysely';

export interface FacilityTypeTable {
    id: Generated<number>;
    facility_type_name: string;
}

export type FacilityType = Selectable<FacilityTypeTable>;