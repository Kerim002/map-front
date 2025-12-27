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
export const UpdateFacilityForm = () => {
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
      <form className="p-4 pt-10" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <NameFormField form={form} label="Location name" name="name" />
          <CompanyFormField form={form} label="Company" name="company" />
          <BuildingpFormField form={form} label="Building" name="building" />
          <RegionFormField form={form} label="Region" name="region" />
          <TextAreaFormField form={form} label="Adress" name="address" />
          <Button>Create</Button>
          <SheetClose ref={closeRef} />
        </div>
      </form>
    </Form>
  );
};
