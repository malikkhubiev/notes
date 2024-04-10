import React, { FC, memo, MouseEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NotePropsType } from './Note.types'
import styles from './Note.less'
import { ModalConfirm } from '../ui/ModalKit/ModalConfirm/ModalConfirm'

export const Note: FC<NotePropsType> = memo(
    ({ id, header, body, color, lastDate,
        deleteNote, onSendNote }) => {

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

    const stylesheet = `
        .a${id}{
            width: 5px;
            height: 120px;
            background-color: ${color};
        }
    `

    return (
        <>
            <style>
                {stylesheet}
            </style>
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
                <div className={`a${id}`}></div>
                <NavLink
                    className={styles.rightSide}
                    to={`/check:${id}`}>
                    <h1 className={styles.header}>{header}</h1>
                    <h2 className={styles.body}>{body}</h2>
                </NavLink>
                <button onClick={() => onSendNote(id)}>&rarr;</button>
            </div>
        </>
    )
})