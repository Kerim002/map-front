import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};
export const TypeFormField = <T extends FieldValues>({
  form,
  name,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>Type name</FormLabel>
          <FormControl>
            <Input {...field} placeholder={`Type name`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
