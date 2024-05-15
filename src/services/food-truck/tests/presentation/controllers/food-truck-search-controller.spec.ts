import { FoodTruckModel } from "../../../src/domain/models"
import { SearchFoodTrucks } from "../../../src/domain/use-cases"
import { FoodTruckSearchController } from "../../../src/presentation/controllers"

describe('Food Truck Search Controller', () => {
    const searchMock = {
        perform : () => {
            return Promise.resolve([{
                "name": "Tacos El Primo",
                "permits": [
                  {
                    "facilityTypeName": "Truck",
                    "location": {
                      "address": "1495 WALLACE AVE",
                      "zipcode": "58",
                      "lat": "37.72593049503994",
                      "lon": "-122.38921555942115"
                    },
                    "schedule": [
                      {
                        "dayName": "Tu",
                        "startTime": "08:00:00",
                        "endTime": "15:00:00"
                      },
                      {
                        "dayName": "Sa",
                        "startTime": "08:00:00",
                        "endTime": "15:00:00"
                      }
                    ]
                  }
                ],
                "foodItems": [
                  {
                    "name": "Fruit Juice"
                  },
                  {
                    "name": "Rice Pudding"
                  },
                  {
                    "name": "Flan"
                  },
                  {
                    "name": "Tea"
                  }
                ]
              }])
        }
    }

    const failSearch = {
        perform : () => {
            return Promise.reject()
        }
    }

    it('Returns 200 Status for success', async () => {
        const controller = new FoodTruckSearchController(searchMock)
        const result = await controller.handle({});
        expect(result.statusCode).toBe(200);
    });

    it('Returns 500 Status for failure', async () => {
        const controller = new FoodTruckSearchController(failSearch)
        const result = await controller.handle({});
        expect(result.statusCode).toBe(500);
        expect(result.message).toBe('INTERNAL SERVER ERROR');
    });

    it('Returns Food Truck Model', async () => {
        const controller = new FoodTruckSearchController(searchMock)
        const result = await controller.handle({});
        expect((result.body || [])[0].name).toBe('Tacos El Primo');
        expect((result.body || [])[0].permits?.length).toBe(1);
    });

})