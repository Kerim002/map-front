export type Folder = {
      id: string,
      name: string,
      path: string,
      isFolder: boolean,
      parentPath: string,
      url: null | string,
      locationId: string,
      size: number,
      mimeType: string,
      trashed:  boolean,
      createdAt: string,
      updatedAt: string
}


export type FolderPagionation = {
    data:Folder[],
    pageInfo:PageInfo
}