import { apiInstance } from "@/shared/api/interceptor";
import type { Authority } from "../model/authority";
import type { AuthorityDto } from "./dto/authority-dto";
import { mapAuthority } from "./mapper/map-authority";

export const getAuthorityDetail = async (id: string): Promise<Authority> => {
  const res = await apiInstance<AuthorityDto>(`/authority/${id}`);
  return mapAuthority(res);
};
