import { useState, useEffect, useRef } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { ImagePlus, X } from "lucide-react"; // Optional: for icons
import type { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { cn } from "@/shared/lib/utils"; // Assuming you use shadcn's utility
import { useTranslation } from "react-i18next";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};
  
const isFile = (value: any): value is File => value instanceof File;

export const AvatarFormField = <T extends FieldValues>({ form, name, label }: Props<T>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileValue = form.watch(name);
  const {t} = useTranslation()

  useEffect(() => {
    if (isFile(fileValue)) {
      const objectUrl = URL.createObjectURL(fileValue);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [fileValue]);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file upload box
    form.setValue(name, undefined as any);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem className="flex flex-col items-center justify-center">
          <FormLabel className="w-full text-left mb-2">{label}</FormLabel>
          
          <FormControl>
            <div className="relative group">
              {/* The Big Press Box */}
              <div
                onClick={handleBoxClick}
                className={cn(
                  "relative w-48 h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-primary hover:bg-muted/50",
                  preview ? "border-solid border-muted" : "border-muted-foreground/25"
                )}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">{t("change-photo")}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus className="w-8 h-8 opacity-50" />
                    <span className="text-xs font-medium">{t("click-to-upload")}</span>
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <Input
                {...rest}
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange(file);
                }}
              />

              {/* Remove Button (Visible only if image exists) */}
              {preview && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </FormControl>
          
          <FormMessage />
          <p className="text-[10px] text-muted-foreground mt-2">
              {t("accepted-image-formats")}
          </p>
        </FormItem>
      )}
    />
  );
};