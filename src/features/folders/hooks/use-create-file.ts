import { facilityUploadFile } from "@/entities/facility/api/mutations/facility-upload-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFile = () => {
    const queryClient = useQueryClient()
    const all = useMutation({
        mutationFn: facilityUploadFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["folders"] });

        }

    })

    return all
}