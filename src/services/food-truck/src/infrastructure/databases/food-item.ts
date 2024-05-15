import {
    Generated,
    Selectable
} from 'kysely';

export interface FoodItemTable {
    id: Generated<number>;
    food_item_name: string;
}

export type FoodItem = Selectable<FoodItemTable>;