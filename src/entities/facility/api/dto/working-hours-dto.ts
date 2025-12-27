export type WorkingHoursDto = {
    id: string,
    weekday: number,
    start_time: string | null,
    end_time: string | null,
    is_day_off: boolean,
    created_at: string,
    updated_at: null | string
}