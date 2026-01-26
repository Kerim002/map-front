import { apiInstance } from "@/shared/api/interceptor";

export const createFolder = async ({locationId,name,path}:{locationId: string, path: string, name: string}): Promise<void> => {
    await apiInstance(`/item/${locationId}/folder`, { json: { path, name }, method: "POST" });
}