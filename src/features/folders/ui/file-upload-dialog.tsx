import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateFile } from "@/features/folders/hooks/use-create-file";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/ui/dialog";
import { Upload, Loader2, FileUp } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

interface FileUploadDialogProps {
    locationId: string;
    path: string;
    trigger?: React.ReactNode;
    onSuccess?: () => void;
}

export const FileUploadDialog = ({ locationId, path, trigger, onSuccess }: FileUploadDialogProps) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { mutate: createFile, isPending: isUploading } = useCreateFile();

    const onFilesSelected = (files: File[]) => {
        if (!files.length) return;

        createFile(
            { location_id: locationId, path, files },
            {
                onSuccess: () => {
                    toast.success(t("files-uploaded-successfully"));
                    setOpen(false);
                    onSuccess?.();
                },
                onError: () => toast.error(t("failed-to-upload-files"))
            }
        );
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        onFilesSelected(files);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button size="sm" variant="outline" disabled={isUploading}>
                        {isUploading ? (
                            <Loader2 className="size-4 mr-2 animate-spin" />
                        ) : (
                            <Upload className="size-4 mr-2" />
                        )}
                        {t("upload-new-document")}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-[2rem] border-0 bg-card/90 backdrop-blur-xl shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black uppercase tracking-tight">{t("upload-new-document")}</DialogTitle>
                </DialogHeader>
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "mt-4 flex flex-col items-center justify-center border-2 border-dashed rounded-[2rem] p-10 transition-all duration-300",
                        isDragging ? "border-primary bg-primary/5 scale-95" : "border-muted-foreground/20",
                        isUploading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="p-6 rounded-[1.5rem] bg-primary/5 text-primary mb-4">
                        <FileUp className="size-10" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground text-center mb-6 uppercase tracking-widest leading-relaxed max-w-[200px]">
                        {t("drag-drop-hint")}
                    </p>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        id="file-upload-feature"
                        disabled={isUploading}
                        onChange={(e) => onFilesSelected(Array.from(e.target.files || []))}
                    />
                    <Button
                        variant="secondary"
                        asChild
                        disabled={isUploading}
                        className="rounded-xl font-black uppercase tracking-widest text-[10px] h-10 px-6 shadow-md"
                    >
                        <label htmlFor="file-upload-feature" className="cursor-pointer">
                            {isUploading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                            {t("select-files")}
                        </label>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
