import React, { FC, memo, MouseEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Catalog.less'
import { ModalConfirm } from '../ui/ModalKit/ModalConfirm/ModalConfirm'
import { DeleteCatalogType, EditCatalogType } from '../../store/state.types'
import { ModalInput } from '../ui/ModalKit/ModalInput/ModalInput'

interface CatalogPropsType {
    id: number
    name: string
    updatedAt: string
    editCatalog: EditCatalogType
    deleteCatalog: DeleteCatalogType
}

export const Catalog: FC<CatalogPropsType> = memo(
    ({ id, name, updatedAt, editCatalog, deleteCatalog }) => {

        let [openEditModal, setOpenEditModal] = useState<boolean>(false)
        let [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)

        const deleteHandler = (e: MouseEvent) => {
            setOpenModalConfirm(prev => prev = true)
        }

        const editHandler = (e: MouseEvent) => {
            setOpenEditModal(prev => prev = true)
        }

        const confirmDeletingHandler = () => {
            setOpenModalConfirm(prev => prev = false)
            deleteCatalog(id)
        }

        const confirmedEditingCatalogHandler = (value: string) => {
            setOpenEditModal(prev => prev = false)
            editCatalog(id, value)
        }

        const cancelHandler = () => {
            setOpenEditModal(prev => prev = false)
            setOpenModalConfirm(prev => prev = false)
        }

        return (
            <>
                {openEditModal &&
                    <ModalInput
                        message="Enter new name of the catalog"
                        onOkHandler={confirmedEditingCatalogHandler}
                        onCancelHandler={cancelHandler}
                    />}
                {openModalConfirm &&
                    <ModalConfirm
                        message="Are you sure you want to delete this catalog?"
                        onOkHandler={confirmDeletingHandler}
                        onCancelHandler={cancelHandler}
                    />}
                <div className={styles.catalog}>
                    {name !== "Without catalog" &&
                        <button
                            onClick={editHandler}
                            className={styles.side}
                        >&#9998;</button>
                    }
                    <div className={styles.catalog_body}>
                        <span className={styles.name}>{name}</span>
                    </div>
                    {name !== "Without catalog" &&
                        <button
                            onClick={deleteHandler}
                            className={styles.side}
                        >del</button>
                    }
                </div>
            </>
        )
    })