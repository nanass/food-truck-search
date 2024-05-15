import {
    Generated,
    Selectable
} from 'kysely';

export interface ScheduleTable {
    id: Generated<number>
    permit_id: number;
    day_ord: number;
    day_name: string;
    start_time: string;
    end_time: string;
}

export type Schedule = Selectable<ScheduleTable>;