import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BuildingMutation } from "@/entities/building/contract";
import { Form } from "@/shared/ui/form";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useUpdatePerformance } from "../hooks/use-update-performance";
import { performanceApi } from "@/entities/performance/api/performance.api";
import { PerformanceContract } from "@/entities/performance/contract/performance.contract";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { useTranslation } from "react-i18next";

export const EditPerformanceForm = () => {
  const {t} = useTranslation()
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(PerformanceContract),
  });
  const { data } = useQuery(performanceApi.detail(getQuery("id") as string));

  const { mutate, isPending } = useUpdatePerformance();

  useEffect(() => {
    form.setValue("tk", data?.tk ?? "");
    form.setValue("ru", data?.ru ?? "");
    form.setValue("en", data?.en ?? "");
  }, [data]);

  const onSubmit: SubmitHandler<BuildingMutation> = (arg) => {
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
          <TextFormField form={form} name="en" label={t("english")} />
          <TextFormField form={form} name="ru" label={t("russian")} />
          <TextFormField form={form} name="tk" label={t("turkmen")} />
        </div>
        <DialogClose ref={closeRef} />
        <Button disabled={isPending} className="w-full mt-3">
          {t("update")}
        </Button>
      </form>
    </Form>
  );
};
