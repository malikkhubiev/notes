import React, { useState } from 'react'
import { ModalButtons } from '../ModalButtons/ModalButtons'
import commonStyles from "../common/commonModal.less"
import styles from "./ModalList.less"

interface ModalListPropsType {
    message: string
    list: {id: string | number, name: string}[]
    onOkHandler: (id: string | number) => any
    onCancelHandler: () => any
}

export const ModalList = (
    { message, list, onOkHandler:outerOkHandler, onCancelHandler }: ModalListPropsType) => {

    let [id, setId] = useState<string | number | null>(null);

    const chooseIdHandler = (id: string | number) => {
        setId(prev => prev = id)
    }

    const onOkHandler = () => {
        outerOkHandler(id)
    }

    return (
        <div className={commonStyles.wrap}>
            <div className={commonStyles.background}></div>
            <div className={`${commonStyles.box} ${styles.box}`}>
                <span className={commonStyles.message}>{message}</span>
                <div className={styles.list}>
                    {
                        list.map(el =>
                            <button 
                                key={el.id}
                                onClick={() => chooseIdHandler(el.id)} 
                                className={styles.list__item}
                            >
                                {el.name}
                            </button>
                        )
                    }
                </div>
                <ModalButtons
                    onOkHandler={onOkHandler}
                    onCancelHandler={onCancelHandler}
                />
            </div>
        </div>
    )
}