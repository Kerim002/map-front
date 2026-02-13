import { useCreateFile } from '@/features/folders/hooks/use-create-file'
import { useCreateFolder } from '@/features/folders/hooks/use-create-folder'
import { Button } from '@/shared/ui/button'
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/shared/ui/dialog'
import { ArrowLeft, Plus, Upload, Loader2, FileUp } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { cn } from '@/shared/lib/utils'

type Props = {
    path: string
    facilityId: string | undefined
}

export const EmployeeFilesNav = ({ path, facilityId }: Props) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [newFolderName, setNewFolderName] = useState("")
    const [isCreatingFolder, setIsCreatingFolder] = useState(false)
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const { mutate: createFile, isPending: isUploading } = useCreateFile()
    const { mutate: createFolder, isPending: isCreating } = useCreateFolder()

    const goBack = () => {
        if (path === "root") {
            navigate(pathname.split('/').slice(0, -2).join('/'))
        } else {
            navigate(-1)
        }
    }

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return
        createFolder(
            { locationId: facilityId!, path, name: newFolderName },
            {
                onSuccess: () => {
                    toast.success(t("folder-created-successfully"))
                    setNewFolderName("")
                    setIsCreatingFolder(false)
                },
                onError: () => toast.error(t("failed-to-create-folder"))
            }
        )
    }

    const onFilesSelected = (files: File[]) => {
        if (!files.length) return

        createFile(
            { location_id: facilityId!, path, files },
            {
                onSuccess: () => {
                    toast.success(t("files-uploaded-successfully"))
                    setIsUploadDialogOpen(false)
                },
                onError: () => toast.error(t("failed-to-upload-files"))
            }
        )
    }

    // Drag and Drop Handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => setIsDragging(false)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        onFilesSelected(files)
    }

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
                    {/* Upload Dialog */}
                    <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline" disabled={isUploading}>
                                {isUploading ? (
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                ) : (
                                    <Upload className="size-4 mr-2" />
                                )}
                                {t("upload-new-document")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{t("upload-new-document")}</DialogTitle>
                            </DialogHeader>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    "mt-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-colors",
                                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                                    isUploading && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <FileUp className="size-10 text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground text-center mb-4">
                                    {t("drag-drop-hint", "Drag and drop files here or click to browse")}
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    id="file-upload"
                                    disabled={isUploading}
                                    onChange={(e) => onFilesSelected(Array.from(e.target.files || []))}
                                />
                                <Button 
                                    variant="secondary" 
                                    asChild 
                                    disabled={isUploading}
                                >
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        {isUploading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                                        {t("select-files")}
                                    </label>
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

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
                        {t("cancel")} 
                    </Button>
                </div>
            )}
        </div>
    )
}