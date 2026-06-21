import { apiInstance } from "@/shared/api/interceptor";
import type {  UpdateUserMutation } from "../../contract";

export const updateUser = async ({json,userId}:{json: UpdateUserMutation, userId:string}) => {
    await apiInstance(`/user/${userId}`,
        { method: "PUT", json }
    )
}