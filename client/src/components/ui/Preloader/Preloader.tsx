import React, { FC } from 'react'
import styles from './Preloader.less'

export const Preloader:FC<{}> = () => {
    return (
        <div className={styles.preloader}>
            <div data-testid="spinner" className={styles.spinner}></div>
        </div>
    )
}