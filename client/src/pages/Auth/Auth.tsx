import React, { FC, useState } from 'react'
import { AuthPropsType } from '../../App/App.types'
import styles from './Auth.less'

export const Auth: FC<AuthPropsType> = ({ login, registration }) => {

    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const authTypeHandler = (authType: boolean) => {
        authType
            ?
            setIsLogin(prev => prev = true)
            :
            setIsLogin(prev => prev = false)
    }

    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(prev => prev = e.target.value)
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(prev => prev = e.target.value)
    }

    const submitHandler = () => {
        isLogin
            ?
            login(username, password)
            :
            registration(username, password)
    }

    return (
        <div className={styles.outer}>
            <div className={styles.main}>
                <div className={styles.deciding}>
                    <button
                        onClick={() => authTypeHandler(true)}
                        className={`${styles.decidingButton} ${isLogin && styles.selected}`}
                    >Login</button>
                    <span>/</span>
                    <button
                        onClick={() => authTypeHandler(false)}
                        className={`${styles.decidingButton} ${!isLogin && styles.selected}`}
                    >Registration</button>
                </div>
                <span
                    className={styles.label}
                >
                    *More than 8 and less than 16 for all
                </span>
                <input
                    id='Username'
                    placeholder='Username'
                    value={username}
                    onChange={usernameHandler}
                    className={styles.field}
                />
                <input
                    placeholder='Password'
                    value={password}
                    onChange={passwordHandler}
                    className={styles.field}
                    type="password"
                />
                <button
                    onClick={submitHandler}
                    disabled={!username || !password}
                    className={styles.submit}
                >{isLogin ? 'Log in' : 'Registrate'}</button>
            </div>
        </div>
    )
}