export type DashboardOverview = {
  totalLocations: number;
  totalEmployees: number;
  totalItems: number;
  totalBuildings: number;
  totalRegions: number;
  totalCompanies: number;
  totalAuthorities: number;
  totalOwnerships: number;
  totalPerformances: number;
  totalAreaSqm: number;
}

//

export type LocationsByCategory = {
  byRegion: LocationCategoryItem[];
  byBuilding: LocationCategoryItem[];
  byAuthority: LocationCategoryItem[];
  byOwnership: LocationCategoryItem[];
  byPerformance: LocationCategoryItem[];
}

export type LocationCategoryItem = {
    id: string,
    name: string,
    count: number
} 


//

export type DashboardStorage = {
  totalFiles: number;
  totalFolders: number;
  totalSizeBytes: number;
}


//

