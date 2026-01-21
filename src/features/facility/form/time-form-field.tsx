// "use client"

// import { format, parseISO, isValid } from "date-fns"
// import { ChevronDownIcon } from "lucide-react"
// import { cn } from "@/shared/lib/utils"
// import { Button } from "@/shared/ui/button"
// import { Calendar } from "@/shared/ui/calendar"
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/shared/ui/form"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/shared/ui/popover"
// import type { FieldValues, UseFormReturn, Path } from "react-hook-form"
// import { useTranslation } from "react-i18next"

// type Props<T extends FieldValues> = {
//   form: UseFormReturn<T>;
//   name: Path<T>;
//   label: string;
// };

// export const TimeFormField = <T extends FieldValues>({
//   form,
//   name,
//   label,
// }: Props<T>) => {
//   const {t} = useTranslation()
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => {
//         // Handle conversion from string (YYYY-MM-DD) back to Date object for the Calendar
//         const selectedDate = field.value ? parseISO(field.value) : undefined;
//         const displayDate = selectedDate && isValid(selectedDate) ? selectedDate : null;

//         return (
//           <FormItem className="flex flex-col gap-1">
//             <FormLabel>{label}</FormLabel>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <FormControl>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full pl-3 text-left font-normal bg-white border-border/50",
//                       !field.value && "text-muted-foreground"
//                     )}
//                   >
//                     {displayDate ? (
//                       format(displayDate, "PPP")
//                     ) : (
//                       <span>{t("pick-a-date")}</span>
//                     )}
//                     <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
//                   </Button>
//                 </FormControl>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={displayDate || undefined}
//                   onSelect={(date) => {
//                     if (!date) {
//                       field.onChange(null);
//                       return;
//                     }
//                     const formattedDate = format(date, "yyyy-MM-dd");
//                     field.onChange(formattedDate);
//                   }}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//             <FormMessage />
//           </FormItem>
//         );
//       }}
//     />
//   );
// };


"use client"

import { format, parseISO, isValid } from "date-fns"
// Import the locales you need
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover"
import type { FieldValues, UseFormReturn, Path } from "react-hook-form"
import { useTranslation } from "react-i18next"

// Helper to map i18next language codes to date-fns locale objects
import { enUS, ru } from "date-fns/locale"

// Custom Turkmen Locale for date-fns
const tkLocale = {
  ...enUS, // Base it on EN or TR
  code: 'tk',
  localize: {
    ...enUS.localize,
    month: (n: number) => 
      ['Ýanwar', 'Fewral', 'Mart', 'Aprel', 'Maý', 'Iýun', 'Iýul', 'Awgust', 'Sentýabr', 'Oktýabr', 'Noýabr', 'Dekabr'][n],
    day: (n: number) => 
      ['Ýek', 'Duş', 'Siş', 'Çar', 'Pen', 'Jum', 'Şen'][n],
  },
  formatLong: {
    ...enUS.formatLong,
    date: () => 'dd.MM.yyyy', // Standard Turkmen date format
  }
}

const localeMap: Record<string, any> = {
  en: enUS,
  ru: ru,
  tk: tkLocale, // Use our custom Turkmen object
};

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};
export const TimeFormField = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  const { t, i18n } = useTranslation()
  
  // Identify current locale: default to EN if current language is not found
  const currentLocale = localeMap[i18n.language] || enUS

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedDate = field.value ? parseISO(field.value) : undefined;
        const displayDate = selectedDate && isValid(selectedDate) ? selectedDate : null;

        return (
          <FormItem className="flex flex-col gap-1">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal bg-white border-border/50",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {displayDate ? (
                      // PPP format will now show "11 Ýanwar 2026" for Turkmen
                      format(displayDate, "PPP", { locale: currentLocale })
                    ) : (
                      <span>{t("pick-a-date")}</span>
                    )}
                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  locale={currentLocale} // This translates the Calendar grid
                  selected={displayDate || undefined}
                  onSelect={(date) => {
                    if (!date) {
                      field.onChange(null);
                      return;
                    }
                    // Keep the database format as string YYYY-MM-DD
                    field.onChange(format(date, "yyyy-MM-dd"));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};