import {
    Generated,
    Selectable
} from 'kysely';

export interface VendorTable {
    id: Generated<number>
    vendor_name: string | null
}

export type Vendor = Selectable<VendorTable>;