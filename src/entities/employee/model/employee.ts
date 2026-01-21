
export type Employee =    {
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      avatarUrl: null | string,
      phone: string,
      position: string,
      createdAt: string,
      updatedAt: string,
      location: {
        id: string,
        name: string,
        address: string
      },
      order:number
}


export type EmployeePagination = {
    data:Employee[],
    pageInfo:PageInfo
}