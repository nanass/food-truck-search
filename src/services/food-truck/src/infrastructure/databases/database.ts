import { FacilityTypeTable } from "./facility-type";
import { FoodItemTable } from "./food-item";
import { LocationTable } from "./location";
import { PermitTable } from "./permit";
import { ScheduleTable } from "./schedule";
import { VendorTable } from "./vendor";
import { VendorFoodItemTable } from "./vendor-food-item";

export interface Database {
    facility_type: FacilityTypeTable;
    food_item: FoodItemTable;
    location: LocationTable;
    permit: PermitTable;
    schedule: ScheduleTable;
    vendor_food_item: VendorFoodItemTable;
    vendor: VendorTable;
}