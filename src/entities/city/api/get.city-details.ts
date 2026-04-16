import { apiInstance } from "@/shared/api/interceptor";
import type { City } from "../model/city";
import type { CityDto } from "./dto/city-dto";
import { mapCity } from "./mapper/map-city";

export const getCityDetails = async (id: string): Promise<City> => {
  const res = await apiInstance<CityDto>(`/city/${id}`);
  return mapCity(res);
};
