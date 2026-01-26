import { createFolder } from "@/entities/folders/api/mutations/create-folder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFolder = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};
