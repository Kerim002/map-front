import { type ReactNode, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "./button";

type Props = {
  children: ReactNode;
  onDelete: () => void;
  label?: string;
};

const DeletePopover = ({
  children,
  onDelete,
  label = "Delete this item?",
}: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleDelete = () => {
    onDelete();
    closeRef.current?.click();
  };
  const handleCuncel = () => {
    closeRef.current?.click();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-52 space-y-5">
        <h6 className="text-center">{label}</h6>
        <div className="flex w-full justify-end gap-3">
          <Button onClick={handleCuncel} size="sm">
            Cancel
          </Button>
          <Button onClick={handleDelete} size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      </PopoverContent>
      <PopoverClose ref={closeRef} />
    </Popover>
  );
};

export default DeletePopover;
