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
        Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });
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