import { facilityApi } from '@/entities/facility/api/facility.api';
import type { Facility } from '@/entities/facility/model/facility';
import useQueryParam from '@/shared/hooks/use-query-param';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

type Props = {
  item: Facility;
};

export const MapMarker = ({ item }: Props) => {
  const { t } = useTranslation();
  const { setQuery } = useQueryParam();
  const navigate = useNavigate();
  
  // Track if popup is open to trigger the fetch
  const [isOpen, setIsOpen] = useState(false);

  // Pass the second argument to enable query only when popup opens
  const { data, isLoading } = useQuery({
    ...facilityApi.facilityImages(item.id as string),
    enabled: isOpen, 
  });

  // Get the first image URL if data exists
  const firstImage = data?.[0];
  const imageUrl = firstImage 
    ? `https://216.250.12.42/api/v1/buckets/location-image/objects/download?preview=true&prefix=${firstImage.id}%2Fmd.webp&version_id=null`
    : null;

  return (
    <Marker 
      position={[item.geom.lat, item.geom.lng]}
      eventHandlers={{
        popupopen: () => setIsOpen(true),
        popupclose: () => setIsOpen(false),
      }}
    >
      <Popup>
        <div className="w-48 flex flex-col gap-2">
          {/* Image Placeholder / Thumbnail Area */}
          <div className="w-full aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center border border-border">
            {isLoading ? (
              <div className="animate-pulse w-full h-full bg-gray-300 dark:bg-gray-700" />
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col dark:text-white  items-center opacity-50">
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
  );
};