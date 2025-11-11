import { apiInstance } from "@/shared/api/interceptor";
import type { Company } from "../model/company";
import type { CompanyDto } from "./dto/company-dto";
import { mapCompany } from "./mapper/map-company";

export const getCompanyDetail = async (id: string): Promise<Company> => {
  const res = await apiInstance<CompanyDto>(`/company/${id}`);
  return mapCompany(res);
};
