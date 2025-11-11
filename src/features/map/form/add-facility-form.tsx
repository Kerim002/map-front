import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FacilityContract } from "@/entities/map/contract/facility.contract";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import type { FaciltyMutation } from "@/entities/map/contract";
import { Input } from "@/shared/ui/input";
import { RegionFormField } from "./region-form-field";
export const AddFacilityForm = () => {
  const form = useForm({
    resolver: zodResolver(FacilityContract),
  });

  const onSubmit: SubmitHandler<FaciltyMutation> = (body) => {
    console.log(body);
  };
  return (
    <Form {...form}>
      <form className="p-4 pt-10" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Facility name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={`Type name`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <RegionFormField form={form} label="Region" name="region" />
        </div>
      </form>
    </Form>
  );
};
