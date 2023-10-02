import { observer } from 'mobx-react-lite'
import React, { FC, useEffect } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { CheckNote } from '../components/CheckNote/CheckNote'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Modal } from '../components/ui/Modal/Modal'
import { Preloader } from '../components/ui/Preloader/Preloader'
import { Auth } from '../pages/Auth/Auth'
import { Main } from '../pages/Main/Main'
import state from '../store/state'
import { AuthPropsType, CheckNotePropsType, MainPropsType, ModalPropsType } from './App.types'

export const myContext = React.createContext(null)

export const App: FC<{}> = observer(() => {

  const mainProps: MainPropsType = {
    notesForShow: state.notesForShow,
    getNote: state.getNote,
    getAllNotes: state.getAllNotes,
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
    getNote: state.getNote,
    addNote: state.addNote,
    editNote: state.editNote,
    deleteNote: state.deleteNote
  }

  const modalProps: ModalPropsType = {
    modalMessage: state.modalMessage
  }

  useEffect(() => {
    state.getIsAuth()
  }, [])

  return <>
    {state.modalMessage ? <Modal {...modalProps} /> : ''}
    <Router>
      <Routes>
        {state.isLoading
          ?
          <Route path='/' element={<Preloader />} />
          :
          <>{state.isAuth ?
            <>
              <Route path='' element={<Main {...mainProps} />} />
              <Route path='check:id' element={<ErrorBoundary><CheckNote {...checkNoteProps} /></ErrorBoundary>} />
              <Route path='*' element={<Navigate to='' />} />
            </>
            :
            <Route path='/' element={<Auth {...authProps} />} />
          }</>
        }
      </Routes>
    </Router>
  </>
})