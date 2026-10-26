import { useRef, useState, type MouseEvent, type WheelEvent } from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.4;

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export const ZoomableImage = ({ src, alt, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);

  const clampPosition = (x: number, y: number, s: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!s || s <= 1 || !rect) return { x: 0, y: 0 };
    // ponytail: bounds approximated from container size, not real rendered image size; good enough to stop panning into empty space
    const maxX = (rect.width * (s - 1)) / 2;
    const maxY = (rect.height * (s - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  };

  const zoomTo = (newScale: number, originX?: number, originY?: number) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
    setPosition((pos) => {
      if (clamped === MIN_SCALE) return { x: 0, y: 0 };
      const ratio = clamped / scale;
      const ox = originX ?? 0;
      const oy = originY ?? 0;
      return clampPosition(ox - (ox - pos.x) * ratio, oy - (oy - pos.y) * ratio, clamped);
    });
    setScale(clamped);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    const originX = rect ? e.clientX - rect.left - rect.width / 2 : 0;
    const originY = rect ? e.clientY - rect.top - rect.height / 2 : 0;
    zoomTo(scale + (e.deltaY < 0 ? STEP : -STEP), originX, originY);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (scale <= 1) return;
    e.stopPropagation(); // keep embla carousel from swiping slides while panning a zoomed image
    dragRef.current = { x: position.x, y: position.y, startX: e.clientX, startY: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragRef.current) return;
    const { x, y, startX, startY } = dragRef.current;
    const next = clampPosition(x + (e.clientX - startX), y + (e.clientY - startY), scale);
    setPosition(next);
  };

  const stopDrag = () => {
    dragRef.current = null;
  };

  const handleDoubleClick = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const originX = rect ? e.clientX - rect.left - rect.width / 2 : 0;
    const originY = rect ? e.clientY - rect.top - rect.height / 2 : 0;
    zoomTo(scale > 1 ? 1 : 2.5, originX, originY);
  };

  const reset = () => zoomTo(1);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none", className)}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onDoubleClick={handleDoubleClick}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={cn(
          "max-h-full w-full h-full max-w-full object-contain",
          scale > 1 ? (dragRef.current ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: dragRef.current ? "none" : "transform 0.15s ease-out",
        }}
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-md p-1">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
          onClick={() => zoomTo(scale - STEP)}
          disabled={scale <= MIN_SCALE}
        >
          <ZoomOut size={16} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
          onClick={reset}
          disabled={scale === 1}
        >
          <Maximize size={16} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
          onClick={() => zoomTo(scale + STEP)}
          disabled={scale >= MAX_SCALE}
        >
          <ZoomIn size={16} />
        </Button>
      </div>
    </div>
  );
};
