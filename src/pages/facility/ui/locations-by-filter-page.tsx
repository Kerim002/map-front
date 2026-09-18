import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { List } from "lucide-react"
import type { FacilitySearchQuery } from "@/entities/facility/api/query-type/facility-query"
import { FacilityTable } from "@/widgets/facility/facility-table"
import { Breadcrumb } from "@/shared/ui/breadcrumb"
import { authorityApi } from "@/entities/authority/api/authority.api"
import { buildingApi } from "@/entities/building/api/building.api"
import { regionApi } from "@/entities/region/api/region.api"
import { cityApi } from "@/entities/city/api/city.api"
import { districtApi } from "@/entities/district/api/district.api"
import { performanceApi } from "@/entities/performance/api/performance.api"
import { ownershipApi } from "@/entities/ownership/api/ownership.api"
import { specApi } from "@/entities/specialization/api/spec.api"

// Maps the route's :filterKey to the matching /location query param, so one
// page + one route serves the location list for every entity type.
const FILTER_PARAM: Record<string, keyof FacilitySearchQuery> = {
  authority: "authority_id",
  building: "building_id",
  region: "region_id",
  city: "city_id",
  district: "district_id",
  performance: "performance_id",
  ownership: "ownership_id",
  specialization: "specialization_id",
}

// Each entity's detail query, used to label the breadcrumb with the item's name.
const DETAIL_API: Record<string, (id: string) => any> = {
  authority: (id) => authorityApi.detail(id),
  building: (id) => buildingApi.detail(id),
  region: (id) => regionApi.detail(id),
  city: (id) => cityApi.detail(id),
  district: (id) => districtApi.detail(id),
  performance: (id) => performanceApi.detail(id),
  ownership: (id) => ownershipApi.detail(id),
  specialization: (id) => specApi.detail(id),
}

export const LocationsByFilterPage = () => {
  const { t, i18n } = useTranslation()
  const { filterKey, filterId } = useParams()
  const param = filterKey ? FILTER_PARAM[filterKey] : undefined
  const filters = param && filterId ? { [param]: filterId } : undefined

  const detailOptions = filterKey && filterId ? DETAIL_API[filterKey]?.(filterId) : undefined
  const { data: detail } = useQuery(
    detailOptions ?? { queryKey: ["locations-breadcrumb-noop"], queryFn: () => null, enabled: false }
  )
  const lang = (i18n.language || "ru") as "en" | "ru" | "tk"
  const entity = detail as { en?: string; ru?: string; tk?: string } | null
  const name = entity ? entity[lang] || entity.ru : ""

  return (
    <div className="min-h-full bg-background/50 p-6 space-y-6 max-w-[1600px] mx-auto">
      <Breadcrumb
        items={[
          // filterKey matches each entity's list route (/authority/1, /building/1, …)
          { label: filterKey ? t(filterKey) : "", href: `/${filterKey}/1` },
          { label: name || t("locations"), icon: <List className="h-4 w-4" />, active: true },
        ]}
      />

      <div className="bg-card/60 backdrop-blur-md rounded-[3rem] border border-border/50 p-6 shadow-2xl shadow-primary/5">
        <FacilityTable filters={filters} hideCreate hideOrder absoluteDetail />
      </div>
    </div>
  )
}
