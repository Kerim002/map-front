import { apiInstance } from "@/shared/api/interceptor";
import type { CreateCompanyMutation } from "../contract";

export type CreateBody = {
  name: string;
  cadaster_code?: string;
  performance_id?: string;
  ownership_id?: string;
  authority_id?: string;
  region_id?: string;
};

export const updateCompany = async (
  payload: CreateCompanyMutation & { id: string }
) => {
  const authorityId = payload?.authority?.id;
  const ownershipId = payload?.ownership?.id;
  const performanceId = payload?.performance?.id;
  const regionId = payload?.region?.id;
  const cadasterCode = payload?.cadasterCode;
  const json: CreateBody = {
    // Required fields are always included
    name: payload.name, // Conditionally spread properties only if the ID exists (is not null/undefined)
    ...(cadasterCode && { cadaster_code: cadasterCode }),
    ...(authorityId && { authority_id: authorityId }),
    ...(ownershipId && { ownership_id: ownershipId }),
    ...(performanceId && { performance_id: performanceId }),
    ...(regionId && { region_id: regionId }),
  };

  await apiInstance(`/company/${payload.id}`, {
    json,
    method: "PATCH",
  });
};
