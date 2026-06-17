export type DashboardOverviewDto = {data: {
    total_locations: number,
    total_employees: number,
    total_items: number,
    total_buildings: number,
    total_regions: number,
    total_companies: number,
    total_authorities: number,
    total_ownerships: number,
    total_performances: number,
    total_area_sqm: number
}}

// 

export type LocationsByCategoryDto = {
    data: {by_region: LocationCategoryItemDto[],
    by_building: LocationCategoryItemDto[],
    by_authority: LocationCategoryItemDto[],
    by_ownership: LocationCategoryItemDto[],
    by_performance: LocationCategoryItemDto[]}
}

export type LocationCategoryItemDto = {
    id: string,
    name: string,
    count: number
}

// 

export type DashboardStorageDto = {
    
    data: {
        total_files: number,
            total_folders: number,
                total_size_bytes: number
    }
}

//

export type DashboardLocationsChartDto = {
    data: {
        date: string,
        count: string
    }[]
}