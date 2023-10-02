import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MainPropsType } from '../../App/App.types'
import logo from '../../assets/logo.svg'
import searchIcon from '../../assets/search.png'
import { NoteType } from '../../types/main.types'
import styles from './Main.less'
import { FooterPropsType } from './Main.types'
import { Footer } from '../../components/Footer/Footer'
import { Note } from '../../components/Note/Note'

export const Main: FC<MainPropsType> = observer(({ notesForShow,
    getAllNotes, sortNotes, deleteNote, logOut, deleteAccount }) => {

    const notes: NoteType[] | [] = notesForShow
    const [searchValue, setSearchValue] = useState<string>('')
    const [isNeedInButton, setIsNeedInButton] = useState<boolean>(true)

    useEffect(() => {
        getAllNotes()
    })

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
        deleteAccount,
        outButtonStyle: styles.outButton,
        addButtonStyle: styles.addButton
    }

    return (
        <div className={styles.main}>
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
                                placeholder="Enter the header of the note"
                                type="text"
                                className={styles.search}
                            />
                        </div>
                        <div className={styles.headerBox}>
                            <button 
                                className={styles.logout} 
                                onClick={logOut}
                            ><span>log</span><span>out</span></button>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <NavLink
                            className={styles.addButton}
                            to={`/check:${0}`}
                        >+</NavLink>
                        <div className={styles.notes}>
                            {
                                notes.length
                                    ?
                                notes.map(note => <Note key={note.id} {...note} deleteNote={deleteNote} />)
                                    :
                                "You don't have any notes yet"
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    {
                        isNeedInButton &&
                        <button
                            onClick={getAllNotes}
                            className={styles.showMore}
                        >...</button>
                    }
                    <Footer { ...footerProps } />
                </div>
            </div>
        </div>
    )
})