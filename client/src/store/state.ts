import { makeAutoObservable } from 'mobx'
import { $authHost, $host } from '../http/index'
import { NoteType } from '../types/main.types'
import { AddNoteType, AuthBaseResponse, DeleteAccountType, DeleteNoteType, EditNoteType, getAllNotesResponseType, GetAllNotesType, GetIsAuthType, GetNoteType, LoginType, LogOutType, RegistrationType, SortNotesType } from './state.types'

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

export const DateFormatting = (notes: NoteType[]):NoteType[] => {
    notes.forEach(note => {
        const dateInDateType = new Date(note.date)
        const day = dateInDateType.getDate() < 10 ? '0' + dateInDateType.getDate() : dateInDateType.getDate() 
        const month = dateInDateType.getMonth() < 10 ? '0' + (dateInDateType.getMonth() + 1) : dateInDateType.getMonth() + 1
        const year = dateInDateType.getFullYear()
        note.date = `${day}.${month}.${year}`
    })
    return notes
}

class State {

    limit:number = 8

    offset:number = -8

    numberOfNotes:number = 0

    modalMessage: string = ''

    isLoading: boolean = true

    userId: null | number = null

    isAuth: boolean = false

    notes: NoteType[] | [] = []

    notesForShow: NoteType[] | [] = []

    constructor() {
        makeAutoObservable(this)
    }

    // Auth Actions
    registration:RegistrationType = async (name, password) => {
        try {
            const response = await $host.post('/auth/registration', { name, password })
            modalCalling(response.data.message)
        } catch (e) {
            console.log(e)
            modalCalling(e.response.data.message)
        }
    }

    deleteAccount:DeleteAccountType = async (password) => {
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

    login:LoginType = async (name, password) => {
        try {
            const response = await $host.post<AuthBaseResponse>('/auth/login', { name, password })
            const {userId, token} = response.data
            this.userId = userId
            generalInLogout.call(this, token)
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    getIsAuth:GetIsAuthType = async () => {
        try {
            const response = await $authHost.get<AuthBaseResponse>('/auth/auth')
            const {userId, token} = response.data
            this.userId = userId
            generalInLogout.call(this, token)
            this.isLoading = false 
        } catch (e) {
            this.isLoading = false
        }
    }

    logOut:LogOutType = () => {
        localStorage.removeItem('token')
        this.isAuth = false
    }

    // Notes Actions
    getNote:GetNoteType = (id) => {
        let note
        this.notes.forEach((el:NoteType) => {
            if (el.id === id) note = el
        })
        return note
    }

    getAllNotes:GetAllNotesType = async() => {
        try {
            if (this.numberOfNotes < this.offset) return
            this.offset+=this.limit
            const response = await $host.get<getAllNotesResponseType>(`/note/:${this.userId}/:${this.limit}/:${this.offset}`)
            this.numberOfNotes = response.data.count
            this.notes = [...this.notes, ...DateFormatting(response.data.rows)]
            this.notesForShow = this.notes
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    addNote:AddNoteType = async (header, body, date, lastDate) => {
        try {
            const response = await $host.post<NoteType>('/note/', {
                header, body, date, lastDate, userId: this.userId
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

    deleteNote:DeleteNoteType = async (id) => {
        try {
            await $host.delete(`/note/:${id}`)
            this.notes.forEach((note:NoteType, ind: number) => note.id === id && this.notes.splice(ind, 1))
            this.notesForShow = this.notes
            this.numberOfNotes--
            this.offset--
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    editNote:EditNoteType = async (id, header, body, lastDate) => {
        try {
            const response = await $host.put<NoteType>('/note/edit', {
                id, header, body, lastDate
            })
            const editedNote:NoteType = response.data
            this.notes.forEach((note: NoteType, ind: number) => note.id === editedNote.id && this.notes.splice(ind, 1))
            const formattedNote = DateFormatting([editedNote])
            this.notes = [...formattedNote, ...this.notes]
            this.notesForShow = this.notes           
        } catch (e) {
            modalCalling(e.response.data.message)
        }
    }

    sortNotes:SortNotesType = async(value) => {
        if (value.trim() === '') {
            this.notes = []
            this.notesForShow = this.notes
            this.offset = -8
            this.numberOfNotes = 0
            return this.getAllNotes()
        }
        const response = await $host.get(`/note/:${this.userId}/:${this.numberOfNotes}/:${0}`)
        const formattedNotes = DateFormatting(response.data.rows)
        const sortedNotes: NoteType[] = formattedNotes.filter((note)=>note.header.toLowerCase().includes(value.toLowerCase()))
        this.notes = sortedNotes
        this.notesForShow = this.notes
    }
}

const state = new State()
export default state