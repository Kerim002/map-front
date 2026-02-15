import { CreateEmployeeContract, type EmployeCreateMutation } from "@/entities/employee/contract/employee.contract";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { DialogClose } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { TextFormField } from "./text-from-field";
import { Form } from "@/shared/ui/form";
import { AvatarFormField } from "./avatar-form-field";
import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee/api/employee.api";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useUpdateEmployee } from "../hook/use-update-employee";
import { toast } from "sonner";
import { useUpdateEmployeeImage } from "../hook/use-update-employee-image";
// import { FolderPopoverPicker } from "@/shared/ui/folder-form-field";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";

export const UpdateEmployeeForm = () => {
    const { facilityId, facilityChildId } = useParams();
    const { t } = useTranslation();
    const { getQuery } = useQueryParam()
    const closeRef = useRef<HTMLButtonElement>(null);
    const { data } = useQuery(employeeApi.detail(getQuery("id")))
    const form = useForm<EmployeCreateMutation>({
        resolver: zodResolver(CreateEmployeeContract),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            position: "",
            surname: "",
        }
    });

    const { mutate } = useUpdateEmployee();
    const { mutate: updateEmployeeImage } = useUpdateEmployeeImage()

    const onSubmit: SubmitHandler<EmployeCreateMutation> = (arg) => {
        const employeeId = getQuery("id") ?? "";
        if (arg.avatar_cropped) {
            updateEmployeeImage({
                id: employeeId,
                avatar: arg.avatar_cropped
            });
            toast.success(t("Employee image updated"));
        }

        mutate(
            { ...arg, location_id: facilityChildId ? facilityChildId : facilityId ?? "", id: employeeId },
            {
                onSuccess: async () => {
                    toast.success(t("Employee updated"));
                    closeRef.current?.click();
                },
                onError: (error: any) => {
                    const errorData = error.data;
                    if (errorData?.detail) {
                        errorData.detail.forEach((err: any) => {
                            const fieldName = err.loc[err.loc.length - 1];
                            form.setError(fieldName as any, { message: err.msg });
                        });
                    }
                    toast.error(t("Update failed"));
                },
            }
        );
    };

    useEffect(() => {
        if (data) {
            form.reset({
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone,
                position: data.position,
                surname: data.surname,
                // folder: data.folder
                //     ? {
                //         id: data.folder.id,
                //         name: data.folder.name,
                //     }
                //     : undefined,

            });
        }
    }, [data, form])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div className="w-full flex flex-col items-center justify-center">
                    <AvatarFormField oldImage={storageUrlCreate("user", data?.avatarUrl ?? "", "sm")} form={form} label={t("avatar")} />
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

                {/* <FolderPopoverPicker
                    locationId={facilityId ?? ""}
                    value={form.watch("folder") ?? data?.folder}
                    onSelect={(val) => form.setValue("folder", val)}
                /> */}


                <DialogClose ref={closeRef} className="hidden" />
                <Button type="submit" className="w-full mt-3">
                    {t("update")}
                </Button>
            </form>
        </Form>
    );
};