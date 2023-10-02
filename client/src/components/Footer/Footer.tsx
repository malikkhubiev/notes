import React, { FC, useState } from 'react'
import { FooterPropsType } from '../../pages/Main/Main.types'
import styles from './Footer.module.less'

export const Footer:FC<FooterPropsType> = ({ deleteAccount, outButtonStyle, addButtonStyle }) => {

    let [password, setPassword] = useState<string>('')
    let [toggleDeleteButton, setToggleDeleteButton] = useState<boolean>(false)

    const toggleButtonHandler = () => {
        setToggleDeleteButton(prev => prev = !prev)
    }

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => prev = e.target.value)
    }

    const confirmPasswordHandler = () => {
        toggleButtonHandler()
        setPassword(prev => prev = '')
        if (password.trim() !== '') deleteAccount(password)
    }

    return <>
        <div className={styles.deleteBox}>
            <input
                placeholder="Enter your password"
                value={toggleDeleteButton ? password : "delete account"}
                onChange={setPasswordHandler}
                onClick={toggleDeleteButton ? () => {} : toggleButtonHandler}
                type={toggleDeleteButton ? "text" : "button"}
                className={styles.button}
            >
            </input>
            {
                toggleDeleteButton &&
                <button 
                    onClick={confirmPasswordHandler} 
                    className={`${styles.button} ${styles.confirmButton}`}
                >&#10004;</button>
            }
        </div>
    </>
}