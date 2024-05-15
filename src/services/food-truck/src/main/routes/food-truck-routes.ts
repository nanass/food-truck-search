import { Router } from "express";
import { FoodTruckSearchController } from "../../presentation/controllers/food-truck-search-controller";
import { DbSearchFoodTrucks } from "../../infrastructure/use-cases";
import { FoodTruckRepository } from "../../infrastructure/repositories";
import { createFoodTruckSearch } from "../factories/create-food-truck-search";

const foodTruckRoutes = Router();

foodTruckRoutes.get("/search", createFoodTruckSearch(
    new FoodTruckSearchController(
        new DbSearchFoodTrucks(
            new FoodTruckRepository())
    )
));

export { foodTruckRoutes };      