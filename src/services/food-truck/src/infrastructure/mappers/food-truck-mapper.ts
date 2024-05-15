import { FoodItemModel, FoodTruckModel, LocationModel, PermitModel, ScheduleModel } from "../../domain/models";

interface QueryResultType {
    id: number;
    name: string | null;
    permits: {
        facility_type_name: string | null;
        address: string | null;
        zip_code: string | null;
        lat: string | null;
        lon: string | null;
        schedules: {
            day_name: string;
            start_time: string;
            end_time: string;
        }[];
    }[];
    food_items: {
        food_item_name: string
    }[];
    vendor_name: string | null;
}

export class FoodTruckResultMapper {
    mapQueryResultToModels = (queryResult: QueryResultType[]): FoodTruckModel[] => {
        const foodTrucks: FoodTruckModel[] = [];
        for (const result of queryResult) {
            const { id, name, permits, food_items, vendor_name } = result;
            const mappedPermits: PermitModel[] = permits.map((permit) => {
                const { facility_type_name, address, zip_code, schedules, lat, lon } = permit;
                const mappedSchedules: ScheduleModel[] = schedules.map((schedule) => {
                    const { day_name, start_time, end_time } = schedule;
                    return {
                        dayName: day_name,
                        startTime: start_time,
                        endTime: end_time
                    };
                });
                const location: LocationModel = {
                    address: address,
                    zipcode: zip_code,
                    lat: lat,
                    lon: lon
                };

                return {
                    facilityTypeName: facility_type_name,
                    location: location,
                    schedule: mappedSchedules
                };
            });
    
            const mappedFoodItems: FoodItemModel[] = food_items.map((food_item) => {
                return {
                    name: food_item.food_item_name
                };
            });
    
            const foodTruck: FoodTruckModel = {
                name: vendor_name,
                permits: mappedPermits,
                foodItems: mappedFoodItems
            };
    
            foodTrucks.push(foodTruck);
        }
        return foodTrucks;
    }  
}