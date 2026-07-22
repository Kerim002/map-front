import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import { getTrash } from "./get-trash"

export const trashApi = {
    getTrash: (params: PageBaseQuery & { entity?: string }) => {
        return queryOptions({
            queryKey:["trash", params],
            queryFn:() => getTrash(params),
            placeholderData:keepPreviousData
        })
    }
}