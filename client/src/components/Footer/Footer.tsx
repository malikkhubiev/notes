import React, { FC, useRef, useState } from 'react'
import { FooterPropsType } from '../../pages/Main/Main.types'
import styles from './Footer.module.less'
import { ModalInput } from '../ui/ModalKit/ModalInput/ModalInput'
import { modalCalling } from '../../store/state'

export const Footer: FC<FooterPropsType> = ({ deleteAccount }) => {

    const confirmMessage = useRef<string>("Type in 'I don't care about everything I wrote here'")
    let [password, setPassword] = useState<string>('')
    let [toggleDeleteButton, setToggleDeleteButton] = useState<boolean>(false)
    let [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)

    const toggleButtonHandler = () => {
        setToggleDeleteButton(prev => prev = !prev)
    }

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => prev = e.target.value)
    }

    const confirmPasswordHandler = () => {
        toggleButtonHandler()
        const passwordCopy = password; 
        if (passwordCopy.trim() !== '') {
            setOpenModalConfirm(prev => prev = true)
        }
    }

    const onConfirm = (value: string):void => {
        let processedValue = `Type in '${value}'`
        if (processedValue === confirmMessage.current) {
            deleteAccount(password)
        }else{
            modalCalling("Incorrect value")
        }
        setPassword(prev => prev = '')
        setOpenModalConfirm(prev => prev = false)
    }

    const onCancelHandler = () => {
        setOpenModalConfirm(prev => prev = false)
    } 

    return <>
        {openModalConfirm &&
        <ModalInput
            message={`${confirmMessage.current}`}
            onOkHandler={onConfirm}
            onCancelHandler={onCancelHandler}
        />}
        <div className={styles.deleteBox}>
            {
                !toggleDeleteButton ?
                    <input
                        value={"delete account"}
                        onClick={toggleButtonHandler}
                        type={"button"}
                        className={styles.button}
                    />
                    :
                    <input
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPasswordHandler}
                        type={"text"}
                        className={styles.button}
                    />
            }
            {
                toggleDeleteButton &&
                <button
                    onClick={confirmPasswordHandler}
                    className={`${styles.button} ${styles.confirmButton}`}
                >✔</button>
            }
        </div>
    </>
}