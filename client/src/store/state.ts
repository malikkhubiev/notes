import { makeAutoObservable } from 'mobx'
import { $authHost, $host } from '../http/index'
import { CatalogType, NoteType } from '../types/main.types'
import { AddCatalogType, AddNoteType, AuthBaseResponse, DeleteAccountType, DeleteCatalogType, DeleteNoteType, EditCatalogType, EditNoteType, getAllCatalogsResponseType, GetAllCatalogsType, getAllNotesResponseType, GetAllNotesType, GetIsAuthType, GetNotesByCatalogType, getNotesByCatalogTypeResponseType, GetNoteType, LoginType, LogOutType, RegistrationType, SortNotesType } from './state.types'

export const modalCalling = (message: string) => {
    state.modalMessage = message
    setTimeout(() => state.modalMessage = '', 2500)
}

export const generalInLogout = (token: string) => {
    if (typeof token !== 'string') {
        throw new TypeError('Token must be a string');
    }
    localStorage.setItem('token', token)
    state.isAuth = true
}

export const DateFormatting = (items: any[]): any[] => {
    items.forEach(item => {
        const dateParams = ["date", "lastDate", "updatedAt"];
        dateParams.forEach((param: string) => {
            if (param) {
                const dateInDateType = new Date(item[param])
                const day = dateInDateType.getDate() < 10 ? '0' + dateInDateType.getDate() : dateInDateType.getDate()
                const month = dateInDateType.getMonth() < 10 ? '0' + (dateInDateType.getMonth() + 1) : dateInDateType.getMonth() + 1
                const year = dateInDateType.getFullYear()
                // @ts-ignore
                item[param] = `${day}.${month}.${year}`
            }
        })
    })
    return items
}

class State {
    modalMessage: string = ''
    isLoading: boolean = true

    userId: null | number = null
    isAuth: boolean = false

    notes: NoteType[] | [] = []
    notesForShow: NoteType[] | [] = []
    currentNote: NoteType
    numberOfNotes: number = 0
    limit: number = 8
    offset: number = -8

    numberOfCatalogs: number = 0
    catalogs: CatalogType[] | [] = [] // changeType
    currentCatalog: CatalogType | null = null // changeType mb

    constructor() {
        makeAutoObservable(this)
    }

    // Auth Actions
    registration: RegistrationType = async (name, password) => {
        try {
            const response = await $host.post('/auth/registration', { name, password })
            modalCalling(response.data.message)
        } catch (e) {
            console.log(e)
            modalCalling(e.response.data.message)
        }
    }

    deleteAccount: DeleteAccountType = async (password) => {
        try {
            await $host.delete(`/auth/deleteAccount/:${this.userId}/:${password}`)
            localStorage.removeItem('token')
            this.userId = null
            this.notes = []
            this.notesForShow = []
            this.isAuth = false
            setTimeout(() => modalCalling.call(this, 'Your account has been successfully deleted'), 10)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    login: LoginType = async (name, password) => {
        try {
            const response = await $host.post<AuthBaseResponse>('/auth/login', { name, password })
            const { userId, token } = response.data
            this.userId = userId
            generalInLogout.call(this, token)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    getIsAuth: GetIsAuthType = async () => {
        try {
            const response = await $authHost.get<AuthBaseResponse>('/auth/auth')
            const { userId, token } = response.data
            this.userId = userId
            generalInLogout.call(this, token)
            this.isLoading = false
        } catch (e) {
            this.isLoading = false
        }
    }

    logOut: LogOutType = () => {
        localStorage.removeItem('token')
        this.isAuth = false
    }

    // Notes Actions
    getNote: GetNoteType = (id) => {
        let note
        this.notes.forEach((el: NoteType) => {
            if (el.id === id) note = el
        })
        return note
    }

    getAllNotes: GetAllNotesType = async () => {
        try {
            if (this.numberOfNotes < this.offset) return
            this.offset += this.limit
            const response = await $authHost.get<getAllNotesResponseType>(`/note/:${this.limit}/:${this.offset}`)
            this.numberOfNotes = response.data.count
            this.notes = [...this.notes, ...DateFormatting(response.data.rows)]
            this.notesForShow = this.notes
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    getNotesByCatalog: GetNotesByCatalogType = async (id) => {
        try {
            if (this.numberOfNotes < this.offset) return
            this.offset += this.limit
            const response = await $authHost.get<getNotesByCatalogTypeResponseType>(`/note/${id}/:${this.limit}/:${this.offset}`)
            this.numberOfNotes = response.data.count
            this.notes = [...this.notes, ...DateFormatting(response.data.rows)]
            this.notesForShow = this.notes
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    addNote: AddNoteType = async (header, body, date, lastDate, color) => {
        try {
            const response = await $authHost.post<NoteType>('/note/', {
                header, body, date, lastDate, color, catalogId: this.currentCatalog
            })
            const formattedData = DateFormatting([response.data])[0]
            this.numberOfNotes++
            this.offset++
            this.notes.unshift(formattedData as never)
            this.notesForShow = this.notes
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    deleteNote: DeleteNoteType = async (id) => {
        try {
            await $authHost.delete(`/note/:${id}`)
            this.notes.forEach((note: NoteType, ind: number) => note.id === id && this.notes.splice(ind, 1))
            this.notesForShow = this.notes
            this.numberOfNotes--
            this.offset--
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    editNote: EditNoteType = async (id, header, body, lastDate) => {
        try {
            const response = await $authHost.put<NoteType>('/note/edit', {
                id, header, body, lastDate
            })
            const editedNote: NoteType = response.data
            this.notes.forEach((note: NoteType, ind: number) => note.id === editedNote.id && this.notes.splice(ind, 1))
            const formattedNote = DateFormatting([editedNote])
            this.notes = [...formattedNote, ...this.notes]
            this.notesForShow = this.notes
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    sortNotes: SortNotesType = async (value) => {
        if (value.trim() === '') {
            this.notes = []
            this.notesForShow = this.notes
            this.offset = -8
            this.numberOfNotes = 0
            return this.getAllNotes()
        }
        const response = await $authHost.get(`/note/:${this.numberOfNotes}/:${0}`)
        const formattedNotes = DateFormatting(response.data.rows)
        const sortedNotes: NoteType[] = formattedNotes.filter((note) => note.header.toLowerCase().includes(value.toLowerCase()))
        this.notes = sortedNotes
        this.notesForShow = this.notes
    }

    // Catalog Actions
    getAllCatalogs: GetAllCatalogsType = async () => { // changeType
        try {
            const response = await $authHost.get<getAllCatalogsResponseType>(`/catalog/`) // changeType
            this.numberOfCatalogs = response.data.count
            this.catalogs = DateFormatting(response.data.rows)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    addCatalog: AddCatalogType = async (name) => { // changeType
        try {
            const response = await $authHost.post<CatalogType>('/catalog/', { // changeType
                name
            })
            const newCatalog = DateFormatting([response.data])[0]
            this.catalogs.unshift(newCatalog as never)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    deleteCatalog: DeleteCatalogType = async (id) => {// changeType
        try {
            await $authHost.delete(`/catalog/:${id}`)
            this.catalogs = this.catalogs.filter((item: any) => item.id !== id) // changeType 
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    editCatalog: EditCatalogType = async (id, name) => {// changeType
        try {
            const response = await $authHost.put<NoteType>('/catalog/editName', { // changeType
                id, name
            });
            const editedCatalog = DateFormatting([response.data])[0]
            this.catalogs = this.catalogs.map(
                (item: any) => item.id === id ? editedCatalog : item // changeType
            )
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }
}

const state = new State()
export default state