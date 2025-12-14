import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/ui/carousel";
export const FacilityImageCarusel = () => {
  const images = [
    "IMG_0586.JPG",
    "IMG_0587.JPG",
    "IMG_4155.JPG",
    "IMG_6454.JPG",
    "IMG_6455.JPG",
    "IMG_6491.JPG",
  ];

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="aspect-video w-full relative">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <img
                src={`/test/images/facility/${item}`}
                alt="Facility"
                className="object-cover w-full aspect-video h-full hover:scale-105 transition-transform duration-500"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  );
};
