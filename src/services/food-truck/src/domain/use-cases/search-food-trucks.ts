import { FoodTruckModel } from "../models";
import { ISearchFoodTrucksRequestDTO } from "../dtos";

export interface SearchFoodTrucks {
    perform: (params: SearchFoodTrucks.Params) => Promise<SearchFoodTrucks.Result>;
}

export namespace SearchFoodTrucks {
    export type Params = ISearchFoodTrucksRequestDTO;
    export type Result = FoodTruckModel[]
}