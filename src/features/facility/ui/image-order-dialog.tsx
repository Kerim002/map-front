import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, GripVertical, Trash } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { useUpdateFacilityImageOrder } from "../hook/use-update-facility-image-order";
import type { FacilityImage } from "@/entities/facility/model/facility-image";
import { useTranslation } from "react-i18next";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import DeletePopover from "@/shared/ui/delete-popover";
import { useDeleteFacilityImage } from "../hook/use-delete-facility-image";

// --- Sortable Row Component ---
const SortableRow = ({ image, facilityId }: { image: FacilityImage, facilityId: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });
  const { mutate, isPending } = useDeleteFacilityImage()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className="bg-background">
      <TableCell className="w-[50px]">
        <Button variant="ghost" size="icon" {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="size-4 text-muted-foreground" />
        </Button>
      </TableCell>
      <TableCell className="w-[100px]">
        <img
          src={storageUrlCreate("image", image.url, "md")}
          className="h-12 w-16 object-cover rounded border"
          alt="Preview"
        />
      </TableCell>
      <TableCell className="font-medium text-xs truncate max-w-[200px]">
        {image.id}
      </TableCell>
      <TableCell className="text-right font-mono text-xs">
        {image.order + 1}
      </TableCell>
      <TableCell>
        <DeletePopover onDelete={() => mutate({ imageId: image.id, facilityId })}>
          <Button disabled={isPending} variant="destructive" size="sm">
            <Trash className="size-4" />
          </Button>
        </DeletePopover>
      </TableCell>
    </TableRow>
  );
};

// --- Main Dialog Component ---
export const ImageOrderDialog = ({ images, facilityId }: { images: FacilityImage[], facilityId: string }) => {
  const [items, setItems] = useState(images);
  const { mutate } = useUpdateFacilityImageOrder();
  const { t } = useTranslation()

  // Keep local state in sync with server data when it changes
  useEffect(() => {
    setItems(images);
  }, [images]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newArray = arrayMove(items, oldIndex, newIndex);
      setItems(newArray);
      mutate({
        facilityId,
        imageId: active.id as string,
        order: newIndex
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="dark:text-white text-black" size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent 
      onPointerDownOutside={e => e.preventDefault()}
      className="sm:max-w-[600px] h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t("reorder-images")}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>{t("preview")}</TableHead>
                  <TableHead>{t("id")}</TableHead>
                  <TableHead className="text-right">{t("order")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                  {items.map((image) => (
                    <SortableRow facilityId={facilityId} key={image.id} image={image} />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </div>
      </DialogContent>
    </Dialog>
  );
};