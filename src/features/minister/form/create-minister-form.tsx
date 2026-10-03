import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/shared/ui/form";

import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { useCreateMinister } from "../hooks/use-create-minister";
import { TextFormField } from "@/features/employee/form/text-from-field";
import type { MinisterMutation } from "@/entities/minister/contract";
import { MinisterContract } from "@/entities/minister/contract/minister.contract";
import { useTranslation } from "react-i18next";
export const CreateMinisterForm = () => {
  const { t } = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(MinisterContract),
  });
  const { mutate } = useCreateMinister();

  const onSubmit: SubmitHandler<MinisterMutation> = (arg) => {
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
