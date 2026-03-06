import { authorityApi } from '@/entities/authority/api/authority.api'
import { buildingApi } from '@/entities/building/api/building.api'
import { ownershipApi } from '@/entities/ownership/api/ownership.api'
import { performanceApi } from '@/entities/performance/api/performance.api'
import { regionApi } from '@/entities/region'
import useQueryParam from '@/shared/hooks/use-query-param'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export const MapFilters = () => {
    const { data: regions } = useQuery(regionApi.list({ limit: 20, page: 1 }))
    const { data: buildings } = useQuery(buildingApi.list({ limit: 20, page: 1 }))
    const {data: perfoemances}= useQuery(performanceApi.list({limit:20, page:1}))
    const {data: authority}= useQuery(authorityApi.list({limit:20, page:1}))
    const {data: owmership}= useQuery(ownershipApi.list({limit:20, page:1}))
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
                <SelectTrigger className=' w-44'>
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
                <SelectTrigger className=' w-44'>
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
            <Select value={getQuery("performanceId") || "all"} onValueChange={(value) => handleChange("performanceId", value)}>
                <SelectTrigger className=' w-44'>
                    <SelectValue className='' placeholder="Performance" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t('all-performances')}</SelectItem>
                    {perfoemances?.data.map(building => (
                        <SelectItem value={building.id} key={building.id}>
  
                            {building[currentLang] || building.ru}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={getQuery("authorityId") || "all"} onValueChange={(value) => handleChange("authorityId", value)}>
                <SelectTrigger className=' w-44'>
                    <SelectValue className='' placeholder="Authority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t('all-authority')}</SelectItem>
                    {authority?.data.map(building => (
                        <SelectItem value={building.id} key={building.id}>
                            {building[currentLang] || building.ru}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={getQuery("ownershipId") || "all"} onValueChange={(value) => handleChange("ownershipId", value)}>
                <SelectTrigger className=' w-44'>
                    <SelectValue className='' placeholder="Performance" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t('all-ownerships')}</SelectItem>
                    {owmership?.data.map(building => (
                        <SelectItem value={building.id} key={building.id}>
  
                            {building[currentLang] || building.ru}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}
