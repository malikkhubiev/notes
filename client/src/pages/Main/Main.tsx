import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MainPropsType } from '../../App/App.types'
import logo from '../../assets/logo.svg'
import searchIcon from '../../assets/search.png'
import { Footer } from '../../components/Footer/Footer'
import { Note } from '../../components/Note/Note'
import { AddButton } from '../../components/ui/AddButton/AddButton'
import { NoteType } from '../../types/main.types'
import styles from './Main.less'
import { FooterPropsType } from './Main.types'
import { ModalList } from '../../components/ui/ModalKit/ModalList/ModalList'
import catalog from '../../assets/catalog.png'

export const Main: FC<MainPropsType> = observer(({ notesForShow, sendNote,
    getAllCatalogs, getAllNotes, sortNotes, getNotesByCatalog,
    deleteNote, logOut, deleteAccount, catalogs, currentCatalog }) => {

    const notes: NoteType[] | [] = notesForShow
    const [searchValue, setSearchValue] = useState<string>('')
    const [isNeedInButton, setIsNeedInButton] = useState<boolean>(true)

    let [choosedNote, setChoosedNote] = useState<NoteType | null>(null)
    let [openModalList, setOpenModalList] = useState<boolean>(false)

    useEffect(() => {
        getAllCatalogs()
        getAllNotes()
    }, [])

    let timerForSearch: ReturnType<typeof setTimeout>

    const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
        clearTimeout(timerForSearch)
        timerForSearch = setTimeout(() => { sortNotes(e.target.value) }, 1000)
        setSearchValue((prev: string) => prev = e.target.value)
        if (e.target.value.trim() !== '') setIsNeedInButton(false)
        else setIsNeedInButton(true)
    }

    const searchReset = () => {
        setSearchValue(prev => prev = '')
    }

    const footerProps: FooterPropsType = {
        deleteAccount
    }

    const chooseCatalog = (name: string) => {
        getNotesByCatalog(name)
    }

    const modalOnChooseHandler = (id: number) => {
        setOpenModalList(prev => prev = false)
        sendNote(choosedNote, id)
    }

    const modalOnCloseHandler = () => {
        setOpenModalList(prev => prev = false)
    }

    const sendNoteHandler = (id: number) => {
        notes.forEach((note: NoteType) => {
            if (note.id === id) {
                setChoosedNote(prev => prev = note)
            }
        })
        setOpenModalList(prev => prev = true)
    }

    return (
        <div className={styles.main}>
            {openModalList &&
                <ModalList
                    message="Select the target catalog"
                    list={catalogs}
                    onOkHandler={modalOnChooseHandler}
                    onCancelHandler={modalOnCloseHandler}
                />}
            <div className={styles.container}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <div className={styles.headerBox}>
                            <img src={logo} className={styles.logo} />
                        </div>
                        <div className={styles.headerBox}>
                            <img src={searchIcon} className={styles.searchIcon} />
                            <input
                                onChange={search}
                                onBlur={searchReset}
                                value={searchValue}
                                placeholder="Search..."
                                type="text"
                                className={styles.search}
                            />
                        </div>
                        <div className={styles.headerBox}>
                            <button
                                className={styles.logout}
                                onClick={logOut}
                                data-testid="logout-button"
                            ><span>log</span><span>out</span></button>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.catalogs}>
                            <span className={styles.catalogs_text}>Catalogs:</span>
                            <div className={styles.catalogs_line}>
                                {
                                    catalogs.length
                                    &&
                                    catalogs.slice().reverse().map(catalog =>
                                        <button
                                            className={
                                                catalog.name === currentCatalog?.name ?
                                                    styles.currentCatalog : styles.catalog
                                            }
                                            key={catalog.id}
                                            onClick={() => chooseCatalog(catalog.name)}
                                        >
                                            {catalog.name}
                                        </button>
                                    )
                                }
                            </div>
                            <NavLink
                                to="catalogs"
                                className={styles.catalogs_button}
                            >
                                <img
                                    src={catalog}
                                    className={styles.catalog_icon}
                                />
                            </NavLink>
                        </div>
                        <AddButton path={`/check:${0}`} />
                        <div className={styles.notes}>
                            {
                                notes.length
                                    ?
                                    notes.map(note =>
                                        <Note
                                            key={note.id}
                                            {...note}
                                            deleteNote={deleteNote}
                                            onSendNote={sendNoteHandler}
                                        />
                                    )
                                    :
                                    <span className={styles.no_notes}>
                                        You don't have any notes yet
                                    </span>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    {
                        isNeedInButton &&
                        <button
                            onClick={() => getAllNotes(true)}
                            className={styles.showMore}
                        >...</button>
                    }
                    <Footer {...footerProps} />
                </div>
            </div>
        </div>
    )
})