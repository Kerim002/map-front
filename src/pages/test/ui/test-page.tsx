import { FolderPopoverPicker } from "@/shared/ui/folder-form-field";
import { Form } from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";



export const folderSelectSchema = z.object({
  folder: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
});


export function TestPage() {
  const locationId = "dd35f17c-cbed-46d9-88cc-8e5166ef94d0";


  const form = useForm({
    resolver: zodResolver(folderSelectSchema),
    defaultValues: {
      folder: undefined,
    },
  });


  const onSubmit = (data: z.infer<typeof folderSelectSchema>) => {
    console.log("Selected folder:", data.folder);
  }

  return (
    <div>
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FolderPopoverPicker
            locationId={locationId}
            value={form.watch("folder")}
            onSelect={(val) => form.setValue("folder", val)}
          />

          <button type="submit">Submit</button>

        </form>
      </Form>
    </div>
  );
}



