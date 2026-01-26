import { CreateEmployeeContract, type EmployeCreateMutation } from "@/entities/employee/contract/employee.contract";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateEmployee } from "../hook/use-create-employee";
import { useParams } from "react-router-dom";
import { DialogClose } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { TextFormField } from "./text-from-field";
import { Form } from "@/shared/ui/form";
import { AvatarFormField } from "./avatar-form-field";
import { FolderPopoverPicker } from "@/shared/ui/folder-form-field";
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
                <div className="w-full flex flex-col items-center justify-center">

                    <AvatarFormField form={form} label={t("avatar")} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <TextFormField form={form} name="first_name" label={t("firstname")} />
                    <TextFormField form={form} name="last_name" label={t("lastname")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <TextFormField form={form} name="email" label={t("email")} />
                    <TextFormField form={form} name="surname" label={t("surname")} />
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <TextFormField form={form} name="phone" label={t("phone")} />
                    <TextFormField form={form} name="position" label={t("position")} />
                </div>
                <FolderPopoverPicker
                    locationId={facilityId ?? ""}
                    value={form.watch("folder")}
                    onSelect={(val) => form.setValue("folder", val)}
                />

                <DialogClose ref={closeRef} className="hidden" />
                <Button type="submit" className="w-full mt-3">
                    {t("create")}
                </Button>
            </form>
        </Form>
    );
};