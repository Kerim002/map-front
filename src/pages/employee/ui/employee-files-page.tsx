import { useRef, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { folderApi } from "@/entities/folders/api/folder-api";
import { Button } from "@/shared/ui/button";
import { FolderOpen, File, Download, Eye, Image as ImageIcon, Trash, LayoutGrid, List } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import { EmployeeFilesNav } from "@/widgets/employee/employee-files-nav";
import { EmptyFolderState } from "@/features/folders/ui/empty-folder-state";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useTranslation } from "react-i18next";
import { useDeleteFile } from "@/features/folders/hooks/use-delete-file";
import { FacilityPageHeader } from "@/widgets/facility/ui/facility-page-header";
import { API_URL } from "@/shared/config/url";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import { hasPermission } from "@/shared/lib/has-permission";
import { getFileInfo } from "@/shared/lib/get-file-info";



export const EmployeeFilesPage = () => {
  const { facilityId, facilityChildId } = useParams();
  const [search, setSearch] = useSearchParams();
  const path = search.get("path") ?? "root";
  const { t } = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const { data: profileData } = useProfileQuery()
  const { mutate } = useDeleteFile()
  // State for image preview dialog
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data, isLoading } = useQuery(
    folderApi.folders({
      location_id: facilityChildId ? facilityChildId : facilityId!,
      page: 1,
      limit: 30,
      path,
    })
  );



  const handleItemClick = (item: any) => {
    if (item.isFolder) {
      setSearch({ path: item.path });
      return;
    }

    const { isDoc, isImage } = getFileInfo(item.name);

    if (isDoc) {
      const viewerUrl = `${API_URL}/v0/gotenberg/view/${item.id}`;
      window.open(viewerUrl, "_blank", "noopener,noreferrer");
    } else if (isImage) {
      // Logic to open your Dialog
      setPreviewImage(storageUrlCreate("fileDownload", item.url ?? ""));
    }
  };


  const handleDelete = (id: string) => {
    mutate(id)
    closeRef.current?.click();
  };

  return (

    <div className="min-h-full bg-background/50 p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <FacilityPageHeader />


      <div className="bg-card/60 backdrop-blur-md rounded-[3rem] border border-border/50 p-8 shadow-2xl shadow-primary/5 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <EmployeeFilesNav facilityId={facilityChildId ? facilityChildId : facilityId} path={path} />

            <div className="flex bg-muted/30 p-1.5 rounded-2xl border border-border/50 shadow-sm shrink-0">
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
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
              <div className="relative">
                <div className="size-16 rounded-full border-4 border-primary/20 animate-pulse" />
                <div className="absolute inset-0 size-16 rounded-full border-t-4 border-primary animate-spin" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">{t("loading")}...</p>
            </div>
          )}

          {!isLoading && data?.data.length === 0 && (
            <div className="py-10">
              <EmptyFolderState />
            </div>
          )}

          {!isLoading && data?.data && data.data.length > 0 && (
            <div className={cn(
              "flex-1",
              view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6" : "space-y-3"
            )}>
              {data.data.map((item) => {
                const { isDoc, isImage } = getFileInfo(item.name);
                const showEye = !item.isFolder && (isDoc || isImage);

                if (view === "list") {
                  return (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/40 transition-all duration-300 shadow-sm hover:translate-x-1"
                    >
                      <div
                        className="flex items-center gap-5 flex-1 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                          {item.isFolder ? <FolderOpen className="size-5" /> : isImage ? <ImageIcon className="size-5" /> : <File className="size-5" />}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{item.name}</span>
                          <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">{item.isFolder ? t("folder") : t("file")}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 transform scale-90 md:scale-100" onClick={(e) => e.stopPropagation()}>
                        {showEye && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-9 rounded-xl hover:bg-primary hover:text-white transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(item);
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
                        {hasPermission(profileData?.role, "delete:files") &&
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
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {t("cancel")}
                                    </Button>
                                  </PopoverClose>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(item.id);
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
                          </Popover>}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "group relative flex flex-col items-center justify-center p-6 aspect-square rounded-[2rem] bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2",
                      !item.isFolder && (isDoc || isImage) ? "ring-2 ring-primary/5 bg-primary/5 border-primary/20" : ""
                    )}
                  >
                    {/* Navigation Area */}
                    <div
                      onClick={() => handleItemClick(item)}
                      className="flex flex-col items-center justify-center w-full h-full cursor-pointer z-0"
                    >
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
                            {getFileInfo(item.name).ext}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 z-10" onClick={(e) => e.stopPropagation()}>
                      {hasPermission(profileData?.role, "delete:files") &&
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
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {t("cancel")}
                                  </Button>
                                </PopoverClose>

                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id);
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
                      }
                      {!item.isFolder && (
                        <>
                          {showEye && (
                            <Button
                              size="icon"
                              variant="secondary"
                              className="size-8 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-white transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(item);
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

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 size-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      </div>

      {/* Basic Dialog/Modal for Image Preview */}
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
    </div >
  )
};
