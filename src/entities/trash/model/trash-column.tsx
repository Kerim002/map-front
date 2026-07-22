import type { ColumnDef } from "@tanstack/react-table";

import { useTranslation } from "react-i18next";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import type { Trash } from "./trash";
import { Button } from "@/shared/ui/button";
import { useRestoreTrashItem } from "@/features/trash/hooks/use-restore-trash-item";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Eye } from "lucide-react";
import { getFileInfo } from "@/shared/lib/get-file-info";
import { API_URL } from "@/shared/config/url";
import { useState } from "react";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import { hasPermission } from "@/shared/lib/has-permission";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";

export const trashColumn: ColumnDef<Trash>[] = [
    {
        accessorKey: "number",
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
        accessorKey: "label",
        header: () => {
            const { t } = useTranslation();
            return <p>{t('label')}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p className="font-medium">{row.original.label}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "entity",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("type")}</p>;
        },
        cell: ({ row }) => {
            const { t } = useTranslation()
            return (
                <div>
                    <p>{t(row.original.entity)}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "deletedAt",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("deleted-at")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p>
                        {formatToDDMMYYYY(row.original.deletedAt)}
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "expiresAt",
        header: () => {
            const { t } = useTranslation();
            return <p>{t("expired-at")}</p>;
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p>
                        {formatToDDMMYYYY(row.original.expiresAt)}
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
            const { t } = useTranslation()
            const { mutate } = useRestoreTrashItem()
            const [previewImage, setPreviewImage] = useState<string | null>(null);
            const { data } = useProfileQuery()
            const handleItemClick = (item: Trash) => {


                const { isDoc, isImage } = getFileInfo(item.previewUrl ?? "");

                if (isDoc) {
                    const viewerUrl = `${API_URL}/v0/gotenberg/view/${item.id}`;
                    window.open(viewerUrl, "_blank", "noopener,noreferrer");
                } else if (isImage) {
                    setPreviewImage(storageUrlCreate("trash", item.previewUrl ?? ""));
                }
            };

            return <div className="flex gap-2 items-center">
                {
                    row.original.entity === "item" ?
                        <Button onClick={() => handleItemClick(row.original)} variant={"outline"}>
                            <Eye />
                        </Button>
                        : null}
                <Popover>
                    <PopoverTrigger asChild>
                        {
                            hasPermission(data?.role, "edit:trash") &&
                            <Button disabled={!row.original.restorable}>{t('restore')}</Button>
                        }
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                        <div className="flex gap-3 items-center">
                            <PopoverClose>

                                <Button className="w-28" variant={"destructive"}>{t("cuncel")}</Button>
                            </PopoverClose>
                            <PopoverClose>
                                <Button disabled={!row.original.restorable} onClick={() => mutate({ entity: row.original.entity, id: row.original.id })} className="w-28">{t("restore")}</Button>
                            </PopoverClose>
                        </div>
                    </PopoverContent>
                </Popover>
                {
                    previewImage && (
                        <div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-300"
                            onClick={() => setPreviewImage(null)}
                        >
                            <div className="relative max-w-[90vw] max-h-[90vh] group">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-w-full max-h-full rounded-[2rem] shadow-2xl ring-1 ring-white/10 p-2 bg-white/5"
                                />
                                <button className="absolute -top-4 -right-4 size-10 rounded-full bg-white text-black flex items-center justify-center font-black shadow-2xl hover:scale-110 transition-transform">
                                    ✕
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        },
    },
];
