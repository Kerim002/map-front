import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { CreateCompanyContract } from "@/entities/company/contract/company.contract";
// import { useCreateCompany } from "../hooks/use-create-company";
import type { CreateCompanyMutation } from "@/entities/company/contract";
import { NameFormField } from "./name-form-field";
import { RegionFormField } from "@/features/map/form/region-form-field";
import { PerformanceFormField } from "./performance-form-field";
import { OwnershipFormField } from "./ownership-form-field";
import { AuthorityFormField } from "./authority-form-field";
import { useCreateCompany } from "../hooks/use-create-company";

export const CreateCompanyForm = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(CreateCompanyContract),
  });
  const { mutate } = useCreateCompany();

  const onSubmit: SubmitHandler<CreateCompanyMutation> = (arg) => {
    mutate(arg, {
      onSuccess() {
        closeRef.current?.click();
      },
    });
  };
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
