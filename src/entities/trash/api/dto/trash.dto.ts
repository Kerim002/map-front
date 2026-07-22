export type TrashDto = {
    entity: string,
    id: string,
    label: string,
    deleted_at: string,
    expires_at: string,
    restorable: boolean
    preview_url?:string
}