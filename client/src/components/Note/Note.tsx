import React, { FC, memo, MouseEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NotePropsType } from './Note.types'
import styles from './Note.less'
import { ModalConfirm } from '../ui/ModalKit/ModalConfirm/ModalConfirm'

export const Note: FC<NotePropsType> = memo(({ id, header, body, date, lastDate, deleteNote }) => {

    let [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)

    const deleteHandler = (e: MouseEvent) => {
        setOpenModalConfirm(prev => prev = true)
    }

    const confirmHandler = () => {
        setOpenModalConfirm(prev => prev = false)
        deleteNote(id)
    }

    const cancelHandler = () => {
        setOpenModalConfirm(prev => prev = false)
    }

    return (
        <>
            {openModalConfirm &&
                <ModalConfirm
                    message="Are you sure you want to delete this note?"
                    onOkHandler={confirmHandler}
                    onCancelHandler={cancelHandler}
                />}
            <div className={styles.note}>
                <div className={styles.leftSide}>
                    <span className={styles.date}>{lastDate}</span>
                    <button
                        onClick={deleteHandler}
                        className={styles.delete}
                    >delete</button>
                </div>
                <NavLink
                    className={styles.rightSide}
                    to={`/check:${id}`}>
                    <h1 className={styles.header}>{header}</h1>
                    <h2 className={styles.body}>{body}</h2>
                </NavLink>
            </div>
        </>
    )
})