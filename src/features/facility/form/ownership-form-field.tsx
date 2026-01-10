import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { useClickOutside } from "@/shared/hooks/use-click-outside";
import { useDebounce } from "@/shared/hooks/use-debouncer";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};

export const OwnershipFormField = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const boxRef = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useClickOutside([boxRef, dropDownRef], () => setIsOpen(false));
  const debounceText = useDebounce(search, 300);
  const { data: regionList } = useQuery(
    ownershipApi.list({ limit: 20, page: 1, search: debounceText })
  );

  const selectedItem = form.watch(name);
  const handleSelect = ({
    id,
    regionName,
  }: {
    id: string;
    regionName: string;
  }) => {
    form.setValue(name, { id, type: regionName } as PathValue<T, Path<T>>, {
      // This ensures the error disappears immediately after selecting
      shouldValidate: true,
      shouldDirty: true,
    });
    setSearch(regionName);
    setIsOpen(false);
  };

  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "ru") as "en" | "ru" | "tk"

  useEffect(() => {
    if (selectedItem?.id) {
      setSearch(selectedItem.type);
    }
  }, [selectedItem?.id]);

  const handleRemove = () => {
    handleSelect({ regionName: "", id: "" });

    setSearch("");
  };

  return (
    <div className="space-y-2 relative flex-1">
      <Label>{label}</Label>
      <Input
        ref={boxRef}
        onClick={() => setIsOpen((prev) => !prev)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-10 bg-white"
      />
      {form.formState.errors[name] && (
        <p className="text-sm text-red-500">
          {/* If 'name' is 'region', RHF might put the error on 
       errors.region.message OR errors.region.id.message 
    */}
          {(form.formState.errors[name] as any)?.message ||
            (form.formState.errors[name] as any)?.id?.message ||
            (form.formState.errors[name] as any)?.type?.message}
        </p>
      )}
      <Button
        onClick={handleRemove}
        type="button"
        className="absolute top-6 right-0"
        variant={"ghost"}
      >
        <X />
      </Button>
      {form.formState.errors[name] && (
        <p className="text-sm text-red-500">
          {Object.entries(form?.formState?.errors[name]).map(
            ([_, value]) => value && <>{value?.message}</>
          )}
        </p>
      )}
      {isOpen && (
        <div
          ref={dropDownRef}
          className="max-h-72  overflow-auto space-y-2 absolute left-0 right-0 top-16 border rounded-lg p-2 bg-white dark:bg-zinc-900 z-10"
        >
          {regionList?.data?.map((item) => (
            <p
              onClick={() =>
                handleSelect({ id: item.id, regionName: item[currentLang] || item.ru })
              }
              key={item.id}
              className={`dark:hover:bg-zinc-800 hover:bg-gray-200 rounded-lg p-2 ${selectedItem?.id === item.id
                ? "dark:bg-zinc-800 bg-gray-200"
                : ""
                }`}
            >
              {item[currentLang] || item.ru}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
