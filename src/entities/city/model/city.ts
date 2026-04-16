export type City = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  en: string,
  ru: string,
  tk: string
};

export type CityPagination = {
  list: City[];
  pageInfo: PageInfo;
};
