import { NoteType } from "../types/main.types"

export interface AuthBaseResponse {
    userId: number
    token: string
}

export type RegistrationType = (name: string, password: string) => void
export type DeleteAccountType = (password: string) => void
export type LoginType = (name: string, password: string) => void
export type GetIsAuthType = () => void
export type LogOutType = () => void
export type GetNoteType = (id: number) => NoteType
export type GetAllNotesType = () => void
export type AddNoteType = (header: string, body: string, date: Date, lastDate: Date) => void
export type DeleteNoteType = (id: number) => void
export type EditNoteType = (id: number, header: string, body: string, lastDate: Date) => void
export type SortNotesType = (value: string) => void

export interface getAllNotesResponseType {
    count: number
    rows: NoteType[]
}