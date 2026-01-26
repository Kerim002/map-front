import { apiInstance } from "@/shared/api/interceptor";
import type { EmployeCreateMutation } from "../../contract/employee.contract";

export const createEmployee = async (body: EmployeCreateMutation & { location_id: string }) => {
    // 1. Check if any value in the body is a File or Blob
    const hasFile = Object.values(body).some(
        (value) => value instanceof File
    );

    let requestConfig: any;

    if (hasFile) {
        const formData = new FormData();

        formData.append("location_id", body.location_id)
        formData.append("position", body.position)
        formData.append("folder_id", body.folder.id)
        formData.append("phone", body.phone)
        formData.append("last_name", body.last_name)
        body.avatar_cropped && formData.append("avatar", body.avatar_cropped)
        formData.append("first_name", body.first_name)
        formData.append("surname", body.surname)
        formData.append("email", body.email)
        console.log(hasFile)
        requestConfig = {
            method: "POST",
            body: formData,
        };
    } else {
        requestConfig = {
            method: "POST",
            json: body,
        };
    }

    await apiInstance(`/employee${hasFile ? "/with-avatar" : ""}`, requestConfig);
};