import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Switch } from "@/shared/ui/switch";
import type { FieldValues, Path, Control } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

export const SwitchFormField = <T extends FieldValues>({
  control,
  name,
  label,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel>{label || name}</FormLabel>
          </div>

          <FormControl>
            <Switch
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
