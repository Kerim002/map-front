import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import type { UserRoles } from "@/shared/types/user";
import { Navigate, Outlet } from "react-router-dom";
interface ProtectedRouteProps {
    allowedRoles: UserRoles[];
}
export const ProtectedLayout = ({ allowedRoles }: ProtectedRouteProps) => {
      const { data: user, isLoading } = useProfileQuery();

    if (isLoading) return <p>Загрузка...</p>;

    if (!user) return <Navigate to="/sign-in" replace />;

    if (![...allowedRoles, "superadmin"].includes(user.role)) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
};
