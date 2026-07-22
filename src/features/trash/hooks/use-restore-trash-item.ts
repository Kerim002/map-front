import { restoreTrashItem } from "@/entities/trash/api/restore-trash-item"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRestoreTrashItem = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: restoreTrashItem,
        onSuccess: (_, variables) => {
            qc.invalidateQueries({
                queryKey: ["trash"]
            })
            qc.invalidateQueries({
                queryKey: [variables.entity]
            })
        },
        onError: (_, variables) => {
            qc.invalidateQueries({
                queryKey: ["trash"]
            })
            qc.invalidateQueries({
                queryKey: [variables.entity]
            })
        },
    })
}