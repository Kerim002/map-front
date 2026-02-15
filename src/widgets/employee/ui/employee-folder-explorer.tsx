import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { folderApi } from "@/entities/folders/api/folder-api";
import type { Employee } from "@/entities/employee/model/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import {
    FolderOpen, File, LayoutGrid, List,
    ChevronLeft, Download, FileText,
    Image as ImageIcon, Archive, Upload, Eye, Trash
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious
} from "@/shared/ui/pagination";
import { FileUploadDialog } from "@/features/folders/ui/file-upload-dialog";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useDeleteFile } from "@/features/folders/hooks/use-delete-file";

const ONLYOFFICE_EXTS = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "txt"];
const IMAGE_EXTS = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

export const EmployeeFolderExplorer = ({ employee }: { employee: Employee }) => {
    const { t } = useTranslation();
    const initialPath = employee.folder?.path || "root";
    const [path, setPath] = useState(initialPath);
    const [view, setView] = useState<"grid" | "list">("grid");
    const [page, setPage] = useState(1);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const { mutate } = useDeleteFile();
    const limit = 12;

    const { data, isLoading } = useQuery(
        folderApi.folders({
            location_id: employee.location.id,
            path,
            page,
            limit,
        })
    );

    const getFileInfo = (fileName: string) => {
        const ext = fileName.split(".").pop()?.toLowerCase() || "";
        return {
            isDoc: ONLYOFFICE_EXTS.includes(ext),
            isImage: IMAGE_EXTS.includes(ext),
            ext
        };
    };

    const handleItemClick = (item: any) => {
        if (item.isFolder) {
            setPath(item.path);
            setPage(1);
            return;
        }

        const { isDoc, isImage } = getFileInfo(item.name);

        if (isDoc) {
            const viewerUrl = `http://216.250.12.42:1010/api/v0/onlyoffice/view/${item.id}?mode=view&lang=ru`;
            window.open(viewerUrl, "_blank", "noopener,noreferrer");
        } else if (isImage) {
            setPreviewImage(storageUrlCreate("fileDownload", item.url ?? ""));
        }
    };

    const handleDelete = (id: string) => {
        mutate(id);
        closeRef.current?.click();
    };

    const goBack = () => {
        if (path === initialPath || path === "root") return;
        const parts = path.split("/");
        parts.pop();
        const newPath = parts.join("/") || "root";
        setPath(newPath);
        setPage(1);
    };

    const totalPages = data?.pageInfo.totalPages ?? 0;

    if (!employee.folder && (!data || data.data.length === 0)) {
        return (
            <Card className="border-border/50 bg-card/60 backdrop-blur-md rounded-[3rem] border-0 shadow-2xl shadow-primary/5 p-20 text-center">
                <div className="size-24 bg-muted/30 flex items-center justify-center rounded-[2rem] mx-auto mb-6">
                    <Archive className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest text-muted-foreground/40 mb-2">
                    {t("no-folder-assigned")}
                </h3>
                <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest max-w-sm mx-auto">
                    {t("this-worker-does-not-have-an-associated-document-folder-yet")}
                </p>
            </Card>
        );
    }

    return (
        <Card className="border-border/50 bg-card/60 backdrop-blur-md rounded-[3rem] border-0 shadow-2xl shadow-primary/5 flex flex-col overflow-hidden">
            <CardHeader className="p-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-border/10">
                <div className="space-y-1 w-full sm:w-auto">
                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <FolderOpen className="h-6 w-6 text-primary" />
                        {t("documents-explorer")}
                    </CardTitle>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 whitespace-nowrap bg-muted/30 px-3 py-1 rounded-lg border border-border/30">
                            {path}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <div className="flex bg-muted/30 p-1.5 rounded-2xl border border-border/50 shadow-sm">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-9 w-9 rounded-xl transition-all duration-300", view === "grid" ? "bg-background text-primary shadow-sm" : "hover:bg-background/50")}
                            onClick={() => setView("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-9 w-9 rounded-xl transition-all duration-300", view === "list" ? "bg-background text-primary shadow-sm" : "hover:bg-background/50")}
                            onClick={() => setView("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>

                    {path !== initialPath && (
                        <Button variant="outline" size="sm" onClick={goBack} className="rounded-2xl h-11 gap-2 px-5 border-border/50 font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md">
                            <ChevronLeft className="h-4 w-4" />
                            {t("parent-folder")}
                        </Button>
                    )}

                    <FileUploadDialog
                        locationId={employee.location.id}
                        path={path}
                        trigger={
                            <Button className="rounded-2xl h-11 gap-2 px-5 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                                <Upload className="h-4 w-4" />
                                {t("upload-new-document")}
                            </Button>
                        }
                    />
                </div>
            </CardHeader>

            <CardContent className="p-8 flex flex-col">
                {isLoading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-44 bg-muted/20 animate-pulse rounded-[2rem] border border-border/20 blur-[2px]" />
                        ))}
                    </div>
                ) : data?.data.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="size-20 bg-muted/30 flex items-center justify-center rounded-3xl mx-auto">
                            <FileText className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                        <p className="text-sm font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
                            {t("this-folder-is-empty")}
                        </p>
                    </div>
                ) : (
                    <div className={cn(
                        "flex-1",
                        view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6" : "space-y-3"
                    )}>
                        {data?.data.map((item) => (
                            <ExplorerItem
                                key={item.id}
                                item={item}
                                view={view}
                                onClick={() => handleItemClick(item)}
                                onDelete={handleDelete}
                                getFileInfo={getFileInfo}
                                closeRef={closeRef}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center border-t border-border/10 pt-8 scale-110">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer rounded-xl"}
                                    />
                                </PaginationItem>

                                <div className="hidden sm:flex items-center gap-1">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                onClick={() => setPage(i + 1)}
                                                isActive={page === i + 1}
                                                className="cursor-pointer rounded-xl font-black h-10 w-10"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </div>

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer rounded-xl"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </CardContent>

            {/* Basic Dialog/Modal for Image Preview */}
            {previewImage && (
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
            )}
        </Card>
    );
};

const ExplorerItem = ({ item, view, onClick, onDelete, getFileInfo, closeRef }: any) => {
    const { isDoc, isImage, ext } = getFileInfo(item.name);
    const { t } = useTranslation();
    const showEye = !item.isFolder && (isDoc || isImage);

    if (view === "grid") {
        return (
            <div
                onClick={onClick}
                className={cn(
                    "group relative flex flex-col items-center justify-center p-6 aspect-square rounded-[2rem] bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-primary/30 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2",
                    !item.isFolder && (isDoc || isImage) ? "ring-2 ring-primary/5 bg-primary/5 border-primary/20" : ""
                )}
            >
                {/* Action Bar */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                onClick={(e) => e.stopPropagation()}
                                variant="destructive"
                                size="icon"
                                className="size-8 rounded-xl shadow-lg"
                            >
                                <Trash className="h-3.5 w-3.5" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            onClick={(e) => e.stopPropagation()}
                            className="w-64 p-5 rounded-[2rem] border-0 bg-card/95 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="space-y-4">
                                <p className="text-xs font-black uppercase tracking-widest text-foreground">{t("are-you-sure")}</p>
                                <div className="flex justify-end gap-2">
                                    <PopoverClose ref={closeRef} asChild>
                                        <Button size="sm" variant="outline" className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest">
                                            {t("cancel")}
                                        </Button>
                                    </PopoverClose>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id);
                                        }}
                                        size="sm"
                                        variant="destructive"
                                        className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest"
                                    >
                                        {t("delete")}
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {!item.isFolder && (
                        <>
                            {showEye && (
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="size-8 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-white transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClick();
                                    }}
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                </Button>
                            )}

                            <Button
                                size="icon"
                                variant="secondary"
                                className="size-8 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-white transition-all"
                                asChild
                                onClick={(e) => e.stopPropagation()}
                            >
                                <a
                                    href={storageUrlCreate("fileDownload", item.url ?? "")}
                                    download={item.name}
                                >
                                    <Download className="h-3.5 w-3.5" />
                                </a>
                            </Button>
                        </>
                    )}
                </div>

                {/* Icon Area */}
                <div className="size-20 rounded-[1.5rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {item.isFolder ? (
                        <FolderOpen className="size-10 text-primary drop-shadow-lg" />
                    ) : isImage ? (
                        <ImageIcon className="size-10 text-blue-500 drop-shadow-lg" />
                    ) : (
                        <File className="size-10 text-slate-400 drop-shadow-lg" />
                    )}
                </div>

                {/* Label */}
                <div className="w-full text-center">
                    <p className="text-[11px] font-black uppercase tracking-widest text-foreground line-clamp-1 mb-0.5">
                        {item.name}
                    </p>
                    {!item.isFolder && (
                        <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-tighter">
                            {ext}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-sm hover:translate-x-1"
        >
            <div className="flex items-center gap-5">
                <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {item.isFolder ? <FolderOpen className="size-5" /> : isImage ? <ImageIcon className="size-5" /> : <File className="size-5" />}
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{item.name}</span>
                    <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">{item.isFolder ? t("folder") : t("file")}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 transform scale-90 md:scale-100">
                {showEye && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className="size-9 rounded-xl hover:bg-primary hover:text-white transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        <Eye className="size-4" />
                    </Button>
                )}
                <a href={storageUrlCreate("fileDownload", item.url ?? "")} download onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="size-9 rounded-xl hover:bg-primary hover:text-white transition-all">
                        <Download className="size-4" />
                    </Button>
                </a>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={(e) => e.stopPropagation()}
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-xl hover:bg-destructive hover:text-white transition-all"
                        >
                            <Trash className="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        onClick={(e) => e.stopPropagation()}
                        className="w-64 p-5 rounded-[2rem] border-0 bg-card/95 backdrop-blur-xl shadow-2xl"
                    >
                        <div className="space-y-4">
                            <p className="text-xs font-black uppercase tracking-widest text-foreground">{t("are-you-sure")}</p>
                            <div className="flex justify-end gap-2">
                                <PopoverClose ref={closeRef} asChild>
                                    <Button size="sm" variant="outline" className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest">
                                        {t("cancel")}
                                    </Button>
                                </PopoverClose>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(item.id);
                                    }}
                                    size="sm"
                                    variant="destructive"
                                    className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest"
                                >
                                    {t("delete")}
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};
