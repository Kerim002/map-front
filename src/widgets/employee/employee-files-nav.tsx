import { useCreateFile } from '@/features/folders/hooks/use-create-file'
import { useCreateFolder } from '@/features/folders/hooks/use-create-folder'
import { Button } from '@/shared/ui/button'
import { ArrowLeft, Plus, Upload, Loader2 } from 'lucide-react' // Added Loader2
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner' // Assuming you use sonner or similar

type Props = {
    path: string
    facilityId: string | undefined
}

export const EmployeeFilesNav = ({ path, facilityId }: Props) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newFolderName, setNewFolderName] = useState("");
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);

    // Hooks
    const { mutate: createFile, isPending: isUploading } = useCreateFile();
    const { mutate: createFolder, isPending: isCreating } = useCreateFolder();

    const goBack = () => {
        if (path === "root") {
            navigate(pathname.split('/').slice(0, -2).join('/'))
        } else {
            navigate(-1)
        }
    };

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;

        createFolder(
            { locationId: facilityId!, path, name: newFolderName },
            {
                onSuccess: () => {
                    toast.success(t("folder-created-successfully"));
                    setNewFolderName("");
                    setIsCreatingFolder(false);
                },
                onError: () => {
                    toast.error(t("failed-to-create-folder"));
                }
            }
        );
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const files = Array.from(e.target.files);
        
        createFile(
            {
                location_id: facilityId!,
                path,
                files,
            },
            {
                onSuccess: () => {
                    toast.success(t("files-uploaded-successfully"));
                    if (fileInputRef.current) fileInputRef.current.value = "";
                },
                onError: () => {
                    toast.error(t("failed-to-upload-files"));
                }
            }
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={goBack}>
                        <ArrowLeft className="size-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {path}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        hidden
                        onChange={handleFileUpload}
                        disabled={isUploading}
                    />

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <Loader2 className="size-4 mr-2 animate-spin" />
                        ) : (
                            <Upload className="size-4 mr-2" />
                        )}
                        {isUploading ? t("uploading") : t("upload-new-document")}
                    </Button>

                    <Button
                        size="sm"
                        onClick={() => setIsCreatingFolder(true)}
                        disabled={isCreating}
                    >
                        <Plus className="size-4 mr-2" />
                        {t("new-folder")}
                    </Button>
                </div>
            </div>

            {isCreatingFolder && (
                <div className="flex gap-2 max-w-sm animate-in fade-in slide-in-from-top-1">
                    <input
                        autoFocus
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder={t("folder-name")}
                        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={isCreating}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                    />
                    <Button
                        size="sm"
                        onClick={handleCreateFolder}
                        disabled={isCreating || !newFolderName.trim()}
                    >
                        {isCreating && <Loader2 className="size-4 mr-2 animate-spin" />}
                        {t("create")}
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsCreatingFolder(false)}
                        disabled={isCreating}
                    >
                        {t("cuncel")} 
                    </Button>
                </div>
            )}
        </div>
    )
}