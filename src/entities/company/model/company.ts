export type Company = {
  id: string;
  name: string;
  cadasterCode: null | string;
  performance: {
    id: string;
    type: string;
  };
  ownership: {
    id: string;
    type: string;
  };
  authority: {
    id: string;
    type: string;
  };
  region: {
    id: string;
    type: string;
  };
  createdAt: string;
  updatedAt: null | string;
};

export type CompanyPagination = {
  data: Company[];
  pageInfo: PageInfo;
};
