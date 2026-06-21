import { updateUser } from "@/entities/user/api/mutation/update-user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateUser = () => {
    const qc =useQueryClient()
    return useMutation({
        mutationFn:updateUser,
        onSuccess:(_, variables) => {
            qc.invalidateQueries({
                queryKey:["users"]
            })
            qc.invalidateQueries({
                queryKey:["users",variables.userId]
            })
        },
        onError:(_,variables)=>{
                      qc.invalidateQueries({
                queryKey:["users",variables.userId]
            })  
        }
    })
}