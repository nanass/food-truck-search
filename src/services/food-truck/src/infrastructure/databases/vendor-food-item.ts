import {
    Generated,
    Selectable
} from 'kysely';

export interface VendorFoodItemTable {
    id: Generated<number>
    vendor_id: number;
    food_item_id: number;
}

export type VendorFoodItem = Selectable<VendorFoodItemTable>;