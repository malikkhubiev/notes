export interface NoteType {
    id: number
    header: string
    body: string
    date: Date | string
    color: string
    lastDate: Date
    catalog: CatalogType
}
export interface CatalogType {
    id: number
    name: string
    updatedAt: string
    userId: number
}