import React, { FC, memo, useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { CheckNotePropsType } from '../../App/App.types'
import styles from './CheckNote.less'

export const CheckNote: FC<CheckNotePropsType> = memo((
    { getNote, addNote, editNote, deleteNote }) => {

    const maxSizeOfHeader = 5000
    const maxSizeOfBody = 95000

    const isAddButton: boolean = useLocation().pathname === '/check:0'
    const noteId: number = +useParams().id.slice(1)

    const note = getNote(noteId)

    let [color, setColor] = useState<string>(!isAddButton ? note.color : '#ffffff')
    let [header, setHeader] = useState<string>(!isAddButton ? note.header : '')
    let [body, setBody] = useState<string>(!isAddButton ? note.body : '')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const whenLeaving = () => {

        header = header.trim()
        body = body.trim()

        if (header.length > maxSizeOfHeader) header = header.slice(0, maxSizeOfHeader)
        if (body.length > maxSizeOfBody) body = body.slice(0, maxSizeOfBody)

        if (isAddButton) {
            if (header === '' && body === '') return
            const date = new Date()
            return addNote(header, body, date, date, color)
        }
        if (header === note.header && body === note.body) return
        if (header === '' && body === '') return deleteNote(note.id)
        const lastDate = new Date()
        editNote(note.id, header, body, lastDate)
    }

    const headerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(prev => prev = e.target.value)
    }

    const bodyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(prev => prev = e.target.value)
    }

    const changeColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(prev => prev = e.target.value)
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.top}>
                        <NavLink
                            to='/'
                            className={styles.top_text_square}
                        >&#10006;</NavLink>
                        <p className={styles.top_text}>{!isAddButton ? note.date : ''}</p>
                        <NavLink
                            onClick={whenLeaving}
                            to='/'
                            className={styles.top_text_square}
                        >&#10004;</NavLink>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.fieldContainer}>
                            <input
                                onChange={changeColorHandler}
                                value={color}
                                type="color"
                                className={styles.color}
                            />
                            <span className={styles.counter}>
                                {
                                    header.length > maxSizeOfHeader
                                        ?
                                        'Part of the text will be cut off'
                                        :
                                        `${maxSizeOfHeader - header.length} letters left`
                                }
                            </span>
                            <input
                                value={header}
                                onChange={headerHandler}
                                placeholder="Note's header..."
                                className={`${styles.header} ${styles.field}`}
                            />
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.counter}>
                                {
                                    body.length > maxSizeOfBody
                                        ?
                                        'Part of the text will be cut off'
                                        :
                                        `${maxSizeOfBody - body.length} letters left`
                                }
                            </span>
                            <textarea
                                value={body}
                                onChange={bodyHandler}
                                placeholder="Note's body..."
                                className={`${styles.body} ${styles.field}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})