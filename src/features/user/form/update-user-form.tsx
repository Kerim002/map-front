import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { type UpdateUserMutation } from "@/entities/user/contract";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { roles } from "@/shared/constants/roles-constants";
import { Label } from "@/shared/ui/label";
import { UpdateUserContract } from "@/entities/user/contract/user.contract";
import { useUpdateUser } from "../hooks/use-update-user";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/entities/user/api/user.api";
import { useProfileQuery } from "../hooks/use-profile-query";

export const UpdateUserForm = () => {
    const { getQuery } = useQueryParam()
    const { t } = useTranslation();
    const closeRef = useRef<HTMLButtonElement>(null);
    const {data:profile} = useProfileQuery()
    const { data } = useQuery(userApi.detail(getQuery("id") ?? ""))
    const form = useForm({
        resolver: zodResolver(UpdateUserContract),
        values: data ? {
            name: data.name ?? "",
            phone: data.phone ?? "",
            role: data.role ? String(data.role) : "",
            surname: data.surname ?? "",
            username: data.username ?? "",
            password: ""
        } : undefined
    });
    const { mutate, isPending } = useUpdateUser()

    const onSubmit: SubmitHandler<UpdateUserMutation> = (arg) => {
        mutate({ json: arg, userId: getQuery("id") ?? "" }, {
            onSuccess() {
                closeRef.current?.click();
            },
        });
    };

    if(profile?.role !== "superadmin" && data?.role === "superadmin"){
        return null
    }
    if(profile?.role === "admin" && data?.role === "admin"){
        return null
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-3">
                    <TextFormField label={t("username")} form={form} name="username" />
                    <TextFormField label={t("password")} form={form} name="password" />
                    <TextFormField label={t("phone")} form={form} name="phone" />
           
                    <Controller
                        name="role"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Label className="mb-2">{t("select-role")}</Label>
                                <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        className="w-full"
                                        id="form-rhf-select-language"
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder={t("select-role")} />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {
                                            profile?.role === "superadmin" ? roles.map(item => (

                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                            )) : roles.filter(item => item !== "superadmin" && item !== "admin").map(item => (
                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                            ))
                                        }

                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    />
                    <TextFormField label={t("name")} form={form} name="name" />
                    <TextFormField label={t("surname")} form={form} name="surname" />

                </div>

                <DialogClose ref={closeRef} />
                <Button disabled={isPending} className="w-full mt-3">{t("update")}</Button>
            </form>
        </Form>
    );
};
