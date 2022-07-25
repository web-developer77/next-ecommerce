import React, { useEffect, useState } from 'react';
import referenceService from '@services/referenceService'
import { Col, Modal, ModalProps, Row } from 'react-bootstrap';

const CategoriesListing = ({ setCategoryId }: any) => {
    const [mainCategories, setMainCategories] = useState<any>([])
    const [mainSubCategories, setMainSubCategories] = useState<any>([])
    const [mainSubSubCategories, setMainSubSubCategories] = useState<any>([])
    const [show, setShow] = useState(false);
    const [selectedMainCat, setSelectedMainCat] = useState<any>(null);
    const [selectedMainSubCat, setSelectedMainSubCat] = useState<any>(null);
    const [selectedMainSubSubCat, setSelectedMainSubSubCat] = useState<any>(null);
    const [SelectedMainSubSubSubCat, setSelectedMainSubSubSubCat] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [modelSize, setModalSize] = useState<any>('sm');

    useEffect(() => {
        fatchMainCategories()
    }, []);

    const closeModal = () => {
        setShow(false)

        if (SelectedMainSubSubSubCat) {

            setSelectedCategory(SelectedMainSubSubSubCat)
            setCategoryId(SelectedMainSubSubSubCat.categoryId)
        } else if (selectedMainSubSubCat) {

            setSelectedCategory(selectedMainSubSubCat)
            setCategoryId(selectedMainSubSubCat.categoryId)
        } else if (selectedMainSubCat) {

            setSelectedCategory(selectedMainSubCat)
            setCategoryId(selectedMainSubCat.categoryId)
        } else if (selectedMainCat) {

            setSelectedCategory(selectedMainCat)
            setCategoryId(selectedMainCat.categoryId)
        } else {

            setMainSubCategories([])
            setMainSubSubCategories([])
            setSelectedMainCat(null)
            setSelectedMainSubSubCat(null)
            setSelectedMainSubSubSubCat(null)
        }
    }

    const fatchMainCategories = async () => {
        const result = await referenceService.getMainCategoryList()
        result.length > 0 && setMainCategories(result);
        // console.log(result)
    }

    const fatchSubCategories = async (category: any) => {
        setMainSubCategories([])
        setModalSize('sm');
        setSelectedMainCat(category);
        const result = await referenceService.getCategoryListByParentId(category.categoryId)
        if (result.length > 0) {
            setMainSubCategories(result)
            setModalSize('md');
        } else {
            setShow(false)
            setSelectedCategory(category)
            setCategoryId(category.categoryId)
        }
    }

    const fatchSubSubCategories = async (category: any) => {
        setMainSubSubCategories([])
        setModalSize('md');
        setSelectedMainSubCat(category);
        const result = await referenceService.getCategoryListByParentId(category.categoryId)
        if (result.length > 0) {
            setMainSubSubCategories(result)
            setModalSize('lg');
        } else {
            setShow(false)
            setSelectedCategory(category)
            setCategoryId(category.categoryId)
        }
    }

    const selectCategoryHandler = (category: any) => {
        setSelectedMainSubSubSubCat(category)
        setShow(false)
        setSelectedCategory(category)
        setCategoryId(category.categoryId)
    }

    return (
        <>
            <Row className="custom-cat-select" onClick={() => setShow(true)}>
                <Col className='col-11 p-0 select-text' >{selectedCategory ? selectedCategory.categoryName : 'All Category'}</Col>
                <Col className='col-1 p-0 cat-select-icon'><i className="fa fa-angle-right" aria-hidden="true"></i></Col>
            </Row>

            {/* <Modal className="cat-listing-modal" show={show} onHide={closeModal} size={mainSubSubCategories.length > 0 ? 'lg' : mainSubCategories.length > 0 ? 'md' : 'sm'} centered> */}
            <Modal className="cat-listing-modal" show={show} onHide={closeModal} size={modelSize} centered>
                <Modal.Header closeButton>
                    <Row className='header-row'>
                        <Col className='header-col'>Category</Col>
                        {selectedMainCat && mainSubCategories.length > 0 && <Col className='header-col'>{selectedMainCat.categoryName}</Col>}
                        {selectedMainSubCat && mainSubSubCategories.length > 0 && <Col className='header-col'>{selectedMainSubCat.categoryName}</Col>}
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    {mainCategories.length > 0 ? (
                        <Row className='body-row'>
                            <Col className='body-col'>
                                {mainCategories.map((category: any) => (
                                    <Row key={category.categoryId} className={`p-2 cat-list-item ${selectedMainCat?.categoryId === category.categoryId ? 'cat-selected-item' : ''}`} onClick={() => fatchSubCategories(category)}>
                                        <Col className='col-11 p-0'>{category.categoryName}</Col>
                                        <Col className='col-1 p-0 cat-list-icon'><i className="fa fa-angle-right" aria-hidden="true"></i></Col>
                                    </Row>
                                ))}
                            </Col>
                            {mainSubCategories.length > 0 && (
                                <Col className='body-col'>
                                    {mainSubCategories.map((category: any) => (
                                        <Row key={category.categoryId} className={`p-2 cat-list-item ${selectedMainSubCat?.categoryId === category.categoryId ? 'cat-selected-item' : ''}`} onClick={() => fatchSubSubCategories(category)}>
                                            <Col className='col-11 p-0'>{category.categoryName}</Col>
                                            {mainSubSubCategories.length > 0 && selectedMainSubCat?.categoryId === category.categoryId && <Col className='col-1 p-0 cat-list-icon'><i className="fa fa-angle-right" aria-hidden="true"></i></Col>}
                                        </Row>
                                    ))}
                                </Col>
                            )}
                            {mainSubSubCategories.length > 0 && (
                                <Col className='body-col'>
                                    {mainSubSubCategories.map((category: any) => (
                                        <Row key={category.categoryId} className={`p-2 cat-list-item ${SelectedMainSubSubSubCat?.categoryId === category.categoryId ? 'cat-selected-item' : ''}`} onClick={() => { selectCategoryHandler(category) }}>
                                            <Col className='col-11 p-0'>{category.categoryName}</Col>
                                        </Row>
                                    ))}
                                </Col>
                            )}
                        </Row>
                    ) : (
                        <Row className='body-row'>
                            <Col className='body-col p-2'>Loading...</Col>
                        </Row>
                    )}

                </Modal.Body>
            </Modal>
        </>
    );
}

export default CategoriesListing;