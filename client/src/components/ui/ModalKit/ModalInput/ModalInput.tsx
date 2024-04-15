import React, { useState } from 'react'
import { ModalButtons } from '../ModalButtons/ModalButtons'
import commonStyles from "../common/commonModal.less"
import styles from "./ModalInput.less"

interface ModalInputPropsType {
    message: string
    onOkHandler: (value: string) => any
    onCancelHandler: () => any
}

export const ModalInput = (
    { message, onOkHandler:outerOkHandler, onCancelHandler }: ModalInputPropsType) => {

    let [value, setValue] = useState<string>("");

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(prev => prev = e.target.value)
    }

    const onOkHandler = () => {
        outerOkHandler(value)
    }

    return (
        <div className={commonStyles.wrap}>
            <div className={commonStyles.background}></div>
            <div className={commonStyles.box}>
                <span className={commonStyles.message}>{message}</span>
                <input
                    value={value}
                    onChange={changeInputHandler}
                    className={styles.input}
                />
                <ModalButtons
                    onOkHandler={onOkHandler}
                    onCancelHandler={onCancelHandler}
                />
            </div>
        </div>
    )
}