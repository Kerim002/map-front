import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FacilityContract } from "@/entities/facility/contract/facility.contract";
import { Form } from "@/shared/ui/form";
import type { FaciltyMutation } from "@/entities/facility/contract";
import { RegionFormField } from "./region-form-field";
import { CompanyFormField } from "./company-form-field";
import { BuildingpFormField } from "./building-form-field";
import { TextAreaFormField } from "./textarea-form-field";
import { NameFormField } from "@/features/company/form/name-form-field";
import { useCreateFacility } from "../hook/use-create-facility";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useRef } from "react";
import { Button } from "@/shared/ui/button";
import { SheetClose } from "@/shared/ui/sheet";
export const CreateFacilityForm = () => {
  const form = useForm({
    resolver: zodResolver(FacilityContract),
  });
  const closeRef = useRef<HTMLButtonElement>(null);
  const { getQuery, deleteQuery } = useQueryParam();
  const { mutate } = useCreateFacility();

  const onSubmit: SubmitHandler<FaciltyMutation> = (body) => {
    // console.log(body);

    mutate(
      {
        ...body,
        geom: { lat: Number(getQuery("lat")), lng: Number(getQuery("lng")) },
      },
      {
        onSuccess: () => {
          closeRef.current?.click();
          deleteQuery(["lat", "lng"]);
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col h-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-1 space-y-6 p-6">
          <div className="space-y-2 border-b pb-4 mb-4">
            <h2 className="text-xl font-bold tracking-tight">Create Facility</h2>
            <p className="text-sm text-muted-foreground">Fill in the details below to add a new facility to the system.</p>
          </div>

          <div className="space-y-4">
            <NameFormField form={form} label="Location name" name="name" />
            <CompanyFormField form={form} label="Company" name="company" />
            <BuildingpFormField form={form} label="Building" name="building" />
            <RegionFormField form={form} label="Region" name="region" />
            <TextAreaFormField form={form} label="Address" name="address" />
          </div>
        </div>

        <div className="p-6 border-t bg-muted/30">
          <Button className="w-full h-11 font-bold shadow-sm" type="submit">
            Create Facility
          </Button>
        </div>
        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
