import { ISearchFoodTrucksRequestDTO } from "../dtos";
import { FoodTruckModel } from "../models";

export interface FoodTruckRepository {
    searchFoodTrucks: (params: FoodTruckRepository.Params) => Promise<FoodTruckRepository.Result>
}

export namespace FoodTruckRepository {
    export type Params = ISearchFoodTrucksRequestDTO;
    export type Result = FoodTruckModel[];
}