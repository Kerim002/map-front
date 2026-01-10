import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { BuildingContract } from "@/entities/building/contract/building.contract";
import type { BuildingMutation } from "@/entities/building/contract";
import { Form } from "@/shared/ui/form";

import { Button } from "@/shared/ui/button";
import { useCreateBuilding } from "../hooks/use-create-buildng";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { useTranslation } from "react-i18next";
export const CreateBuildingForm = () => {
  const {t} = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(BuildingContract),
  });
  const { mutate } = useCreateBuilding();

  const onSubmit: SubmitHandler<BuildingMutation> = (arg) => {
    mutate(arg, {
      onSuccess() {
        closeRef.current?.click();
      },
    });
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-6 p-6">


        <div className="space-y-3">
          <TextFormField form={form} name="en" label={t("english")} />
          <TextFormField form={form} name="ru" label={t("russian")} />
          <TextFormField form={form} name="tk" label={t("turkmen")} />
        </div>
        </div>

        <div className="p-6 border-t bg-muted/30">
          <Button className="w-full h-11 font-bold shadow-sm" type="submit">
            {t("create")}
          </Button>
        </div>
        <DialogClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
