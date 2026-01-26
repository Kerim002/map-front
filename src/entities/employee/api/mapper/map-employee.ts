import type { Employee } from "../../model/employee";
import type { EmployeeDto } from "../dto/employee-dto";

export const mapEmployee = (dto: EmployeeDto): Employee => {
    return {
        avatarUrl: dto.avatar_url,
        createdAt: dto.created_at,
        email: dto.email,
        firstName: dto.first_name,
        id: dto.id,
        lastName: dto.last_name,
        location: dto.location,
        phone: dto.phone,
        position: dto.position,
        updatedAt: dto.updated_at,
        order:dto.order,
        surname:dto.surname,
        folder:dto.folder 
        
    }
}