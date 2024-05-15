import { jsonArrayFrom } from 'kysely/helpers/postgres';

import { ISearchFoodTrucksRequestDTO } from "../../domain/dtos"
import { FoodTruckModel } from "../../domain/models"
import { kyselyClient } from "../databases"
import { FoodTruckResultMapper } from '../mappers';

export class FoodTruckRepository {
    searchFoodTrucks = async(criteria: Partial<ISearchFoodTrucksRequestDTO>) : Promise<FoodTruckModel[]> => {
        const mapper = new FoodTruckResultMapper()
        const connection = kyselyClient.getConnection();
        let query = connection
            .with('permits', (db) => db
                .selectFrom('permit')
                    .leftJoin('facility_type', 'facility_type.id', 'permit.facility_type_id')
                    .leftJoin('location', 'location.id', 'permit.location_id')
                    .select((eb1) => [
                        'permit.vendor_id',
                        'facility_type.facility_type_name',
                        'location.address',
                        'location.zip_code',
                        'location.lat',
                        'location.lon',
                        jsonArrayFrom(
                            eb1.selectFrom('schedule')
                            .whereRef('schedule.permit_id', '=', 'permit.id')
                            .select(['schedule.day_name', 'schedule.start_time', 'schedule.end_time'])
                        ).as('schedules')
                    ])
            )
            .selectFrom('vendor')
                .select((eb) => [
                    'id',
                    'vendor.vendor_name as name',
                    'vendor.vendor_name',
                    jsonArrayFrom(eb.selectFrom('permits')
                        .whereRef('permits.vendor_id', '=', 'vendor.id')
                        .select(['facility_type_name','address','zip_code','schedules','lat','lon'])).as('permits'),
                    jsonArrayFrom(eb.selectFrom('food_item')
                        .innerJoin('vendor_food_item', 'vendor_food_item.food_item_id', 'food_item.id')
                        .whereRef('vendor_food_item.vendor_id', '=', 'vendor.id')
                        .select(['food_item.food_item_name'])).as('food_items')
                ]);

        if(criteria.foodItems){
            query = query 
                .where(({exists, selectFrom}) => exists(
                    selectFrom('food_item')
                        .innerJoin('vendor_food_item', 'vendor_food_item.food_item_id', 'food_item.id')
                        .where('food_item.food_item_name', 'in', criteria.foodItems || [])
                        .whereRef('vendor.id', '=', 'vendor_food_item.vendor_id')
                        .select('vendor_food_item.vendor_id'))
                );
        }

        if(criteria.vendorName){
            query = query.where('vendor.vendor_name', '=', criteria.vendorName || '');
        }

        if(criteria.vendorId){
            query = query.where('vendor.id', '=', criteria.vendorId || 0);
        }

        const result = await query.execute()
        return mapper.mapQueryResultToModels(result);
    }
}



