import { LocationModel } from "./location";
import { ScheduleModel } from "./schedule";

export type PermitModel = {
    facilityTypeName?: string | null,
    location?: LocationModel;
    schedule?: ScheduleModel[];
}