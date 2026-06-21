import { apiInstance } from "@/shared/api/interceptor";
import type { CreateUserMutation } from "../../contract";

export const createUser = async (json: CreateUserMutation) => {
    await apiInstance("/user",
        { method: "POST", json }
    )
}