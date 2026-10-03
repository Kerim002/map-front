import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/shared/ui/form";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useUpdateMinister } from "../hooks/use-update-minister";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { ministerApi } from "@/entities/minister/api/minister.api";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { MinisterContract } from "@/entities/minister/contract/minister.contract";
import type { MinisterMutation } from "@/entities/minister/contract";
import { useTranslation } from "react-i18next";
export const EditMinisterForm = () => {
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(MinisterContract),
  });
  const { data } = useQuery(ministerApi.detail(getQuery("id") as string));
  const { t } = useTranslation();
  const { mutate, isPending } = useUpdateMinister();

  useEffect(() => {
    form.setValue("en", data?.en ?? "");
    form.setValue("ru", data?.ru ?? "");
    form.setValue("tk", data?.tk ?? "");
  }, [data]);

  const onSubmit: SubmitHandler<MinisterMutation> = (arg) => {
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
