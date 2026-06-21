// features/facility/ui/marker-popup-content.tsx
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "@/entities/facility/api/facility.api";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useTranslation } from "react-i18next";
import { ImageIcon } from "lucide-react";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import type { Facility } from "@/entities/facility/model/facility";

import { useMapStore } from "@/entities/store/use-map-store";

type Props = {
  item: Facility;

};

// This component only mounts when the popup is open
// So all these hooks only run for the ONE visible popup
export const MarkerPopupContent = ({ item }: Props) => {
  const { t } = useTranslation();
  const { setQuery } = useQueryParam();
  const navigate = useNavigate();
  const { isEditMap } = useMapStore();

  const { data: images, isLoading: imagesLoading } = useQuery({
    ...facilityApi.facilityImages(item.id as string),
  });

  const firstImage = images?.[0];
  const imageUrl = firstImage
    ? storageUrlCreate("image", firstImage?.url ?? "", "md")
    : null;

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

      
    </>
  );
};