import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createFacilityContract } from "@/entities/facility/contract/facility.contract";
import { Form } from "@/shared/ui/form";
import type { FaciltyMutation } from "@/entities/facility/contract";
import { RegionFormField } from "./region-form-field";
import { BuildingpFormField } from "./building-form-field";
import { TextAreaFormField } from "./textarea-form-field";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "@/shared/ui/button";
import { SheetClose } from "@/shared/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "@/entities/facility/api/facility.api";
import { useUpdateFacilityPatch } from "../hook/use-update-facility-patch";
import { TimeFormField } from "./time-form-field";
import { NumberFormField } from "./number-form-field";
import { useTranslation } from "react-i18next";
import { AuthorityFormField } from "./authority-form-field";
import { useLocation } from "react-router-dom";
import { SpecFormField } from "./spec-form-field";
import { SwitchFormField } from "@/shared/ui/switch-form-field";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { PerformanceFormField } from "./performance-from-field";
import { CityFormField } from "./city-form-field";
import { DistrictFormField } from "./district-form-field";
import { ColorFormField } from "@/shared/ui/color-picker";




export const UpdateFacilityForm = () => {
  const { getQuery, deleteQuery } = useQueryParam();
  const { data } = useQuery(facilityApi.detail(getQuery("location-id")))
  const { pathname } = useLocation();

  const isInChild = pathname.includes("/childs") || !!data?.parent?.id;
  const isInRental = pathname.includes("/rentals") || data?.rental

  const resolver = useMemo(() => zodResolver(createFacilityContract(isInChild)), [isInChild]);

  const form = useForm({
    resolver: resolver,
    defaultValues: {
      name: "",
      address: "",
      cadaster: "",
    },
  });

  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { mutate } = useUpdateFacilityPatch();

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        address: data.address || "",
        region: data.region,
        building: data.building,
        area: data.area || "",
        cadaster: data.cadaster || "",
        fireInspectAt: data.fireInspectionAt || "",
        floor: data.floor,
        note: data.note || "",
        auhtority: data.authority,
        performance: data.performance,
        parking: data.parking,
        specialization: data.specialization,
        licenseExpiredAt: data.licenseExpiredAt || "",
        visibility: data.visibility,
        city: data.city,
        district: data.district,
        lat: data.geom.lat,
        lng: data.geom.lng,
        color: isInChild ? undefined : data.color ? data.color : undefined,
        number: data.number ? data.number : undefined
      });
    }
  }, [data, form]);




  const onSubmit: SubmitHandler<FaciltyMutation> = (body) => {
    mutate(
      {
        body,
        id: getQuery("location-id") ?? "",
        parent_id: data?.parent?.id,
        rental: isInRental,
        lat: body.lat,
        lng: body.lng
      },
      {
        onSuccess: () => {
          closeRef.current?.click();
          deleteQuery(["location-id", "lat", "lng"]);
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


          <div className="space-y-4 overflow-auto">
            <TextFormField form={form} label={t("location-name")} name="name" />
            <div className={`grid gap-3 ${isInChild ? "grid-cols-1" : "grid-cols-2"}`}>
              <AuthorityFormField form={form} label={t("authority")} name="auhtority" />
              <RegionFormField form={form} label={t("region")} name="region" />

            </div>
            <div className={`grid gap-3 ${isInChild ? "grid-cols-1" : "grid-cols-2"}`}>
              <CityFormField form={form} label={t("city")} name="city" />
              <DistrictFormField form={form} label={t("district")} name="district" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {
                isInRental ? <TextFormField form={form} label={t("cadester-code")} name="cadaster" /> : !isInChild && <TextFormField form={form} label={t("cadester-code")} name="cadaster" />
              }
              <NumberFormField label={"Lat"} form={form} name="lat" />
              <NumberFormField label={"Lng"} form={form} name="lng" />
              {/* <OwnershipFormField form={form} label={t("ownership")} name="ownership" /> */}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PerformanceFormField form={form} label={t("performance")} name="performance" />

              <SpecFormField form={form} label={t("specialization")} name="specialization" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <BuildingpFormField form={form} label={t("building")} name="building" />
              <NumberFormField label={t("total-floor")} form={form} name="floor" />
              <TextFormField label={"No"} form={form} name="number" />

            </div>
            <div className="grid grid-cols-2 gap-3">

              <NumberFormField label={t("total-area")} form={form} name="area" />
              <NumberFormField label={t("totol-parking-place")} form={form} name="parking" />

            </div>
            <div className={`grid  grid-cols-5 gap-3`}>
              <div className="col-span-2">

                <TimeFormField form={form} label={t("license-expired-at")} name="licenseExpiredAt" />
              </div>
              <div className="col-span-2">

                <TimeFormField label={t("fire-incpect-at")} form={form} name="fireInspectAt" />
              </div>
              {
                !isInChild &&
                <div className="col-span-1">
                  <ColorFormField form={form} label={t("color")} name="color" />

                </div>
              }

            </div>
            {data?.parent !== null &&
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
            {t("update")}
          </Button>
        </div>
        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
