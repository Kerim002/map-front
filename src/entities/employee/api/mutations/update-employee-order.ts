import { apiInstance } from "@/shared/api/interceptor"

type Props = {
    location_id: string,
    order: number,
    employee_id: string
}

export const updateEmployeeOrder = async ({ employee_id, location_id, order }: Props) => {
    await apiInstance(`/employee/${employee_id}/order`, {
        json: {
            location_id,
            order
        },
        method: "PATCH"

    })
}