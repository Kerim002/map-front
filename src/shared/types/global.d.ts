interface PageInfoDto {
  has_next_page: boolean;
  has_previous_page: boolean;
  total_pages: number;
  page: number;
  limit: number;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  page: number;
  limit: number;
}

interface PageBaseQuery {
  limit: number;
  page: number;
  search?: string;
  order_by?: string;
  sort_by?: "asc" | "desc";
}

interface Geom {
  lat: number;
  lng: number;
}

