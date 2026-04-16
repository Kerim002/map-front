import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useUpdateDistrict } from "../hooks/use-update-district";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { useTranslation } from "react-i18next";
import { districtApi } from "@/entities/district";
import { DistrictContract, type DistrictMutation } from "@/entities/district/contract";

export const EditDistrictForm = () => {
   const { t } = useTranslation();
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(DistrictContract),
  });
  const { data } = useQuery(districtApi.detail(getQuery("id") as string));

  const { mutate, isPending } = useUpdateDistrict();

  useEffect(() => {
    form.setValue("en", data?.en ?? "");
    form.setValue("tk", data?.tk ?? "");
    form.setValue("ru", data?.ru ?? "");
  }, [data]);

  const onSubmit: SubmitHandler<DistrictMutation> = (arg) => {
    mutate(
      { ...arg, id: getQuery("id") as string },
      {
        onSuccess: () => {
          closeRef.current?.click();
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <TextFormField label={t("english")} form={form} name="en" />
          <TextFormField label={t("turkmen")} form={form} name="tk" />
          <TextFormField label={t("russian")} form={form} name="ru" />
        </div>
        <DialogClose ref={closeRef} />
        <Button disabled={isPending} className="w-full mt-3">
          {t("update")}
        </Button>
      </form>
    </Form>
  );
};
