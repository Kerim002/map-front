import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { useCreateDistrict } from "../hooks/use-create-district";
import { useTranslation } from "react-i18next";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { DistrictContract, type DistrictMutation } from "@/entities/district/contract";

export const CreateDistrictForm = () => {
  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(DistrictContract),
  });
  const { mutate } = useCreateDistrict();

  const onSubmit: SubmitHandler<DistrictMutation> = (arg) => {
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
          <TextFormField label={t("english")} form={form} name="en" />
          <TextFormField label={t("turkmen")} form={form} name="tk" />
          <TextFormField label={t("russian")} form={form} name="ru" />
        </div>
        <DialogClose ref={closeRef} />
        <Button className="w-full mt-3">{t("create")}</Button>
      </form>
    </Form>
  );
};
