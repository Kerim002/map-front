import { authorityApi } from '@/entities/authority/api/authority.api'
import { performanceApi } from '@/entities/performance/api/performance.api'
import { regionApi } from '@/entities/region'
import { useTranslation } from 'react-i18next'
import { SearchFilterSelect } from './search-select'
import { cityApi } from '@/entities/city'

export const MapFilters = () => {


  const { i18n, t } = useTranslation();
  const currentLang = (i18n.language || "ru") as "en" | "ru" | "tk"



  return (
    <div className="flex gap-3 w-full">

      <SearchFilterSelect
        filterKey="regionId"
        placeholder={t("region")}
        query={(search: string) =>
          regionApi.getRegionInfitityQuery({ limit: 20, page: 1, search })
        }
        getItems={(d: any) => d?.list ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => regionApi.detail(id)}
      />
      <SearchFilterSelect
        filterKey="cityId"
        placeholder={t("city")}
        query={(search: string) =>
          cityApi.getCityInfitityQuery({ limit: 20, page: 1, search })
        }
        getItems={(d: any) => d?.list ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => cityApi.detail(id)}
      />
      {/* <SearchFilterSelect
        filterKey="districtId"
        placeholder={t("district")}
        query={(search: string) =>
          districtApi.getDistrictInfitityQuery({ limit: 20, page: 1, search })
        }
        getItems={(d: any) => d?.list ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => districtApi.detail(id)}
      /> */}
      {/* 
      <SearchFilterSelect
        filterKey="buildingId"
        placeholder={t("building")}
        query={(search: string) =>
          buildingApi.getBuildingInfitityQuery({limit:20, page:1, search})
        }
        getItems={(d: any) => d?.data ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => buildingApi.detail(id)}

      /> */}

      <SearchFilterSelect
        filterKey="authorityId"
        placeholder={t("authority")}
        query={(search: string) =>
          authorityApi.getAuthorityInfitityQuery({ limit: 20, page: 1, search })
        }
        getItems={(d: any) => d?.data ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => authorityApi.detail(id)}

      />



      <SearchFilterSelect
        filterKey="performanceId"
        placeholder={t("performance")}
        query={(search: string) =>
          performanceApi.getPerformanceInfitityQuery({ limit: 20, page: 1, search })
        }
        getItems={(d: any) => d?.data ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => performanceApi.detail(id)} />


      {/* <SearchFilterSelect
        filterKey="ownershipId"
        placeholder={t("ownership")}
        query={(search: string) =>
          ownershipApi.getOwnershipInfitityQuery({ limit: 20, page: 1, search })
        }
        getItems={(d: any) => d?.data ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => ownershipApi.detail(id)}

      /> */}
      {/* <SearchFilterSelect
        filterKey="specId"
        placeholder={t("specialization")}
        query={(search: string) =>
          specApi.getSpecInfitityQuery({ limit: 20, page: 1, search })
        }
        getItems={(d: any) => d?.list ?? []}
        getValue={(r: any) => r.id}
        getLabel={(r: any) => r[currentLang] || r.ru}
        getById={(id: string) => specApi.detail(id)}

      /> */}

    </div>
  )
}
