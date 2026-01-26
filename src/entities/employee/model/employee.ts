
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
      surname:string
      location: {
        id: string,
        name: string,
        address: string
      },
      order:number
      folder:{
        id:string,
        name:string,
        path:string
      } | null
}


export type EmployeePagination = {
    data:Employee[],
    pageInfo:PageInfo
}