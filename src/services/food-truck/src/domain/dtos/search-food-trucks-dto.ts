export interface ISearchFoodTrucksRequestDTO {
    location?: {
        lat: string,
        lon: string
    },
    foodItems?: string[]
    vendorName?: string,
    vendorId?: number,
};