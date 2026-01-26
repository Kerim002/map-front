export type FolderDto = {
      id: string,
      name: string,
      path: string,
      is_folder: boolean,
      parent_path: string,
      url: null | string,
      location_id: string,
      size: number,
      mime_type: string,
      trashed:  boolean,
      created_at: string,
      updated_at: string
      
}


export type FolderPaginationDto = {
    data:FolderDto[],
    page_info:PageInfoDto
}