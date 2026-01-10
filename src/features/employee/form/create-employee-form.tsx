import { CreateEmployeeContract, type EmployeCreateMutation } from "@/entities/employee/contract/employee.contract";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import {  useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateEmployee } from "../hook/use-create-employee";
import { useParams } from "react-router-dom";
import { DialogClose } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { TextFormField } from "./text-from-field";
import { Form } from "@/shared/ui/form";
import { AvatarFormField } from "./avatar-form-field";
// import { AvatarFormField } from "./avatar-form-field"; // Import the new component

export const CreateEmployeeForm = () => {
    const { facilityId } = useParams();
    const { t } = useTranslation();
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useForm<EmployeCreateMutation>({
        resolver: zodResolver(CreateEmployeeContract),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            position: "",
        }
    });

    const { mutate } = useCreateEmployee();

    const onSubmit: SubmitHandler<EmployeCreateMutation> = (arg) => {
        mutate({ ...arg, location_id: facilityId ?? "" }, {
            onSuccess() {
                closeRef.current?.click();
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <AvatarFormField form={form} name="avatar" label={t("avatar")} />

                <div className="grid grid-cols-2 gap-4">
                    <TextFormField form={form} name="first_name" label={t("first_name")} />
                    <TextFormField form={form} name="last_name" label={t("last_name")} />
                </div>

                <TextFormField form={form} name="email" label={t("email")} />

                <div className="grid grid-cols-2 gap-4">
                    <TextFormField form={form} name="phone" label={t("phone")} />
                    <TextFormField form={form} name="position" label={t("position")} />
                </div>

                <DialogClose ref={closeRef} className="hidden" />
                <Button type="submit" className="w-full mt-3">
                    {t("create")}
                </Button>
            </form>
        </Form>
    );
};