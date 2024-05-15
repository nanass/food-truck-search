import type { Request, Response } from "express";

import { ISearchFoodTrucksRequestDTO } from "../../domain/dtos";
import { FoodTruckSearchController } from "../../presentation/controllers";

export const createFoodTruckSearch = (controller: FoodTruckSearchController) => {
    return async (request: Request, response: Response) => {
        console.log('Entering food truck search');
        const searchRequest: ISearchFoodTrucksRequestDTO = {
            ...(request.body || {}) 
        }
        const result = await controller.handle(searchRequest);
        response.status(result.statusCode)
        response.json(result.body);
    }
}