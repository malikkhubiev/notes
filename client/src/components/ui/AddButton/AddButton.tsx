import React from 'react'
import styles from './AddButton.less'
import { NavLink } from 'react-router-dom'

type AddButtonPropsType = {
    path: string;
    onClickHandler?: never;
} | {
    path?: never;
    onClickHandler: () => void;
};

export const AddButton = ({ path, onClickHandler }: AddButtonPropsType) => { 
    return (
        <>
            {path ?
                <NavLink
                    className={styles.addButton}
                    to={path}
                >+</NavLink>
                :
                <button
                    className={styles.addButton}
                    onClick={onClickHandler}
                >+</button>
            }
        </>
    )
}