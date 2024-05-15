import { FoodTruckResultMapper } from "../../../src/infrastructure/mappers";

describe('Food Truck Mapper', () => {
    it('Transforms DB result to Food Truck Model', () => {
        const mapper = new FoodTruckResultMapper()
        const model = mapper.mapQueryResultToModels(
            [{
                id: 1,
                name: "Test Truck",
                permits: [{
                    facility_type_name: "Truck",
                    address: "1234 1st St",
                    zip_code: "98989",
                    lat: "-134",
                    lon: "4",
                    schedules: [{
                        day_name: "Su",
                        start_time: "09:00",
                        end_time: "10:00"
                    }],
                }],
                food_items: [{
                    food_item_name: "Coffee"
                }],
                vendor_name: "Test Truck",
            }]
        );
        expect(model.length).toBe(1);
        expect(model[0].name).toBe("Test Truck");
        expect(model[0].permits?.length).toBe(1)
        expect(model[0].foodItems?.length).toBe(1)
    })
});