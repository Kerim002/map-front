import { folderApi } from "@/entities/folders/api/folder-api";
import { useCreateFolder } from "@/features/folders/hooks/use-create-folder";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";
import { useTranslation } from "react-i18next";


const getParentPath = (path: string) => {
    if (path === "root") return "root";
    const parts = path.split("/");
    parts.pop();
    return parts.length === 0 ? "root" : parts.join("/");
};

type Props = {
    locationId: string;
    value?: { id: string; name: string; path?: string };
    onSelect: (val: { id: string; name: string }) => void;
};

export function FolderPopoverPicker({
    locationId,
    value,
    onSelect,
}: Props) {
    const {t} = useTranslation()
    const [path, setPath] = useState("root");
    const [selectedId, setSelectedId] = useState<string | null>(value?.id ?? null);
    const [isCreating, setIsCreating] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const queryClient = useQueryClient();
    const createFolder = useCreateFolder();

    const { data, isLoading } = useQuery(
        folderApi.folders({
            location_id: locationId,
            limit: 20,
            page: 1,
            path,
        })
    );

    const handleCreateFolder = () => {
        createFolder.mutate(
            { locationId, path, name: newFolderName },
            {
                onSuccess: () => {
                    setNewFolderName("");
                    setIsCreating(false);
                    queryClient.invalidateQueries({ queryKey: ["folders"] });
                },
            }
        );
    };


    useEffect(() => {
        if (value) {
            setSelectedId(value.id);
        } else {
            setSelectedId(null);
        }
    }, [value]);


    useEffect(() => {
  if (value?.path) {
    setPath(value.path);
  }
}, [value?.path]);


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    {value ? `📁 ${value.name}` : t("select-folder")}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[360px] p-0">
                {/* Header */}
                {/* Header */}
                <div className="flex items-center gap-2 border-b px-3 py-2 text-sm font-medium">
                    {path !== "root" && (
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                setPath(getParentPath(path));
                                setSelectedId(null);
                            }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    )}

                    <span className="truncate">{t("path")}: {path}</span>
                </div>


                {/* List */}
                <div className="max-h-[260px] overflow-auto">
                    {isLoading && (
                        <div className="p-3 text-sm text-muted-foreground">
                            {t("loading")}
                        </div>
                    )}

                    {data?.data.map((item) => (
                        item.isFolder ? 
                        <div
                            key={item.id}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted",
                                selectedId === item.id && "bg-muted"
                            )}
                            onClick={() => {
                                setSelectedId(item.id);
                                onSelect({ id: item.id, name: item.name });
                            }}
                        >
                            <span>
                                {item.isFolder ? "📁" : "📄"}
                            </span>

                            <span className="flex-1 truncate">{item.name}</span>

                            {item.isFolder && (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPath(item.path);
                                    }}
                                >
                                    →
                                </Button>
                            )}
                        </div> : null
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t p-2">
                    {isCreating ? (
                        <div className="flex gap-2">
                            <input
                                autoFocus
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder={t("folder-name")}
                                className="flex-1 rounded-md border px-2 text-sm"
                            />
                            <Button
                                size="sm"
                                disabled={!newFolderName || createFolder.isPending}
                                onClick={handleCreateFolder}
                            >
                                {t("create")}
                            </Button>
                        </div>
                    ) : (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setIsCreating(true)}
                        >
                            ➕ {t("new-folder")}
                        </Button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
