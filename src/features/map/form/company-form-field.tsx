import {} from "@/entities/region";
import { useClickOutside } from "@/shared/hooks/use-click-outside";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};

export const CompanyFormField = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const boxRef = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useClickOutside([boxRef, dropDownRef], () => setIsOpen(false));
  // const debounceText = useDebounce(search, 300);
  // const { data: companyList } = useQuery(
  //   companyApi.list({ limit: 10, page: 1, search: debounceText })
  // );

  const selectedItem = form.watch(name);
  const handleSelect = ({
    id,
    companyName,
  }: {
    id: string;
    companyName: string;
  }) => {
    console.log(id, companyName);
    form.setValue(name, { id, name: companyName } as PathValue<T, Path<T>>);
    setSearch(companyName);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedItem) {
      setSearch(selectedItem.fullname);
    }
  }, [selectedItem]);

  const handleRemove = () => {
    handleSelect({ companyName: "", id: "" });

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
        className="h-10"
      />
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
          {/* {companyList?.list?.map((item) => (
            <p
              onClick={() =>
                handleSelect({ id: item.id, companyName: item.type })
              }
              key={item.id}
              className={`dark:hover:bg-zinc-800 hover:bg-gray-200 rounded-lg p-2 ${
                selectedItem?.id === item.id
                  ? "dark:bg-zinc-800 bg-gray-200"
                  : ""
              }`}
            >
              {item.type}
            </p>
          ))} */}
        </div>
      )}
    </div>
  );
};
