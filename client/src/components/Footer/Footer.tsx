import React, { FC, useState } from 'react'
import { FooterPropsType } from '../../pages/Main/Main.types'
import styles from './Footer.module.less'

export const Footer: FC<FooterPropsType> = ({ deleteAccount }) => {

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
        const passwordCopy = password; 
        console.log(123)
        console.log(passwordCopy)
        console.log(123)
        if (passwordCopy.trim() !== '') {
            deleteAccount(password)
            setPassword(prev => prev = '')
        }
    }

    return <>
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