import { companyApi } from "@/entities/company/api/company.api";
import { companyColumn } from "@/entities/company/model/company.column";
import { CreateCompanyDialog } from "@/features/company/dialog/create-company-dialog";
import { UpdateCompanyDialog } from "@/features/company/dialog/update-company-dialog";

import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const CompanyTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useQuery(
    companyApi.list({ limit: 12, page: 1 })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: companyColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">{t("company-list")}</span>
        </div>
        <CreateCompanyDialog />
      </div>

      <div className="rounded-[2rem] bg-card/30 backdrop-blur-md border border-border/50 overflow-hidden shadow-2xl shadow-primary/5">
        <div className="overflow-auto max-h-[600px] scrollbar-thin">
          <DataTable table={table} isFetchingNextPage={isFetching} />
        </div>
        <div className="p-6 bg-muted/10 border-t border-border/20">
          <TablePagination table={table} isFetching={isFetching} />
        </div>
      </div>

      <UpdateCompanyDialog />
    </div>
  );
};
