import { CatalogType, NoteType } from "../types/main.types"

export interface AuthBaseResponse {
    userId: number
    token: string
    mainCatalogId: number
}

export type RegistrationType = (name: string, password: string) => void
export type DeleteAccountType = (password: string) => void
export type LoginType = (name: string, password: string) => void
export type GetIsAuthType = () => void
export type LogOutType = () => void

export type GetNoteType = (id: number) => any
export type GetAllNotesType = (loadMore?: boolean) => any
export type GetNotesByCatalogType = (catalogName: string) => void
export type AddNoteType = (header: string, body: string, date: Date, lastDate: Date, color: string) => void
export type SendNoteType = (targetNote: NoteType, catalogId: number) => void
export type DeleteNoteType = (id: number) => void
export type EditNoteType = (id: number, header: string, body: string, lastDate: Date) => void
export type SortNotesType = (value: string) => void

export interface getAllNotesResponseType {
    count: number
    rows: NoteType[]
}

export interface getNotesByCatalogTypeResponseType {
    count: number
    rows: NoteType[]
}


export type GetAllCatalogsType = () => any
export type AddCatalogType = (name: string) => void
export type DeleteCatalogType = (id: number) => void
export type EditCatalogType = (id: number, name: string) => void

export interface getAllCatalogsResponseType {
    count: number
    rows: CatalogType[]
}