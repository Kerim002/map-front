import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createFacilityContract } from "@/entities/facility/contract/facility.contract";
import { Form } from "@/shared/ui/form";
import type { FaciltyMutation } from "@/entities/facility/contract";
import { RegionFormField } from "./region-form-field";
import { BuildingpFormField } from "./building-form-field";
import { TextAreaFormField } from "./textarea-form-field";
import { useCreateFacility } from "../hook/use-create-facility";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useRef } from "react";
import { Button } from "@/shared/ui/button";
import { SheetClose } from "@/shared/ui/sheet";
import { TimeFormField } from "./time-form-field";
import { NumberFormField } from "./number-form-field";
import { useTranslation } from "react-i18next";
import { OwnershipFormField } from "./ownership-form-field";
import { AuthorityFormField } from "./authority-form-field";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "@/entities/facility/api/facility.api";
import { SpecFormField } from "./spec-form-field";
import { SwitchFormField } from "@/shared/ui/switch-form-field";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { PerformanceFormField } from "./performance-from-field";
export const CreateFacilityForm = () => {


  const { pathname } = useLocation()
  const isInChild = pathname.includes("/childs")
  const isInRental = pathname.includes("/rentals")
  const form = useForm({
    resolver: zodResolver(createFacilityContract(isInChild)),
  });
  const { facilityId } = useParams()
  const closeRef = useRef<HTMLButtonElement>(null);
  const { getQuery, deleteQuery } = useQueryParam();
  const { mutate } = useCreateFacility();
  const { t } = useTranslation()
  const { data } = useQuery(facilityApi.detail(facilityId))
  const geom = isInChild || isInRental ? { lat: data?.geom.lat ?? 0, lng: data?.geom.lng ?? 0 } : { lat: Number(getQuery("lat")), lng: Number(getQuery("lng")) }

  const onSubmit: SubmitHandler<FaciltyMutation> = (body) => {

    mutate(
      {
        ...body,
        geom,
        parent_id: isInChild || isInRental ? facilityId : undefined,
        rental: isInRental
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
            <h2 className="text-xl font-bold tracking-tight">{t("create-facility")}</h2>
            <p className="text-sm text-muted-foreground">{t("create-facility-desc")}</p>
          </div>

          <div className="space-y-4 overflow-auto">
            <TextFormField form={form} label={t("location-name")} name="name" />
            <div className={`grid gap-3 ${isInChild ? "grid-cols-1" : "grid-cols-2"}`}>
              <AuthorityFormField form={form} label={t("authority")} name="auhtority" />
              <RegionFormField form={form} label={t("region")} name="region" />

            </div>
            <div className="grid grid-cols-2 gap-3">
              {
                !isInChild && <TextFormField form={form} label={t("cadester-code")} name="cadaster" />
              }

              <OwnershipFormField form={form} label={t("ownership")} name="ownership" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PerformanceFormField form={form} label={t("performance")} name="performance" />

              <SpecFormField form={form} label={t("specialization")} name="specialization" />
            </div>
            <div className="grid grid-cols-2 gap-3">

              <BuildingpFormField form={form} label={t("building")} name="building" />
              <NumberFormField label={t("total-floor")} form={form} name="floor" />

            </div>
            <div className="grid grid-cols-2 gap-3">

              <NumberFormField label={t("total-area")} form={form} name="area" />
              <NumberFormField label={t("totol-parking-place")} form={form} name="parking" />


            </div>
            <div className="grid grid-cols-2 gap-3">
              <TimeFormField form={form} label={t("license-expired-at")} name="licenseExpiredAt" />
              <TimeFormField label={t("fire-incpect-at")} form={form} name="fireInspectAt" />

              {/* <NumberFormField label={t("totol-parking-place")} form={form} name="parking" /> */}

            </div>
            {isInChild &&
              <div>
                <SwitchFormField control={form.control} label={t("visibility")} name="visibility" />
              </div>
            }
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
