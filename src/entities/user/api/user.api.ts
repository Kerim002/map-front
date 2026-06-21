import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { GetUsersQuery } from "./query-type";
import { getUsers } from "./query/get-users";
import { getUserById } from "./query/get-user-by-id";
import { getMe } from "./query/get-me";

export const userApi = {
    all: ["users"],
    list:(params:GetUsersQuery) => {
        return queryOptions({
            queryKey:[...userApi.all, params.page, params.role, params.search],
            queryFn:() => getUsers(params),
            placeholderData:keepPreviousData
        })
    },
    detail:(id:string) => {
        return queryOptions({
            queryKey:[...userApi.all, id],
            queryFn:() => getUserById(id),
            enabled:!!id
        })
    },
    getMe:() => {
        return queryOptions({
            queryKey:["me"],
            queryFn:() => getMe()
        })
    }
}