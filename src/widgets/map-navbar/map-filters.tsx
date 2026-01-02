import { buildingApi } from '@/entities/building/api/building.api'
import { companyApi } from '@/entities/company/api/company.api'
import { regionApi } from '@/entities/region'
import useQueryParam from '@/shared/hooks/use-query-param'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useQuery } from '@tanstack/react-query'

export const MapFilters = () => {
    const { data: regions } = useQuery(regionApi.list({ limit: 20, page: 1 }))
    const { data: buildings } = useQuery(buildingApi.list({ limit: 20, page: 1 }))
    const {data:companies} = useQuery(companyApi.list({limit:20, page:1}))
    const { deleteQuery, getQuery, setQuery } = useQueryParam()


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
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions?.list.map(region => (
                        <SelectItem value={region.id} key={region.id}>{region.type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={getQuery("buildingId") || "all"} onValueChange={(value) => handleChange("buildingId", value)}>
                <SelectTrigger className=' w-56'>
                    <SelectValue className='' placeholder="Building" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Buildings</SelectItem>
                    {buildings?.data.map(building => (
                        <SelectItem value={building.id} key={building.id}>{building.type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={getQuery("companyId") || "all"} onValueChange={(value) => handleChange("companyId", value)}>
                <SelectTrigger className=' w-56'>
                    <SelectValue className='' placeholder="Building" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies?.data.map(company => (
                        <SelectItem value={company.id} key={company.id}>{company.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
