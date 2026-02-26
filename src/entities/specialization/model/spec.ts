export type Spec = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  en: string,
  ru: string,
  tk: string
};

export type SpecPagination = {
  list: Spec[];
  pageInfo: PageInfo;
};
