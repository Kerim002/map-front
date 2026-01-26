import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { folderApi } from "@/entities/folders/api/folder-api";
import { Button } from "@/shared/ui/button";
import {
  FolderOpen,
  ArrowLeft,
  File,
  Plus,
  Upload,
  Download,
} from "lucide-react";
import { useRef, useState } from "react";
import { useCreateFolder } from "@/features/folders/hooks/use-create-folder";
import { useCreateFile } from "@/features/folders/hooks/use-create-file";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";

// const getParentPath = (path: string) => {
//   if (path === "root") return "root";
//   const parts = path.split("/");
//   parts.pop();
//   return parts.length ? parts.join("/") : "root";
// };

export const EmployeeFilesPage = () => {
  const { facilityId } = useParams();
  const [search, setSearch] = useSearchParams();
  const path = search.get("path") ?? "root";
  const navigate = useNavigate()

  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const { t } = useTranslation()
  const { data, isLoading } = useQuery(
    folderApi.folders({
      location_id: facilityId!,
      page: 1,
      limit: 30,
      path,
    })
  );

  const createFolder = useCreateFolder();
  const uploadFile = useCreateFile();

  const goBack = () => {
    // setSearch({ path: getParentPath(path) });
    navigate(-1)
  };
  const fileInputRef = useRef<HTMLInputElement>(null);


  const getFileUrl = (path: string) =>
    `http://216.250.12.42:9000/location-files/${path}`;


  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    createFolder.mutate(
      { locationId: facilityId!, path, name: newFolderName },
      {
        onSuccess: () => {
          setNewFolderName("");
          setIsCreatingFolder(false);
        },
      }
    );
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          {path !== "root" && (
            <Button size="icon" variant="ghost" onClick={goBack}>
              <ArrowLeft className="size-4" />
            </Button>
          )}
          <span className="text-sm text-muted-foreground truncate">
            {path}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Upload */}
          {/* Upload */}
          <>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => {
                if (!e.target.files?.length) return;

                uploadFile.mutate({
                  location_id: facilityId!,
                  path, // IMPORTANT: include current folder path
                  files: Array.from(e.target.files),
                });

                // reset so same file can be uploaded again
                e.target.value = "";
              }}
            />

            <Button
              size="sm"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-4 mr-2" />
              {t("upload-new-document")}
            </Button>
          </>


          {/* New Folder */}
          <Button
            size="sm"
            onClick={() => setIsCreatingFolder(true)}
          >
            <Plus className="size-4 mr-2" />
            {t("new-folder")}
          </Button>
        </div>
      </div>

      {/* Create Folder Inline */}
      {isCreatingFolder && (
        <div className="flex gap-2 max-w-sm">
          <input
            autoFocus
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="flex-1 rounded-md border px-3 py-2 text-sm"
          />
          <Button
            size="sm"
            onClick={handleCreateFolder}
            disabled={createFolder.isPending}
          >
            {t("create")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsCreatingFolder(false)}
          >
            {t("cuncel")}
          </Button>
        </div>
      )}

      {/* Content */}
      {isLoading && <div className="text-sm">{("loading")}</div>}

      {!isLoading && data?.data.length === 0 && (
        <EmptyFolderState />
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.data.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              // Only navigate if it is a folder
              if (item.isFolder) {
                setSearch({ path: item.path });
              }
            }}
            className={cn(
              "relative border rounded-lg p-4 hover:bg-muted transition group",
              item.isFolder ? "cursor-pointer" : "cursor-default"
            )}
          >
            {/* Download Button - Only shows for files */}
            {!item.isFolder && (
              <div className="absolute top-2 right-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  asChild
                  onClick={(e) => e.stopPropagation()} // Prevents triggering the parent div's onClick
                >
                  <a
                    href={getFileUrl(item.url ?? "")}
                    download={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}

            <div className="flex justify-center text-4xl">
              {item.isFolder ? <FolderOpen /> : <File />}
            </div>

            <div className="mt-2 text-center text-sm truncate">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmptyFolderState = () => {
  const { t } = useTranslation()
  return <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
    <FolderOpen className="size-14 mb-4" />
    <p className="text-sm">{t("this-folder-is-empty")}</p>
  </div>
}
