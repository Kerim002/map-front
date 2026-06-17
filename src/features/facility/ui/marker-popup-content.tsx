// features/facility/ui/marker-popup-content.tsx
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "@/entities/facility/api/facility.api";
import { useUpdateFacilityPatch } from "../hook/use-update-facility-patch";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useTranslation } from "react-i18next";
import { ImageIcon, Loader2 } from "lucide-react";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import { toast } from "sonner";
import type { Facility } from "@/entities/facility/model/facility";
import type L from "leaflet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { useMapStore } from "@/entities/store/use-map-store";

type Props = {
  item: Facility;
  markerRef: React.RefObject<L.Marker | null>;
  draggedCoords: L.LatLng | null;
  onClearDrag: () => void;
};

// This component only mounts when the popup is open
// So all these hooks only run for the ONE visible popup
export const MarkerPopupContent = ({ item, markerRef, draggedCoords, onClearDrag }: Props) => {
  const { t } = useTranslation();
  const { setQuery } = useQueryParam();
  const navigate = useNavigate();
  const { isEditMap } = useMapStore();
  const { mutate, isPending: isUpdating } = useUpdateFacilityPatch();

  

  // ✅ This query now only registers ONE subscriber, not 2000
  const { data: images, isLoading: imagesLoading } = useQuery({
    ...facilityApi.facilityImages(item.id as string),
    // No need for `enabled` anymore — component only mounts when open
  });

  // Handle drag — we need to wire this up from the parent marker
  // Pass a callback via prop or use a shared ref
  // (see note below on drag handling)

  const firstImage = images?.[0];
  const imageUrl = firstImage
    ? storageUrlCreate("image", firstImage?.url ?? "", "md")
    : null;

  const handleConfirmMove = () => {
    if (draggedCoords) {
      mutate(
        { id: item.id, lat: draggedCoords.lat, lng: draggedCoords.lng },
        {
          onSuccess: () => {
            toast.success(t("Location updated successfully"));
            onClearDrag();
          },
          onError: () => {
            toast.error(t("Failed to update location"));
            handleCancelMove();
          },
        }
      );
    }
  };

  const handleCancelMove = () => {
    if (markerRef.current) {
      markerRef.current.setLatLng([item.geom.lat, item.geom.lng]);
    }
    onClearDrag()
  };


  return (
    <>
      <div className="w-48 flex flex-col gap-2">
        {/* Image */}
        <div className="w-full aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center border border-border">
          {imagesLoading ? (
            <div className="animate-pulse w-full h-full bg-gray-300 dark:bg-gray-700" />
          ) : imageUrl ? (
            <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col dark:text-white items-center opacity-50">
              <ImageIcon size={20} />
              <span className="text-[10px]">{t("no-image")}</span>
            </div>
          )}
        </div>

        <p className="font-semibold text-sm m-0! truncate dark:text-gray-200">
          {item.name}
        </p>

        <div className="space-y-2">
          <Button
            onClick={() => setQuery([{ key: "location-id", value: item.id }])}
            className="w-full h-8 text-xs"
            variant="secondary"
            disabled={!isEditMap}
          >
            {t("edit-location")}
          </Button>
          <Button
            onClick={() => {
              if (item.parent) {
                navigate(`/map/${item.parent.id}/childs/1/${item.id}`);
              } else {
                navigate(`/map/${item.id}`);
              }
            }}
            className="w-full h-8 text-xs"
          >
            {t("view-detail")}
          </Button>
        </div>
      </div>

      {/* Alert Dialog — only exists for the open popup */}
      <AlertDialog
        open={!!draggedCoords}
        onOpenChange={(open) => {
          if (!open && !isUpdating) handleCancelMove();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Confirm Move")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to move")}{" "}
              <strong>{item.name}</strong>{" "}
              {t("to this new location?")}
            </AlertDialogDescription>
            <div className="mt-2 p-2 bg-muted rounded text-[10px] font-mono">
              {draggedCoords?.lat.toFixed(6)}, {draggedCoords?.lng.toFixed(6)}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelMove} disabled={isUpdating}>
              {t("Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmMove();
              }}
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("Update Location")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};