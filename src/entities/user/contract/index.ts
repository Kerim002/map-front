import type z from "zod";
import { CreateUserContract, UpdateUserContract } from "./user.contract";


export type CreateUserMutation = z.infer<typeof CreateUserContract>
export type UpdateUserMutation = z.infer<typeof UpdateUserContract>

export { CreateUserContract, UpdateUserContract }