import { AddCatalogType, AddNoteType, DeleteAccountType, DeleteCatalogType, DeleteNoteType, EditCatalogType, EditNoteType, GetAllCatalogsType, GetAllNotesType,
    GetNoteType, LoginType, LogOutType, RegistrationType, SortNotesType } from "../store/state.types";
import { CatalogType, NoteType } from "../types/main.types";

export interface MainPropsType {
    notesForShow: NoteType[] | []
    catalogs: CatalogType[] | []
    getNote: GetNoteType
    getAllCatalogs: GetAllCatalogsType
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
    currentNote: NoteType
    getNote: GetNoteType
    addNote: AddNoteType
    editNote: EditNoteType
    deleteNote: DeleteNoteType
}

export interface CatalogsPropsType {
    catalogs: CatalogType[] | []
    addCatalog: AddCatalogType
    getAllCatalogs: GetAllCatalogsType
    editCatalog: EditCatalogType
    deleteCatalog: DeleteCatalogType
}

export interface ModalMessagePropsType { modalMessage: string }