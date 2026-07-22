"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler, type FieldValues, type Path, type UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useQuery, useMutation } from "@tanstack/react-query"
import { RefreshCw, Eye, EyeOff } from "lucide-react"

import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { TextFormField } from "@/features/employee/form/text-from-field"

import { login as loginRequest } from "@/entities/user/api/mutation/login"
import { getCapthca } from "@/entities/user/api/query/gat-captcha"

type LoginFormValues = {
    login: string
    password: string
    captcha_text: string
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
    const [showPassword, setShowPassword] = useState(false)

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                className="bg-white pr-10"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                {...field}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                                ) : (
                                    <Eye className="h-4 w-4" aria-hidden="true" />
                                )}
                                <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                </span>
                            </Button>
                        </div>
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
    const { t } = useTranslation()

    const form = useForm<LoginFormValues>({
        defaultValues: {
            login: "",
            password: "",
            captcha_text: "",
        },
        mode: "onTouched",
    })

    const { 
        data: captchaData, 
        refetch: refetchCaptcha, 
        isLoading: isCaptchaLoading,
        isFetching: isCaptchaFetching
    } = useQuery({
        queryKey: ["captcha"],
        queryFn: getCapthca,
        refetchOnWindowFocus: false,
    })

    const loginMutation = useMutation({
        mutationFn: loginRequest,
        onSuccess: (response) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", JSON.stringify(response.user))
            }
            navigate("/")
        },
        onError: (error) => {
            console.error(error)
            const message = error instanceof Error ? error.message : t("login-failed")
            setServerError(message)
            
            form.setValue("captcha_text", "")
            refetchCaptcha()
        }
    })

    const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
        setServerError(null)
        
        if (!captchaData?.captcha_id) {
            setServerError("CAPTCHA is still loading. Please try again.")
            return
        }

        loginMutation.mutate({
            login: values.login,
            password: values.password,
            captcha_id: captchaData.captcha_id,
            captcha_text: values.captcha_text,
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
            <div className="mx-auto w-full max-w-md rounded-3xl border border-input bg-background/95 p-8 shadow-lg shadow-slate-900/10">
                <div className="mb-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{t('welcome-back')}</p>
                    <h1 className="mt-4 text-3xl font-semibold">{t('sign-in-to-your-account')}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">{t('use-your-login-and-password-to-access-the-dashboard')}</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <TextFormField form={form} name="login" label={t("login")} />
                        <PasswordFormField form={form} name="password" label={t("password")} />

                        {/* CAPTCHA Section */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                    onClick={() => {
                                        form.setValue("captcha_text", "")
                                        refetchCaptcha()
                                    }}
                                    disabled={isCaptchaFetching}
                                    title={t("refresh")}
                                >
                                    <RefreshCw className={`h-4 w-4 ${isCaptchaFetching ? "animate-spin" : ""}`} />
                                    <span className="sr-only">{t("refresh")}</span>
                                </Button>
                                <FormLabel>{t("captcha")}</FormLabel>
                            </div>
                            
                            <div className="flex w-full items-center justify-center overflow-hidden rounded-md border bg-muted/50">
                                {isCaptchaLoading || isCaptchaFetching ? (
                                    <span className="text-xs text-muted-foreground">Loading...</span>
                                ) : captchaData?.image ? (
                                    <img 
                                        src={captchaData.image.startsWith('data:image') ? captchaData.image : `data:image/png;base64,${captchaData.image}`} 
                                        alt="CAPTCHA" 
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-destructive">Failed to load</span>
                                )}
                            </div>

                            <FormField
                                control={form.control}
                                name="captcha_text"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                className="bg-white"
                                                placeholder={t("enter-captcha-code")}
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {serverError && (
                            <p className="text-sm text-destructive">{serverError}</p>
                        )}

                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={loginMutation.isPending || isCaptchaFetching}
                        >
                            {loginMutation.isPending ? t("signing-in") : t("login")}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage