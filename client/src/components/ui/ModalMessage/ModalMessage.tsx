import React, { FC } from 'react'
import { ModalMessagePropsType } from '../../../App/App.types'
import styles from './ModalMessage.less'

export const ModalMessage:FC<ModalMessagePropsType> = ({ modalMessage }) => {
    return(
        <div className={styles.window}>
            <h1 className={styles.message}>{modalMessage}</h1>
        </div>
    )
}