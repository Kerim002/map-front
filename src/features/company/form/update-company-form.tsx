import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useEffect, useRef } from "react";
import { CreateCompanyContract } from "@/entities/company/contract/company.contract";
// import { useCreateCompany } from "../hooks/use-create-company";
import type { CreateCompanyMutation } from "@/entities/company/contract";
import { useQuery } from "@tanstack/react-query";
import { companyApi } from "@/entities/company/api/company.api";
import useQueryParam from "@/shared/hooks/use-query-param";
import { NameFormField } from "./name-form-field";
import { RegionFormField } from "@/features/facility/form/region-form-field";
import { PerformanceFormField } from "./performance-form-field";
import { OwnershipFormField } from "./ownership-form-field";
import { AuthorityFormField } from "./authority-form-field";
import { useUpdateCompany } from "../hooks/use-update-company";
export const UpdateCompanyForm = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { getQuery } = useQueryParam();
  const form = useForm({
    resolver: zodResolver(CreateCompanyContract),
  });

  const { data } = useQuery(companyApi.detail(getQuery("id") as string));

  const { mutate } = useUpdateCompany();

  const onSubmit: SubmitHandler<CreateCompanyMutation> = (arg) => {
    mutate(
      { ...arg, id: getQuery("id") as string },
      {
        onSuccess() {
          closeRef.current?.click();
        },
      }
    );
  };

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("cadasterCode", data.cadasterCode ?? "");
      form.setValue("authority", {
        id: data?.authority.id || "",
        name: data?.authority.type ?? "",
      });
      form.setValue("ownership", {
        id: data?.ownership.id || "",
        name: data?.ownership.type ?? "",
      });
      form.setValue("performance", {
        id: data?.performance.id || "",
        name: data?.performance.type ?? "",
      });
      form.setValue("region", {
        id: data?.region.id || "",
        name: data?.region.type ?? "",
      });
    }
  }, [data]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <NameFormField label="Name" form={form} name="name" />
          {/* for codaster code */}
          <NameFormField
            form={form}
            label="Cadaster code"
            name="cadasterCode"
          />
          <RegionFormField form={form} label="Region" name="region" />
          <PerformanceFormField
            form={form}
            label="Performance"
            name="performance"
          />
          <OwnershipFormField form={form} label="Ownership" name="ownership" />
          <AuthorityFormField form={form} label="Authority" name="authority" />
        </div>
        <DialogClose ref={closeRef} />
        <Button className="w-full mt-3">Create</Button>
      </form>
    </Form>
  );
};
