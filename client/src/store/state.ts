import { makeAutoObservable } from 'mobx'
import { $authHost, $host } from '../http/index'
import { CatalogType, NoteType } from '../types/main.types'
import { AddCatalogType, AddNoteType, AuthBaseResponse, DeleteAccountType, DeleteCatalogType, DeleteNoteType, EditCatalogType, EditNoteType, getAllCatalogsResponseType, GetAllCatalogsType, getAllNotesResponseType, GetAllNotesType, GetIsAuthType, GetNotesByCatalogType, getNotesByCatalogTypeResponseType, GetNoteType, LoginType, LogOutType, RegistrationType, SendNoteType, SortNotesType } from './state.types'

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
                const year = `${dateInDateType.getFullYear()}`.slice(2)
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

    notes: any = {
        "Without catalog": []
    }
    notesForShow: NoteType[] | [] = []
    currentNote: NoteType
    numberOfNotes: number = 0
    limit: number = 8
    offset: number = -8

    numberOfCatalogs: number = 0
    catalogs: CatalogType[] | [] = []
    mainCatalogId: number | null = null 
    currentCatalog: CatalogType = {
        name: "Without catalog",
        id: null,
        updatedAt: null,
        userId: null,
    }

    constructor() {
        makeAutoObservable(this)
    }

    // Auth Actions
    registration: RegistrationType = async (name, password) => {
        try {
            const response = await $host.post('/auth/registration', { name, password })
            modalCalling(response.data.message)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    deleteAccount: DeleteAccountType = async (password) => {
        try {
            await $host.delete(`/auth/deleteAccount/:${this.userId}/:${password}`)
            localStorage.removeItem('token')
            this.userId = null
            this.notes = {}
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
            const { userId, token, mainCatalogId } = response.data
            this.userId = userId
            this.mainCatalogId = mainCatalogId
            this.currentCatalog.id = mainCatalogId
            generalInLogout.call(this, token)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    getIsAuth: GetIsAuthType = async () => {
        try {
            const response = await $authHost.get<AuthBaseResponse>('/auth/auth')
            const { userId, token, mainCatalogId } = response.data
            this.userId = userId
            generalInLogout.call(this, token)
            this.mainCatalogId = mainCatalogId
            this.currentCatalog.id = mainCatalogId
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
        this.notesForShow.forEach((el: NoteType) => {
            if (el.id === id) note = el
        })
        return note
    }

    getAllNotes: GetAllNotesType = async (loadMore) => {
        try {
            if (this.numberOfNotes < this.offset) return
            if (loadMore)
                this.offset += this.limit
            const response = await $authHost.get<getAllNotesResponseType>(`/note/:${this.limit}/:${this.offset}`)
            this.numberOfNotes = response.data.count
            const formattedNotes = DateFormatting(response.data.rows)
            const notesToSave: any = {}
            if (formattedNotes.length) {
                formattedNotes.forEach((note: any) => {
                    const catalogName = note["catalog"].name
                    if (notesToSave[catalogName]) {
                        notesToSave[catalogName].push(note)
                    } else {
                        notesToSave[catalogName] = [note]
                    }
                })
                this.notes = {...this.notes, ...notesToSave}
                this.notesForShow = this.notes[this.currentCatalog.name]
            }
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    getNotesByCatalog: GetNotesByCatalogType = async (catalogName) => {
        try {
            if (!this.notes[catalogName]) {
                this.notes[catalogName] = []
            }
            this.catalogs.forEach((catalog: any) => {
                if (catalog.name === catalogName) {
                    this.currentCatalog = catalog
                }
            })
            this.notesForShow = this.notes[catalogName]
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    addNote: AddNoteType = async (header, body, date, lastDate, color) => {
        try {
            const response = await $authHost.post<NoteType>('/note/', {
                header, body, date, lastDate, color, catalogId: this.currentCatalog.id
            })
            const formattedData = DateFormatting([response.data])[0]
            this.numberOfNotes++
            this.offset++

            this.notes[this.currentCatalog.name].unshift(formattedData as never)
            this.notesForShow = this.notes[this.currentCatalog.name]
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    sendNote: SendNoteType = async (targetNote, catalogId) => {
        try {
            if (catalogId === targetNote.catalog.id) return
            const response = await $authHost.put<NoteType>('/note/send', {
                id: targetNote.id, catalogId
            })
            const formattedData = DateFormatting([response.data])[0]
            this.notes[targetNote.catalog.name] = this.notes[targetNote.catalog.name].filter(
                (note:NoteType) => note.id !== targetNote.id
            )
            this.notes[formattedData.catalog.name].unshift(formattedData)
            this.notesForShow = this.notes[this.currentCatalog.name]
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    deleteNote: DeleteNoteType = async (id) => {
        try {
            await $authHost.delete(`/note/:${id}`)
            this.notes[this.currentCatalog.name].forEach(
                (note: NoteType, ind: number) =>
                    note.id === id && this.notes[this.currentCatalog.name].splice(ind, 1)
            )
            this.notesForShow = this.notes[this.currentCatalog.name]
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
            this.notes[this.currentCatalog.name].forEach(
                (note: NoteType, ind: number) =>
                    note.id === editedNote.id && this.notes[this.currentCatalog.name].splice(ind, 1)
            )
            const formattedNote = DateFormatting([editedNote])
            this.notes[this.currentCatalog.name] = [...formattedNote, ...this.notes[this.currentCatalog.name]]
            this.notesForShow = this.notes[this.currentCatalog.name]
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    sortNotes: SortNotesType = async (value) => {
        if (value.trim() === '') {
            this.notesForShow = []
            this.offset = -8
            this.numberOfNotes = 0
            return this.getAllNotes()
        }
        const response = await $authHost.get(`/note/:${this.numberOfNotes}/:${0}`)
        const formattedNotes = DateFormatting(response.data.rows)
        const sortedNotes: NoteType[] = formattedNotes.filter((note) => note.header.toLowerCase().includes(value.toLowerCase()))
        this.notesForShow = sortedNotes
    }

    // Catalog Actions
    getAllCatalogs: GetAllCatalogsType = async () => {
        try {
            const response = await $authHost.get<getAllCatalogsResponseType>(`/catalog/`)
            this.numberOfCatalogs = response.data.count
            this.catalogs = DateFormatting(response.data.rows)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    addCatalog: AddCatalogType = async (name) => {
        try {
            const response = await $authHost.post<CatalogType>('/catalog/', {
                name
            })
            const newCatalog = DateFormatting([response.data])[0]
            this.notes[newCatalog.name] = []
            this.catalogs.unshift(newCatalog as never)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    deleteCatalog: DeleteCatalogType = async (id) => {
        try {
            await $authHost.delete(`/catalog/:${id}`)
            let catalogName: string = ""
            this.catalogs = this.catalogs.filter((item: any) => {
                if (item.id === id) catalogName = item.name
                return item.id !== id
            })
            this.notes[catalogName] = []
            if (catalogName === this.currentCatalog.name) {
                this.currentCatalog.id = this.mainCatalogId 
                this.currentCatalog.name = "Without catalog" 
            }
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    editCatalog: EditCatalogType = async (id, name) => {
        try {
            const response = await $authHost.put<NoteType>('/catalog/editName', {
                id, name
            });
            const editedCatalog = DateFormatting([response.data])[0]
            this.catalogs = this.catalogs.map(
                (item: any) => {
                    if (item.id === id) {
                        this.notes[name] = this.notes[item.name]
                        delete this.notes[item.name]
                        return editedCatalog    
                    }else{
                        return item
                    }
                }
            )
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }
}

const state = new State()
export default state