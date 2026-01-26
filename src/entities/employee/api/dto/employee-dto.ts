
export type EmployeeDto = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  avatar_url: null | string,
  phone: string,
  position: string,
  created_at: string,
  updated_at: string,
  surname: string
  location: {
    id: string,
    name: string,
    address: string
  },
  order: number,
  folder: {
    id: string,
    name: string,
    path: string
  } | null

}


export type EmployeePaginationDto = {
  data: EmployeeDto[],
  page_info: PageInfoDto
}