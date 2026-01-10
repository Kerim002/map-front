import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/shared/ui/form";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useUpdateAuthority } from "../hooks/use-update-authority";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { authorityApi } from "@/entities/authority/api/authority.api";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { AuthorityContract } from "@/entities/authority/contract/authority.contract";
import type { AuthorityMutation } from "@/entities/authority/contract";
import { useTranslation } from "react-i18next";
export const EditAuthorityForm = () => {
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(AuthorityContract),
  });
  const { data } = useQuery(authorityApi.detail(getQuery("id") as string));
  const {t} = useTranslation()
  const { mutate, isPending } = useUpdateAuthority();

  useEffect(() => {
    form.setValue("en", data?.en ?? "");
    form.setValue("ru", data?.ru ?? "");
    form.setValue("tk", data?.tk ?? "");
  }, [data]);

  const onSubmit: SubmitHandler<AuthorityMutation> = (arg) => {
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
