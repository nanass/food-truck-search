import { FoodTruckRepository } from "../../domain/repositories";
import { SearchFoodTrucks } from "../../domain/use-cases";

export class DbSearchFoodTrucks implements SearchFoodTrucks {
    constructor(private readonly foodTruckRepository: FoodTruckRepository) {}
    perform = async (params: SearchFoodTrucks.Params): Promise<SearchFoodTrucks.Result> => {
        console.log('Use Case - Search Food Truck')
        return this.foodTruckRepository.searchFoodTrucks(params);
    };
}