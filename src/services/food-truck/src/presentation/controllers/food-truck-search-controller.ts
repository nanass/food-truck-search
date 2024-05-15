import { SearchFoodTrucks } from "../../domain/use-cases";
import { ISearchFoodTrucksRequestDTO } from "../../domain/dtos";
import { FoodTruckModel } from "../../domain/models";


export class FoodTruckSearchController {
    constructor(private readonly searchFoodTrucks: SearchFoodTrucks){}
    handle = async (request: FoodTruckSearchController.Request): 
        Promise<FoodTruckSearchController.Response<FoodTruckModel[]>> => {
            console.log('Search controller');
            try{
                const searchResults = await this.searchFoodTrucks.perform(request);
                return {
                    statusCode: 200,
                    body: searchResults
                }
            } catch (err){
                return {
                    statusCode: 500,
                    message: 'INTERNAL SERVER ERROR'
                }
            }

    }
}

export namespace FoodTruckSearchController {
    export type Request = ISearchFoodTrucksRequestDTO;
    export type Response<T> = {
        statusCode: number;
        message?: string;
        body?: T;
    }
}