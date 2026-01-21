import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import type { FieldValues, UseFormReturn, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};
export const TextAreaFormField = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea className="bg-white" {...field}  />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
