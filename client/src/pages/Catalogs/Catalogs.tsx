import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CatalogsPropsType } from '../../App/App.types';
import { Catalog } from '../../components/Catalog/Catalog';
import { AddButton } from '../../components/ui/AddButton/AddButton';
import { ModalInput } from '../../components/ui/ModalKit/ModalInput/ModalInput';
import styles from './Catalogs.less';

export const Catalogs = observer((
    { catalogs, getAllCatalogs, addCatalog, editCatalog, deleteCatalog }: CatalogsPropsType) => {

    let [openAddModal, setOpenAddModal] = useState<boolean>(false)

    const navigate = useNavigate();

    const backButtonHandler = () => {
        navigate(-1)
    };

    const addCatalogHandler = () => {
        setOpenAddModal(prev => prev = true)
    }

    const confirmedAddCatalogHandler = (value: string) => {
        setOpenAddModal(prev => prev = false)
        addCatalog(value)
    }

    const cancelHandler = () => {
        setOpenAddModal(prev => prev = false)
    }

    useEffect(() => {
        getAllCatalogs()
    }, [])

    return (
        <>
            {openAddModal &&
                    <ModalInput
                        message="Enter the name of the catalog"
                        onOkHandler={confirmedAddCatalogHandler}
                        onCancelHandler={cancelHandler}
                    />}
            <div className={styles.catalog}>
            <div className={styles.header}>
                <button
                    onClick={backButtonHandler}
                    className={styles.backButton}
                >&larr;</button>
                <h1 className={styles.headerText}>Catalogs</h1>
                <div className={styles.gap}></div>
            </div>
            <AddButton
                onClickHandler={addCatalogHandler}
            />
            <div className={styles.catalogs}>
                {
                    catalogs.length
                    &&
                    catalogs.map(catalog =>
                        <Catalog
                            key={catalog.id}
                            {...catalog}
                            editCatalog={editCatalog}
                            deleteCatalog={deleteCatalog}
                        />)
                }
            </div>
        </div>
        </>
    )
})