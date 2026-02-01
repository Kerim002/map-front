import { FolderOpen } from "lucide-react"
import { useTranslation } from "react-i18next"

export const EmptyFolderState = () => {
  const { t } = useTranslation()
  return <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
    <FolderOpen className="size-14 mb-4" />
    <p className="text-sm">{t("this-folder-is-empty")}</p>
  </div>
}