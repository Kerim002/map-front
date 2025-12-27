import { apiInstance } from "@/shared/api/interceptor"

type Args = {
    files:File[],
    id:string
}

export const createFacilityImage = async (args:Args) => {
    const formdata = new FormData()
    console.log(args.files)
    args.files.forEach(element => {
        formdata.append("files", element)
    });
    await apiInstance(`/location/${args.id}/image`,{
        method:"POST",
        body:formdata
    })
}