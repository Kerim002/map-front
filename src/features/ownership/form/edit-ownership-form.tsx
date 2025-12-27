import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuildingContract } from "@/entities/building/contract/building.contract";
import type { BuildingMutation } from "@/entities/building/contract";
import { Form } from "@/shared/ui/form";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useUpdateOwnership } from "../hooks/use-update-ownership";
import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { TypeFormField } from "@/shared/ui/type-form-field";

export const EditOwnershipForm = () => {
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(BuildingContract),
  });
  const { data } = useQuery(ownershipApi.detail(getQuery("id") as string));

  const { mutate, isPending } = useUpdateOwnership();

  useEffect(() => {
    form.setValue("type", data?.type ?? "");
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
        <div>
          <TypeFormField form={form} name="type" />
        </div>
        <DialogClose ref={closeRef} />
        <Button disabled={isPending} className="w-full mt-3">
          Edit
        </Button>
      </form>
    </Form>
  );
};
