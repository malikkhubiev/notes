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
            .color-${id}{
                width: 100%;
                height: 5px;
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
                    <div className={styles.line}>
                        <button
                            onClick={deleteHandler}
                            className={styles.action}
                        >delete</button>
                        <span className={styles.date}>{lastDate}</span>
                        <button
                            onClick={() => onSendNote(id)}
                            className={styles.action}
                        >send</button>
                    </div>
                    <div className={styles.line}>
                        <div className={`color-${id}`}></div>
                    </div>
                    <NavLink
                        className={styles.main}
                        to={`/check:${id}`}>
                        <h1 className={styles.header}>{header}</h1>
                        <h2 className={styles.body}>{body}</h2>
                    </NavLink>
                </div>
            </>
        )
    })