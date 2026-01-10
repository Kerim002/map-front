import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { regionApi } from "@/entities/region";
import { useUpdateRegion } from "../hooks/use-update-region";
import { RegionContract, type RegionMutation } from "@/entities/region/contract";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { useTranslation } from "react-i18next";

export const EditRegionForm = () => {
   const { t } = useTranslation();
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(RegionContract),
  });
  const { data } = useQuery(regionApi.detail(getQuery("id") as string));

  const { mutate, isPending } = useUpdateRegion();

  useEffect(() => {
    form.setValue("en", data?.en ?? "");
    form.setValue("tk", data?.tk ?? "");
    form.setValue("ru", data?.ru ?? "");
  }, [data]);

  const onSubmit: SubmitHandler<RegionMutation> = (arg) => {
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
          {t("edit")}
        </Button>
      </form>
    </Form>
  );
};
