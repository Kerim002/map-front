import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TextFormField } from "@/features/employee/form/text-from-field";
import { CreateUserContract, type CreateUserMutation } from "@/entities/user/contract";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { roles } from "@/shared/constants/roles-constants";
import { Label } from "@/shared/ui/label";
import { useCreateUser } from "../hooks/use-create-user";
import { useProfileQuery } from "../hooks/use-profile-query";

export const CreateUserForm = () => {
    const { t } = useTranslation();
    const closeRef = useRef<HTMLButtonElement>(null);
    const { data } = useProfileQuery()
    const form = useForm({
        resolver: zodResolver(CreateUserContract),
    });
    const { mutate, isPending } = useCreateUser()

    const onSubmit: SubmitHandler<CreateUserMutation> = (arg) => {
        mutate(arg, {
            onSuccess() {
                closeRef.current?.click();
            },
        });
    };
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
                                            data?.role === "superadmin" ? roles.map(item => (

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
                <Button disabled={isPending} className="w-full mt-3">{t("create")}</Button>
            </form>
        </Form>
    );
};
