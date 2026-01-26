import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import type { Employee } from "./employee";
import { EmployeeActionCell } from "@/features/employee/ui/employee-action-cell";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";

export const employeeColumn: ColumnDef<Employee>[] = [
    {
        accessorKey: "",
        id: "index",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("number")}</p>;
        },
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            return (
                <div className="flex items-center gap-3">
                    <p className="text-start">{row.index + 1 + pageIndex * pageSize}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "avatarUrl",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("avatar")}</p>;
        },
        cell: ({ row }) => {
            const avatarUrl = row.original.avatarUrl;
            const fullName = `${row.original.firstName} ${row.original.lastName}`;


            const imageUrl = avatarUrl ? storageUrlCreate("user", avatarUrl, "sm") : "";

            return (
                <PhotoProvider
                    overlayRender={() => (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2
                            bg-black/60 text-white px-4 py-1 rounded-md text-sm">
                            {fullName}
                        </div>
                    )}
                >
                    <PhotoView src={imageUrl}>
                        <Avatar className="rounded-sm h-20 w-full aspect-3/4 cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage
                                className="object-cover "
                                src={imageUrl}
                                alt={fullName}
                            />
                            <AvatarFallback className="rounded-sm">
                                {row.original.firstName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </PhotoView>
                </PhotoProvider>
            );
        },
    },
    {
        accessorKey: "firstName",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("name-surname")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p>{row.original.firstName}</p>
                    <p>{row.original.lastName}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "phone",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("phone")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p>{row.original.phone}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "position",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("position")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p>{row.original.position}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "order",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("order")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p>{row.original.order}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("created-at")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p>
                        {
                            formatToDDMMYYYY(row.original.createdAt)
                        }
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("updated-at")}</p>;
        },
        cell: ({ row }) => {
            const {t} = useTranslation()
            return (
                <div>
                    <p>
                        {row.original.updatedAt
                            ? formatToDDMMYYYY(row.original.updatedAt)
                            : t("not-updated-yet")}
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "id",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("action")}</p>;
        },
        cell: ({ row }) => {
            return <EmployeeActionCell path={row.original.folder?.path} id={row.original.id} currentOrder={row.original.order} location_id={row.original.location.id} />;
        },
    },
];