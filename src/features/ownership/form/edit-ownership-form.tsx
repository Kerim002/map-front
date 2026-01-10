import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BuildingMutation } from "@/entities/building/contract";
import { Form } from "@/shared/ui/form";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useUpdateOwnership } from "../hooks/use-update-ownership";
import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { OwnershipContract } from "@/entities/ownership/contract/ownership.contract";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { useTranslation } from "react-i18next";

export const EditOwnershipForm = () => {
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(OwnershipContract),
  });
  const {t} = useTranslation()
  const { data } = useQuery(ownershipApi.detail(getQuery("id") as string));

  const { mutate, isPending } = useUpdateOwnership();

  useEffect(() => {
    form.setValue("en", data?.en ?? "");
    form.setValue("ru", data?.ru ?? "");
    form.setValue("tk", data?.tk ?? "");
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
