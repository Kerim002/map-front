import { useRef, useState } from "react"; // Added for Dialog state
import { useSearchParams, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { folderApi } from "@/entities/folders/api/folder-api";
import { Button } from "@/shared/ui/button";
import { FolderOpen, File, Download, Eye, Image as ImageIcon, Trash } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import { EmployeeFilesNav } from "@/widgets/employee/employee-files-nav";
import { EmptyFolderState } from "@/features/folders/ui/empty-folder-state";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useTranslation } from "react-i18next";
import { useDeleteFile } from "@/features/folders/hooks/use-delete-file";

// Constants for format checking
const ONLYOFFICE_EXTS = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "txt"];
const IMAGE_EXTS = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

export const EmployeeFilesPage = () => {
  const { facilityId, facilityChildId } = useParams();
  const [search, setSearch] = useSearchParams();
  const path = search.get("path") ?? "root";
  const { t } = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null);

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
      setSearch({ path: item.path });
      return;
    }

    const { isDoc, isImage } = getFileInfo(item.name);

    if (isDoc) {
      const viewerUrl = `http://216.250.12.42:1010/api/v0/onlyoffice/view/${item.id}?mode=view&lang=ru`;
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
    <div className="space-y-4 p-4">
      <EmployeeFilesNav facilityId={facilityChildId ? facilityChildId : facilityId} path={path} />

      {isLoading && <div className="text-sm">{"loading"}</div>}
      {!isLoading && data?.data.length === 0 && <EmptyFolderState />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.data.map((item) => {
          const { isDoc, isImage } = getFileInfo(item.name);
          const showEye = !item.isFolder && (isDoc || isImage);

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative border rounded-lg p-4 hover:bg-muted transition group cursor-pointer",
                !item.isFolder && (isDoc || isImage) ? "border-blue-200" : ""
              )}
            >

              <div className="absolute top-2 right-2 flex gap-1">
                {/* Show Eye only if it's a Doc (OnlyOffice) or Image */}
                <Popover>
                  <PopoverTrigger asChild>
                    {/* Stop propagation here so the card doesn't click */}
                    <Button onClick={(e) => e.stopPropagation()} variant="destructive" size="sm">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    onClick={(e) => e.stopPropagation()}
                    className="w-52 space-y-5"
                  >
                    <div className="flex w-full justify-end gap-3">
                      {/* PopoverClose automatically closes the popover, no ref needed */}
                      <PopoverClose ref={closeRef} asChild>
                        <Button size="sm" variant="outline">
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
                      >
                        {t("delete")}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                {!item.isFolder &&
                  <>
                    {showEye && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={storageUrlCreate("fileDownload", item.url ?? "")}
                        download={item.name}
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </>
                }

              </div>


              <div className="flex justify-center text-4xl">
                {item.isFolder ? <FolderOpen /> : isImage ? <ImageIcon className="text-blue-500" /> : <File />}
              </div>

              <div className="mt-2 text-center text-sm truncate font-medium">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Basic Dialog/Modal for Image Preview */}
      {
        previewImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full rounded shadow-xl"
            />
            <button className="absolute top-4 right-4 text-white text-xl">✕</button>
          </div>
        )
      }
    </div >
  );
};