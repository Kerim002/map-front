import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { BuildingContract } from "@/entities/building/contract/building.contract";
import type { BuildingMutation } from "@/entities/building/contract";
import { Form } from "@/shared/ui/form";
import { TypeFormField } from "./type-form-field";
import { Button } from "@/shared/ui/button";
import { useCreateBuilding } from "../hooks/use-create-buildng";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
export const CreateBuildingForm = () => {
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
          <div className="space-y-1 border-b pb-4 mb-4">
            <h2 className="text-xl font-bold tracking-tight">Create Building</h2>
            <p className="text-sm text-muted-foreground">Specify the building type to register a new structure.</p>
          </div>

          <div className="space-y-4">
            <TypeFormField form={form} name="type" />
          </div>
        </div>

        <div className="p-6 border-t bg-muted/30">
          <Button className="w-full h-11 font-bold shadow-sm" type="submit">
            Create Building
          </Button>
        </div>
        <DialogClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
