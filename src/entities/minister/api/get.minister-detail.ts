import { apiInstance } from "@/shared/api/interceptor";
import type { Minister } from "../model/minister";
import type { MinisterDto } from "./dto/minister-dto";
import { mapMinister } from "./mapper/map-minister";

export const getMinisterDetail = async (id: string): Promise<Minister> => {
  const res = await apiInstance<MinisterDto>(`/ministers/${id}`);
  return mapMinister(res);
};
