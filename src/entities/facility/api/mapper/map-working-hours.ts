import type { WorkingHours } from "../../model/working-hours";
import type { WorkingHoursDto } from "../dto/working-hours-dto";

export const mapWorkingHours = (dto: WorkingHoursDto): WorkingHours => {

    return {
        createdAt: dto.created_at,
        endTime: dto.end_time ?? "",
        id: dto.id,
        isDayOff: dto.is_day_off,
        startTime: dto.start_time ?? "",
        updatedAt: dto.updated_at ?? "",
        weekday: dto.weekday

    }
}