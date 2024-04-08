import React from 'react'
import styles from "./ModalButtons.less"

interface ModalButtonsPropsType {
    onOkHandler: () => void
    onCancelHandler: () => void
}

export const ModalButtons = (
    {onOkHandler, onCancelHandler}: ModalButtonsPropsType) => {
    
    return (
        <div className={styles.container}>
            <button
                onClick={onCancelHandler}
                className={styles.button}
            >Cancel</button>
            <button
                onClick={onOkHandler}
                className={`${styles.button} ${styles.filled}`}
            >Ok</button>
        </div>    
    )
}