import { createUser } from "@/entities/user/api/mutation/create-user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateUser = () => {
    const qc =useQueryClient()
    return useMutation({
        mutationFn:createUser,
        onSuccess:() => {
            qc.invalidateQueries({
                queryKey:["users"]
            })
        }
    })
}