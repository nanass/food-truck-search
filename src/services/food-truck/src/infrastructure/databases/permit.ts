import {
    Generated,
    Selectable
} from 'kysely';

export interface PermitTable {
    id: Generated<number>;
    location_id: number;
    vendor_id: number;
    facility_type_id: number;
    start_date: Date | null;
    end_date: Date | null;
}

export type Permit = Selectable<PermitTable>;