import { apiInstance } from "@/shared/api/interceptor"
import type { DashboardStorageDto } from "../dto/dashboard.dto"
import type { DashboardStorage } from "../../model/dashboard"

export const getDashboardStorage =async ():Promise<DashboardStorage>=> {
    const res = await apiInstance<DashboardStorageDto>("/dashboard/storage")

    return {
        totalFiles:res.total_files,
        totalFolders:res.total_folders,
        totalSizeBytes:res.total_size_bytes
    }
} 