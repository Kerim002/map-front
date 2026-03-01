import Cropper from "react-easy-crop";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Slider } from "@/shared/ui/slider";
import { X, Edit } from "lucide-react";
import { getCroppedImage } from "@/shared/lib/get-cropped-img"; 
import { useTranslation } from "react-i18next";

export const AvatarFormField = ({ form, label,oldImage }: { form: any; label: string,oldImage:string }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
const [preview, setPreview] = useState<string | null>(oldImage || null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState<any>(null);
  const {t} = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (file: File) => {
    const url = URL.createObjectURL(file);
    form.setValue("avatar_original", file);
    setImageSrc(url);
  };

  const onCropComplete = (_: any, pixels: any) => {
    setCroppedPixels(pixels);
  };

  useEffect(() => {
    if (oldImage && !preview) {
      setPreview(oldImage);
    }
  }, [oldImage]);

  const confirmCrop = async () => {
    if (!imageSrc || !croppedPixels) return;

    const cropped = await getCroppedImage(imageSrc, croppedPixels);
    const croppedUrl = URL.createObjectURL(cropped);

    form.setValue("avatar_cropped", cropped);
    setPreview(croppedUrl);
    setImageSrc(null);
  };

  return (
    <>
      <label className="text-sm font-medium mb-2 block">{label}</label>

      {/* Preview Box - Updated to 3:4 Portrait Ratio */}
      <div className="relative w-36 aspect-[3/4]">
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-full rounded-md border border-dashed overflow-hidden flex items-center justify-center cursor-pointer group bg-muted"
        >
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-muted-foreground text-center px-2">
              {t("upload-3x4-image")}
            </span>
          )}

          {preview && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Edit className="text-white w-5 h-5" />
            </div>
          )}
        </div>

        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              form.setValue("avatar_cropped", undefined);
            }}
            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 z-10"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelectFile(file);
        }}
      />

      {/* Crop Modal */}
      <Dialog open={!!imageSrc} onOpenChange={() => setImageSrc(null)}>
        <DialogContent
        onPointerDownOutside={e => e.preventDefault()}
        className="sm:max-w-[450px]">
          {/* Increased container height slightly to better fit portrait crop UI */}
          <div className="relative h-[400px] w-full bg-black rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc!}
              crop={crop}
              zoom={zoom}
              aspect={3 / 4} // Portrait ratio
              cropShape="rect"
              showGrid={true}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">{t("zoom")}</label>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(v) => setZoom(v[0])}
            />
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setImageSrc(null)}>
              Cancel
            </Button>
            <Button onClick={confirmCrop}>Confirm Crop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};