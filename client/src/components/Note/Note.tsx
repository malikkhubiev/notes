import React, { FC, memo, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { NotePropsType } from './Note.types'
import styles from './Note.less'

export const Note: FC<NotePropsType> = memo(({ id, header, body, date, deleteNote }) => {

    const deleteHandler = (e:MouseEvent) => {
        e.preventDefault()
        deleteNote(id)
    }
    
    return (
        <NavLink
            className={styles.note}
            to={`/check:${id}`}>
            <div className={styles.leftSide}>
                <span className={styles.date}>{date}</span>
                <button
                    onClick={deleteHandler}
                    className={styles.delete}
                >delete</button>
            </div>
            <div className={styles.rightSide}>
                <h1 className={styles.header}>{header}</h1>
                <h2 className={styles.body}>{body}</h2>
            </div>
        </NavLink>
    )
})