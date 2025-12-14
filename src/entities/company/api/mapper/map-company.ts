import type { Company, CompanyImage } from "../../model/company";
import type { CompanyDto, CompanyImageDto } from "../dto/company-dto";

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
    images: dto.images?.map(mapCompanyImage) ?? [],
  };
};

export const mapCompanyImage = (dto: CompanyImageDto): CompanyImage => {
  const { bucket_name, created_at, id, object_path } = dto;
  return {
    bucketName: bucket_name,
    createdAt: created_at,
    id,
    objectPath: object_path,
  };
};
