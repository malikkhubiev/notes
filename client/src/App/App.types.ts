import { AddNoteType, DeleteAccountType, DeleteNoteType, EditNoteType, GetAllNotesType,
    GetNoteType, LoginType, LogOutType, RegistrationType, SortNotesType } from "../store/state.types";
import { NoteType } from "../types/main.types";

export interface MainPropsType {
    notesForShow: NoteType[] | []
    getNote: GetNoteType
    getAllNotes: GetAllNotesType
    sortNotes: SortNotesType
    deleteNote: DeleteNoteType
    logOut: LogOutType
    deleteAccount: DeleteAccountType
}

export interface AuthPropsType {
    login: LoginType
    registration: RegistrationType
}

export interface CheckNotePropsType {
    getNote: GetNoteType
    addNote: AddNoteType
    editNote: EditNoteType
    deleteNote: DeleteNoteType
}

export interface ModalPropsType { modalMessage: string }