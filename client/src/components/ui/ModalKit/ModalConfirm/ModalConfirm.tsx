import React from 'react'
import { ModalButtons } from '../ModalButtons/ModalButtons'
import commonStyles from "../commonModal.less"
import styles from "./ModalConfirm.less"

interface ModalConfirmPropsType {
    message: string
    onOkHandler: () => any
    onCancelHandler: () => any
}

export const ModalConfirm = (
    { message, onOkHandler, onCancelHandler }: ModalConfirmPropsType) => {

    return (
        <div className={commonStyles.wrap}>
            <div className={commonStyles.background}></div>
            <div className={commonStyles.box}>
                <span className={styles.message}>{message}</span>
                <ModalButtons
                    onOkHandler={onOkHandler}
                    onCancelHandler={onCancelHandler}
                />
            </div>
        </div>
    )
}