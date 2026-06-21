import type { User } from "../../model/user";
import type { UserDto } from "../dto/user.dto";

export const mapUser = (user:UserDto):User => {
    return {
        createdAt:user.created_at,
        id:user.id,
        name:user.name,
        phone:user.phone,
        role:user.role,
        surname:user.surname,
        updatedAt:user.updated_at,
        username:user.username
    }
}