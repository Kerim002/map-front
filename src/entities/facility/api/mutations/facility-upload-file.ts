import { apiInstance } from "@/shared/api/interceptor"

type Props = {
    location_id: string,
    // path: string,
    files: File[]
}

export const facilityUploadFile = async ({ files, location_id }: Props) => {

    const formdata = new FormData()
    files.forEach((file) => {

        formdata.append("files", file)
    })

    await apiInstance(`item/${location_id}/file`, {
        method: "POST",
        body: formdata
    })
}