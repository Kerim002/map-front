import { facilityApi } from '@/entities/facility/api/facility.api';
import type { Facility } from '@/entities/facility/model/facility';
import useQueryParam from '@/shared/hooks/use-query-param';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';
import { useMapStore } from '@/entities/store/use-map-store';
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
import { toast } from "sonner"; // Assuming you use sonner for notifications
import { useUpdateFacilityPatch } from '../hook/use-update-facility-patch';

type Props = {
  item: Facility;
};

export const MapMarker = ({ item }: Props) => {
  const { t } = useTranslation();
  const { setQuery } = useQueryParam();
  const navigate = useNavigate();
  const { mutate, isPending: isUpdating } = useUpdateFacilityPatch()

  // Refs & State
  const markerRef = useRef<L.Marker>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [draggedCoords, setDraggedCoords] = useState<L.LatLng | null>(null);

  // Store
  const { pendingPopupId, setPendingPopupId, isEditMap } = useMapStore();

  // 1. Fetch Images when popup opens
  const { data: images, isLoading: imagesLoading } = useQuery({
    ...facilityApi.facilityImages(item.id as string),
    enabled: isOpen,
  });

  const firstImage = images?.[0];
  const imageUrl = firstImage
    ? `http://216.250.12.42:9000/location-image/${firstImage.objectPath}/md.webp`
    : null;



  // 3. Combined Event Handlers
  const eventHandlers = useMemo(
    () => ({
      popupopen: () => setIsOpen(true),
      popupclose: () => setIsOpen(false),
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setDraggedCoords(marker.getLatLng());
        }
      },
    }),
    []
  );

  // 4. Handle Logic for FlyTo/Search focus
  useEffect(() => {
    if (pendingPopupId === item.id && markerRef.current) {
      markerRef.current.openPopup();
      setPendingPopupId(null);
    }
  }, [pendingPopupId, item.id, setPendingPopupId]);

  const handleConfirmMove = () => {
    if (draggedCoords) {
      mutate({ id: item.id, lat: draggedCoords.lat, lng: draggedCoords.lng }, {
        onSuccess: () => {
          toast.success(t("Location updated successfully"));
          setDraggedCoords(null);
        },
        onError: () => {
          toast.error(t("Failed to update location"));
          handleCancelMove(); // Snap back on error
        }
      })
    }
  };

  const handleCancelMove = () => {
    if (markerRef.current) {
      // Revert marker to original position from the 'item' prop
      markerRef.current.setLatLng([item.geom.lat, item.geom.lng]);
    }
    setDraggedCoords(null);
  };

  return (
    <>
      <Marker
        draggable={isEditMap}
        ref={markerRef}
        attribution={item.id}
        position={[item.geom.lat, item.geom.lng]}
        eventHandlers={eventHandlers}
      >
        <Popup>
          <div className="w-48 flex flex-col gap-2">
            {/* Image Section */}
            <div className="w-full aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center border border-border">
              {imagesLoading ? (
                <div className="animate-pulse w-full h-full bg-gray-300 dark:bg-gray-700" />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col dark:text-white items-center opacity-50">
                  <ImageIcon size={20} />
                  <span className="text-[10px]">{t("no-image")}</span>
                </div>
              )}
            </div>

            <p className="font-semibold text-sm !m-0 truncate dark:text-gray-200">
              {item.name}
            </p>

            <div className="space-y-2">
              <Button
                onClick={() => setQuery([{ key: "location-id", value: item.id }])}
                className="w-full h-8 text-xs"
                variant="secondary"
              >
                {t("edit-location")}
              </Button>
              <Button
                onClick={() => navigate(`/map/${item.id}`)}
                className="w-full h-8 text-xs"
              >
                {t("view-detail")}
              </Button>
            </div>
          </div>
        </Popup>
      </Marker>

      {/* Confirmation Dialog for Dragging */}
      <AlertDialog
        open={!!draggedCoords}
        onOpenChange={(open) => { if (!open && !isUpdating) handleCancelMove(); }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Confirm Move")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to move")} <strong>{item.name}</strong> {t("to this new location?")}

            </AlertDialogDescription>
            <div className="mt-2 p-2 bg-muted rounded text-[10px] font-mono">
              {draggedCoords?.lat.toFixed(6)}, {draggedCoords?.lng.toFixed(6)}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelMove}
              disabled={isUpdating}
            >
              {t("Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault(); // Prevent auto-closing so we can show loading
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