import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ModalPropsType } from '../../../App/App.types'
import styles from './Modal.less'

export const Modal:FC<ModalPropsType> = ({ modalMessage }) => {
    return(
        <div className={styles.window}>
            <h1 className={styles.message}>{modalMessage}</h1>
        </div>
    )
}