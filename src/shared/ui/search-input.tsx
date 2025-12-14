import { Search } from "lucide-react";
import { Input } from "./input";
import { cn } from "../lib/utils";

export const SearchInput = ({
  className,
  type,
  containerClassName,
  ...props
}: React.ComponentProps<"input"> & { containerClassName?: string }) => {
  return (
    <div className={cn("relative flex items-center ", containerClassName)}>
      <Search className="absolute left-2 size-4" />
      <Input className="pl-8" {...props} />
    </div>
  );
};
