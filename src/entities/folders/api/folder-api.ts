import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { FacilityFolderQuery } from "./query-type/facility-folder-query";
import { getFacilityFolders } from "./query/get.folder-query";
import { getFolderById } from "./query/get.folder-detail";

export const folderApi = {
    folders: (params: FacilityFolderQuery) => queryOptions({
        queryKey: ["folders", params],
        queryFn: () => getFacilityFolders(params),
        placeholderData: keepPreviousData,
        enabled: !!params.location_id
    }),
    folderById:(id:string) => queryOptions({
        queryKey: ["folders", id],
        queryFn: () => getFolderById(id),
        enabled: !!id
    })
}