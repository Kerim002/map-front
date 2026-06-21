import type { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";



type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    label?: string;
    options: string[]
};


export const SelectFormField = <T extends FieldValues>({ form, name, label, options }: Props<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder={label} />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    options.map(item => (

                                        <SelectItem key={item} value={item}>{item}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
