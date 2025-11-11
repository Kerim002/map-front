import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BuildingMutation } from "@/entities/building/contract";
import { Form } from "@/shared/ui/form";
import { TypeFormField } from "./type-form-field";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { PerformanceContract } from "@/entities/performance/contract/performance.contract";
import { regionApi } from "@/entities/region";
import { useUpdateRegion } from "../hooks/use-update-region";

export const EditRegionForm = () => {
  const { getQuery } = useQueryParam();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(PerformanceContract),
  });
  const { data } = useQuery(regionApi.detail(getQuery("id") as string));

  const { mutate, isPending } = useUpdateRegion();

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
