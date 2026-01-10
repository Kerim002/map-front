import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FacilityContract } from "@/entities/facility/contract/facility.contract";
import { Form } from "@/shared/ui/form";
import type { FaciltyMutation } from "@/entities/facility/contract";
import { RegionFormField } from "./region-form-field";
import { BuildingpFormField } from "./building-form-field";
import { TextAreaFormField } from "./textarea-form-field";
import { NameFormField } from "@/features/company/form/name-form-field";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useRef } from "react";
import { Button } from "@/shared/ui/button";
import { SheetClose } from "@/shared/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "@/entities/facility/api/facility.api";
import { useUpdateFacilityPatch } from "../hook/use-update-facility-patch";
import { TimeFormField } from "./time-form-field";
import { NumberFormField } from "./number-form-field";
import { useTranslation } from "react-i18next";
import { OwnershipFormField } from "./ownership-form-field";
import { AuthorityFormField } from "./authority-form-field";
import { PerformanceFormField } from "@/features/company/form/performance-form-field";
export const UpdateFacilityForm = () => {
  const form = useForm({
    resolver: zodResolver(FacilityContract),
    // defaultValues: {
    //   name: "",
    //   address: "",
    //   region: undefined,
    //   company: undefined,
    //   building: undefined,
    // },
  });
  const { t } = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null);
  const { getQuery,deleteQuery } = useQueryParam();
  const { mutate } = useUpdateFacilityPatch()
  const { data } = useQuery(facilityApi.detail(getQuery("location-id")))

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        address: data.address || "",
        region: data.region,
        building: data.building,
        area:data.area || "",
        cadaster:data.cadaster || "",
        fireInspectAt:data.fireInspectionAt || "",
        floor:data.floor,
        note:data.note || "",
        auhtority:data.authority,
        ownership:data.ownership,
        performance:data.performance,
        // auhtority:data
        parking:data.parking

      });
    }
  }, [data, form])

  console.log(form.formState.errors)


  const onSubmit: SubmitHandler<FaciltyMutation> = (body) => {
    console.log(body)

    mutate(
      {
        body,
        id: getQuery("location-id") ?? ""
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

          <div className="space-y-4 overflow-auto">
                      <NameFormField form={form} label={t("location-name")} name="name" />
                      <div className="grid grid-cols-2 gap-3">
          
                        <NameFormField form={form} label={t("cadester-code")} name="cadaster" />
                        <OwnershipFormField form={form} label={t("ownership")} name="ownership" />
                        {/* <CompanyFormField form={form} label={t("company")} name="company" /> */}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
          
                        <AuthorityFormField form={form} label={t("authority")} name="auhtority" />
                        <PerformanceFormField form={form} label={t("performance")} name="performance" />
                        {/* <CompanyFormField form={form} label={t("company")} name="company" /> */}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
          
                        <BuildingpFormField form={form} label={t("building")} name="building" />
                        <RegionFormField form={form} label={t("region")} name="region" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
          
                        <TimeFormField label={t("fire-incpect-at")} form={form} name="fireInspectAt" />
                        <NumberFormField label={t("total-area")} form={form} name="area" />
          
                      </div>
                      <div className="grid grid-cols-2 gap-3">
          
                        <NumberFormField label={t("total-floor")} form={form} name="floor" />
                        <NumberFormField label={t("totol-parking-place")} form={form} name="parking" />
          
                      </div>
                      <TextAreaFormField form={form} label={t("address")} name="address" />
                      <TextAreaFormField form={form} label={t("additional-information")} name="note" />
                    </div>
        </div>

        <div className="p-6 border-t bg-muted/30">
          <Button className="w-full h-11 font-bold shadow-sm" type="submit">
            {t("create")}
          </Button>
        </div>
        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
