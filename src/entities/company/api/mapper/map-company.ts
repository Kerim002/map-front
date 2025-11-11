import type { Company } from "../../model/company";
import type { CompanyDto } from "../dto/company-dto";

export const mapCompany = (dto: CompanyDto): Company => {
  return {
    authority: dto.authority
      ? dto.authority
      : {
          id: "",
          type: "",
        },
    cadasterCode: dto.cadaster_code,
    createdAt: dto.created_at,
    id: dto.id,
    name: dto.name,
    ownership: dto.ownership
      ? dto.ownership
      : {
          id: "",
          type: "",
        },
    performance: dto.performance
      ? dto.performance
      : {
          id: "",
          type: "",
        },
    region: dto.region
      ? dto.region
      : {
          id: "",
          type: "",
        },
    updatedAt: dto.updated_at,
  };
};
