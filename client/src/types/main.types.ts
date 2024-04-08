export interface NoteType {
    id: number
    header: string
    body: string
    date: Date | string
    lastDate: Date
}
export interface CatalogType {
    id: number
    name: string
    updatedAt: string
    userId: number
}