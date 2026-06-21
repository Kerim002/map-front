
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler, type FieldValues, type Path, type UseFormReturn } from "react-hook-form"

import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { login as loginRequest } from "@/entities/user/api/mutation/login"
import { useTranslation } from "react-i18next"
import { TextFormField } from "@/features/employee/form/text-from-field"

type LoginFormValues = {
    login: string
    password: string
}

type FieldProps<T extends FieldValues> = {
    form: UseFormReturn<T>
    name: Path<T>
    label: string
}

const PasswordFormField = <T extends FieldValues>({
    form,
    name,
    label,
}: FieldProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            className="bg-white"
                            type="password"
                            autoComplete="current-password"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

const LoginPage = () => {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string | null>(null)
    const {t} = useTranslation()
    const form = useForm<LoginFormValues>({
        defaultValues: {
            login: "",
            password: "",
        },
        mode: "onTouched",
    })

    const isSubmitting = form.formState.isSubmitting

    const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
        setServerError(null)
        try {
            const response = await loginRequest(values)
            
            if (typeof window !== "undefined") {
                console.log(values)
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", JSON.stringify(response.user))
            }

            navigate("/")
        } catch (error) {
            console.log(error)
            const message = error instanceof Error ? error.message : "Login failed"
            setServerError(message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="mx-auto w-full max-w-md rounded-3xl border border-input bg-background/95 p-8 shadow-lg shadow-slate-900/10">
                <div className="mb-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{t('welcome-back')}</p>
                    <h1 className="mt-4 text-3xl font-semibold">{t('sign-in-to-your-account')}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">{t('use-your-login-and-password-to-access-the-dashboard')}</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <TextFormField form={form} name="login" label={t("login")} />
                        <PasswordFormField form={form} name="password" label="Password" />

                        {serverError ? (
                            <p className="text-sm text-destructive">{t('invalid-username-or-password')}</p>
                        ) : null}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage