export type Minister = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  en:string
  ru:string
  tk:string
};

export type MinisterPagionation = {
  data: Minister[];
  pageInfo: PageInfo;
};
