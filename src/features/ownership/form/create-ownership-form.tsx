import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BuildingMutation } from "@/entities/building/contract";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { useCreateOwnership } from "../hooks/use-create-ownership";
import { TypeFormField } from "./type-form-field";
import { OwnershipContract } from "@/entities/ownership/contract/ownership.contract";

export const CreateOwnershipForm = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(OwnershipContract),
  });
  const { mutate } = useCreateOwnership();

  const onSubmit: SubmitHandler<BuildingMutation> = (arg) => {
    mutate(arg, {
      onSuccess() {
        closeRef.current?.click();
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <TypeFormField form={form} name="type" />
        </div>
        <DialogClose ref={closeRef} />
        <Button className="w-full mt-3">Create</Button>
      </form>
    </Form>
  );
};
