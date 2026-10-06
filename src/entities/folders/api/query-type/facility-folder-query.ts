export type FacilityFolderQuery = {
    page:number,
    limit:number,
    path?:string,
    location_id:string
    order_by?: string
    sort_by?: "asc" | "desc"
}