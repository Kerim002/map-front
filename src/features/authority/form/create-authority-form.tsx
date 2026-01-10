import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/shared/ui/form";

import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { useCreateAuthority } from "../hooks/use-create-authority";
import { TextFormField } from "@/features/employee/form/text-from-field";
import type { AuthorityMutation } from "@/entities/authority/contract";
import { AuthorityContract } from "@/entities/authority/contract/authority.contract";
import { useTranslation } from "react-i18next";
export const CreateAuthorityForm = () => {
  const {t} = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(AuthorityContract),
  });
  const { mutate } = useCreateAuthority();

  const onSubmit: SubmitHandler<AuthorityMutation> = (arg) => {
    mutate(arg, {
      onSuccess() {
        closeRef.current?.click();
      },
    });
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
        <Button className="w-full mt-3">{t("create")}</Button>
      </form>
    </Form>
  );
};
