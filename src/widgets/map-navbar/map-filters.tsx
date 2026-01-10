import { buildingApi } from '@/entities/building/api/building.api'
// import { companyApi } from '@/entities/company/api/company.api'
import { regionApi } from '@/entities/region'
import useQueryParam from '@/shared/hooks/use-query-param'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export const MapFilters = () => {
    const { data: regions } = useQuery(regionApi.list({ limit: 20, page: 1 }))
    const { data: buildings } = useQuery(buildingApi.list({ limit: 20, page: 1 }))
    const { deleteQuery, getQuery, setQuery } = useQueryParam()
    const { i18n, t } = useTranslation();
    const currentLang = (i18n.language || "ru") as "en" | "ru" | "tk"
    const handleChange = (key: string, value: string) => {
        if (value === 'all') {
            deleteQuery([key])
            return
        } else {
            setQuery([{ key: key, value }])
        }
    }


    return (
        <div className='flex items-center gap-3'>
            <Select value={getQuery("regionId") || "all"} onValueChange={(value) => handleChange("regionId", value)}>
                <SelectTrigger className=' w-56'>
                    <SelectValue className='' placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("all-regions")}</SelectItem>
                    {regions?.list.map(region => (
                        <SelectItem value={region.id} key={region.id}>
                            {region[currentLang] || region.ru}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={getQuery("buildingId") || "all"} onValueChange={(value) => handleChange("buildingId", value)}>
                <SelectTrigger className=' w-56'>
                    <SelectValue className='' placeholder="Building" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("all-buildings")}</SelectItem>
                    {buildings?.data.map(building => (
                        <SelectItem value={building.id} key={building.id}>
  
                            {building[currentLang] || building.ru}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}
