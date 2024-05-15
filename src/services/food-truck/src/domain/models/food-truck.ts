import { FoodItemModel } from "./food-item";
import { PermitModel } from "./permit";

export type FoodTruckModel = {
    name?: string | null;
    permits?: PermitModel[];
    foodItems?: FoodItemModel[];
}