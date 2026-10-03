import {
    BadgeCheck,
    Building,
    Focus,
    Home,
    IdCard,
    Landmark,
    LandPlot,
    Map,
    Trash,
    User,
    type LucideIcon,
} from "lucide-react";
import type { UserRoles } from "../types/user";

type SidebarRoute = {
    path: string
    icon: LucideIcon
    name: string
    roles: UserRoles[]
}

export const SIDEBAR_ROUTES_CONSTANTS: SidebarRoute[] = [
    { path: "/", icon: Home, name: "home", roles: ["admin", "superadmin", "moderator", "viewer"] },
    { path: "/map", icon: Map, name: "map", roles: ["admin", "superadmin", "moderator", "viewer"] },
    { path: "/authority/1", icon: IdCard, name: "authority", roles: ["admin", "superadmin", "moderator"] },
    { path: "/minister/1", icon: Landmark, name: "minister", roles: ["admin", "superadmin", "moderator"] },
    { path: "/building/1", icon: Building, name: "building", roles: ["admin", "superadmin", "moderator"] },
    { path: "/performance/1", icon: BadgeCheck, name: "performance", roles: ["admin", "superadmin", "moderator"] },
    { path: "/specialization/1", icon: Focus, name: "specialization", roles: ["admin", "superadmin", "moderator"] },
    { path: "/region/1", icon: LandPlot, name: "region", roles: ["admin", "superadmin", "moderator"] },
    { path: "/district/1", icon: LandPlot, name: "district", roles: ["admin", "superadmin", "moderator"] },
    { path: "/city/1", icon: LandPlot, name: "city", roles: ["admin", "superadmin", "moderator"] },
    { path: "/users/1", icon: User, name: "users", roles: ["admin", "superadmin"] },
    { path: "/trash/1?entity=location", icon: Trash, name: "trash", roles: ["superadmin"] }
];
