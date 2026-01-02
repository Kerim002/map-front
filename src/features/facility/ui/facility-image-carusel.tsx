import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { facilityApi } from "@/entities/facility/api/facility.api";
import { Button } from "@/shared/ui/button";
import { Trash, ImageIcon, Loader2 } from "lucide-react";
import { useDeleteFacilityImage } from "../hook/use-delete-facility-image";

export const FacilityImageCarusel = () => {
  const { facilityId } = useParams();
  const { data, isLoading } = useQuery(facilityApi.facilityImages(facilityId as string));

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { mutate, isPending } = useDeleteFacilityImage();

  useEffect(() => {
    if (!api || !data) return;
    setCount(data.length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, data]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the dialog
    const activeImage = data?.[current - 1];
    if (activeImage && facilityId) {
      if (window.confirm("Are you sure you want to delete this image?")) {
        mutate({ facilityId, imageId: activeImage.id });
      }
    }
  };

  const getImageUrl = (id: string) =>
    `http://216.250.12.42:9000/location-image/${id}/md.webp`;

  // 1. Handle Loading State
  if (isLoading) {
    return (
      <div className="w-full aspect-video rounded-xl border bg-muted flex items-center justify-center animate-pulse">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 2. Handle Empty State (No images)
  if (!data || data.length === 0) {
    return (
      <div className="w-full aspect-video rounded-xl border-2 border-dashed bg-muted/50 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <ImageIcon size={40} strokeWidth={1.5} />
        <p className="text-sm font-medium">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full relative group">
      <Dialog>
        <Carousel setApi={setApi} className="w-full overflow-hidden rounded-xl border bg-black/5">
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={item.id}>
                <DialogTrigger asChild>
                  <div className="cursor-zoom-in overflow-hidden aspect-video relative bg-muted">
                    <img
                      src={getImageUrl(item.id)}
                      alt={`Facility ${index}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Handle broken image URLs
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
                      }}
                    />
                  </div>
                </DialogTrigger>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          {count > 1 && (
            <div className="absolute inset-0 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-auto">
                <CarouselPrevious className="static translate-y-0 h-9 w-9 bg-white/90 dark:bg-black/50" />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto">
                <CarouselNext className="static translate-y-0 h-9 w-9 bg-white/90 dark:bg-black/50" />
              </div>
            </div>
          )}
        </Carousel>

        <DialogContent className="sm:max-w-[95vw] w-full h-[90vh] p-0 border-none flex items-center justify-center bg-black/95">
          <Carousel className="w-full max-w-5xl" opts={{ startIndex: current - 1 }}>
            <CarouselContent>
              {data.map((item) => (
                <CarouselItem key={item.id} className="flex items-center w-full justify-center h-[85vh]">
                  <img
                    src={getImageUrl(item.id)}
                    className="max-h-full w-full h-full max-w-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {count > 1 && (
              <>
                <CarouselPrevious className="left-4 text-white bg-white/10 hover:bg-white/20 border-white/20" />
                <CarouselNext className="right-4 text-white bg-white/10 hover:bg-white/20 border-white/20" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>

      {/* Slide Counter and Delete Button */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="bg-black/60 text-white px-2 py-1 rounded-md text-[10px] backdrop-blur-sm h-8 flex items-center">
          {current} / {count}
        </div>
        
        <Button 
          size="icon" 
          variant="destructive" 
          className="h-8 w-8 shadow-lg"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash className="size-4" />}
        </Button>
      </div>
    </div>
  );
};