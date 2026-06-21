import type { ColumnDef } from "@tanstack/react-table";

import { useTranslation } from "react-i18next";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import type { User } from "../model/user";
import { Badge } from "@/shared/ui/badge";
import { UserActionCell } from "@/features/user/ui/user-action-cell";

export const userColumn: ColumnDef<User>[] = [
    {
        accessorKey: "",
        id: "number",
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
        accessorKey: "username", // You can keep this or use an ID
        header: () => {
            const { t } = useTranslation();
            return <p>{t("username")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p className="font-medium">{row.original.username}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("name-surname")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p className="font-medium">{row.original.surname}</p>
                    <p className="font-medium">{row.original.name}</p>
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
                    <p className="font-medium">{row.original.phone}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("role")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <Badge>
                        {row.original.role}
                    </Badge>
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
                    <p>{formatToDDMMYYYY(row.original.createdAt)}</p>
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
            const { t } = useTranslation()
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
            return <UserActionCell id={row.original.id} userRole={row.original.role} />;
        },
    },
];
