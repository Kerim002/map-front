import type { UserRoles } from "../types/user";

type ACTION_TYPE =
    "authority"
    | "building"
    | "city"
    | "district"
    | "employee"
    | "facility"
    | "ownership"
    | "performance"
    | "region"
    | "spec"
    | "user"
    | "files"
    | "employee-files"
    | "trash"

type ACTION<T extends ACTION_TYPE> =
    | `view:${T}`
    | `create:${T}`
    | `edit:${T}`
    | `delete:${T}`

type ACTIONS = ACTION<ACTION_TYPE>;
type PERMISSIONS_TYPE = Record<UserRoles, ACTIONS[]>;

export const AUTHORITY_CRUD: ACTIONS[] = [
    "view:authority",
    "create:authority",
    "edit:authority",
    "delete:authority",
];

export const BUILDING_CRUD: ACTIONS[] = [
    "view:building",
    "create:building",
    "edit:building",
    "delete:building",
];

export const CITY_CRUD: ACTIONS[] = [
    "view:city",
    "create:city",
    "edit:city",
    "delete:city",
];

export const DISTRICT_CRUD: ACTIONS[] = [
    "view:district",
    "create:district",
    "edit:district",
    "delete:district",
];

export const EMPLOYEE_CRUD: ACTIONS[] = [
    "view:employee",
    "create:employee",
    "edit:employee",
    "delete:employee",
];

export const FACILITY_CRUD: ACTIONS[] = [
    "view:facility",
    "create:facility",
    "edit:facility",
    "delete:facility",
];

export const OWNERSHIP_CRUD: ACTIONS[] = [
    "view:ownership",
    "create:ownership",
    "edit:ownership",
    "delete:ownership",
];

export const PERFORMANCE_CRUD: ACTIONS[] = [
    "view:performance",
    "create:performance",
    "edit:performance",
    "delete:performance",
];

export const REGION_CRUD: ACTIONS[] = [
    "view:region",
    "create:region",
    "edit:region",
    "delete:region",
];

export const SPEC_CRUD: ACTIONS[] = [
    "view:spec",
    "create:spec",
    "edit:spec",
    "delete:spec",
];
export const FILES_CRUD: ACTIONS[] = [
    "view:files",
    "create:files",
    "edit:files",
    "delete:files",
];

export const EMPLOYEE_FILES_CRUD: ACTIONS[] = [
    "view:employee-files",
    "create:employee-files",
    "edit:employee-files",
    "delete:employee-files",
];

export const USER_CRUD: ACTIONS[] = [
    "view:user",
    "create:user",
    "edit:user",
    "delete:user",
];

export const PERMISSIONS: PERMISSIONS_TYPE = {
    superadmin: [
        ...AUTHORITY_CRUD,
        ...BUILDING_CRUD,
        ...CITY_CRUD,
        ...DISTRICT_CRUD,
        ...EMPLOYEE_CRUD,
        ...FACILITY_CRUD,
        ...OWNERSHIP_CRUD,
        ...PERFORMANCE_CRUD,
        ...REGION_CRUD,
        ...SPEC_CRUD,
        ...USER_CRUD,
        ...FILES_CRUD,
        "delete:employee-files",
        "edit:trash"
    ],
    admin: [
        ...AUTHORITY_CRUD,
        ...BUILDING_CRUD,
        ...CITY_CRUD,
        ...DISTRICT_CRUD,
        ...EMPLOYEE_CRUD,
        ...FACILITY_CRUD,
        ...OWNERSHIP_CRUD,
        ...PERFORMANCE_CRUD,
        ...REGION_CRUD,
        ...SPEC_CRUD,
        ...USER_CRUD,
        ...FILES_CRUD
    ],

    moderator: [
        "create:authority",
        "edit:authority",
        "view:authority",
        "create:building",
        "edit:building",
        "view:building",
        "create:city",
        "edit:city",
        "view:city",
        "create:district",
        "edit:district",
        "view:district",

        "create:employee",
        "edit:employee",
        "view:employee",

        
        "create:facility",
        "edit:facility",
        "view:facility",

        
        "create:ownership",
        "edit:ownership",
        "view:ownership",

        
        "create:performance",
        "edit:performance",
        "view:performance",

        
        "create:region",
        "edit:region",
        "view:region",

        
        "create:spec",
        "edit:spec",
        "view:spec",

        "create:files",
        "edit:files",
        "view:files",

        "create:employee-files",
        "edit:employee-files",
        "view:employee-files",
    ],
    viewer: []


} as const;

export const hasPermission = (
    role: UserRoles | undefined,
    action: ACTIONS,
) => {
    if (!role) return;
    return (PERMISSIONS[role] as readonly ACTIONS[]).includes(action);
};
