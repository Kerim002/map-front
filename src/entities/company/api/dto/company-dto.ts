export type CompanyDto = {
  id: string;
  name: string;
  cadaster_code: null | string;
  performance: {
    id: string;
    type: string;
  } | null;
  ownership: {
    id: string;
    type: string;
  } | null;
  authority: {
    id: string;
    type: string;
  } | null;
  region: {
    id: string;
    type: string;
  } | null;
  created_at: string;
  updated_at: null | string;
  images: CompanyImageDto[] | null;
};

export type CompanyImageDto = {
  id: string;
  object_path: string;
  bucket_name: string;
  created_at: string;
};

export type CompanyPaginationDto = {
  data: CompanyDto[];
  page_info: PageInfoDto;
};
