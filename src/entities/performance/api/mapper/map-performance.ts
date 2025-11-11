import type { Performance } from "../../model/performance";
import type { PerformanceDto } from "../dto/performance-dto";

export const mapPerformance = (dto: PerformanceDto): Performance => {
  return {
    createdAt: dto.created_at,
    id: dto.id,
    type: dto.type,
    updatedAt: dto.updated_at ?? "",
  };
};
