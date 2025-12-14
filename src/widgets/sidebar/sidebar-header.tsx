import { useTheme } from "@/app/provider/theme-provider";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SheetHeader } from "@/shared/ui/sheet";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SidebarSheetHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <SheetHeader className="flex items-center flex-row">
      <Button
        onClick={() => toggleTheme()}
        variant="secondary"
        className="size-8"
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
      <Select
        value={i18n.language}
        onValueChange={(e) => i18n.changeLanguage(e)}
      >
        <SelectTrigger className="w-3/5">
          <SelectValue placeholder="lang..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t("en")}</SelectItem>
          <SelectItem value="ru">{t("ru")}</SelectItem>
          <SelectItem value="tk">{t("tk")}</SelectItem>
        </SelectContent>
      </Select>
    </SheetHeader>
  );
};
