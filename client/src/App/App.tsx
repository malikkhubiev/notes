import { observer } from 'mobx-react-lite'
import React, { FC, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CheckNote } from '../pages/CheckNote/CheckNote'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { ModalMessage } from '../components/ui/ModalMessage/ModalMessage'
import { Preloader } from '../components/ui/Preloader/Preloader'
import { Auth } from '../pages/Auth/Auth'
import { Main } from '../pages/Main/Main'
import state from '../store/state'
import { AuthPropsType, CatalogsPropsType, CheckNotePropsType, MainPropsType, ModalMessagePropsType } from './App.types'
import { Catalogs } from '../pages/Catalogs/Catalogs'

export const myContext = React.createContext(null)

export const App: FC<{}> = observer(() => {

  const mainProps: MainPropsType = {
    notesForShow: state.notesForShow,
    catalogs: state.catalogs,
    currentCatalog: state.currentCatalog,
    getNote: state.getNote,
    sendNote: state.sendNote,
    getAllCatalogs: state.getAllCatalogs,
    getAllNotes: state.getAllNotes,
    getNotesByCatalog: state.getNotesByCatalog,
    sortNotes: state.sortNotes,
    deleteNote: state.deleteNote,
    logOut: state.logOut,
    deleteAccount: state.deleteAccount
  }

  const authProps: AuthPropsType = {
    login: state.login,
    registration: state.registration
  }

  const checkNoteProps: CheckNotePropsType = {
    currentNote: state.currentNote,
    getNote: state.getNote,
    addNote: state.addNote,
    editNote: state.editNote,
    deleteNote: state.deleteNote
  }

  const catalogsProps: CatalogsPropsType = {
    catalogs: state.catalogs,
    addCatalog: state.addCatalog,
    getAllCatalogs: state.getAllCatalogs,
    editCatalog: state.editCatalog,
    deleteCatalog: state.deleteCatalog,
  }

  const modalMessageProps: ModalMessagePropsType = {
    modalMessage: state.modalMessage
  }

  useEffect(() => {
    state.getIsAuth()
  }, [])

  return <>
    {state.modalMessage ? <ModalMessage {...modalMessageProps} /> : ''}
    <HashRouter>
      <Routes>
        {state.isLoading
          ?
          <Route path='/' element={<Preloader />} />
          :
          <>{state.isAuth ?
            <>
              <Route path='' element={<Main {...mainProps} />} />
              <Route path='check:id' element={<ErrorBoundary><CheckNote {...checkNoteProps} /></ErrorBoundary>} />
              <Route path='catalogs' element={<Catalogs {...catalogsProps} />}/>
              <Route path='*' element={<Navigate to='' />} />
            </>
            :
            <Route path='/' element={<Auth {...authProps} />} />
          }</>
        }
      </Routes>
    </HashRouter>
  </>
})