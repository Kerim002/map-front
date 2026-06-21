import { deleteUser } from '@/entities/user/api/mutation/delete-user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteUser = () => {
    const qc =useQueryClient()
    return useMutation({
        mutationFn:deleteUser,
        onSuccess:() => {
            qc.invalidateQueries({
                queryKey:["users"]
            })
        },
        onError:() => {
                        qc.invalidateQueries({
                queryKey:["users"]
            })
        }
    })
}
