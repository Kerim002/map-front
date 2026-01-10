import { facilityUploadFile } from "@/entities/facility/api/mutations/facility-upload-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadFacilityFile = () => {
    const queryClient = useQueryClient()
    const all = useMutation({
        mutationFn: facilityUploadFile,
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:["facility-folders"]
            })
        }

    })

    return all
}