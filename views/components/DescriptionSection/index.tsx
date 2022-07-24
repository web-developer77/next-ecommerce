import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { GetProducts_getPrdProductList_result } from '@services/productsService/__generated__/GetProducts'

interface IDescriptionProps {
  product: GetProducts_getPrdProductList_result | null
}

const DescriptionSection = (props: IDescriptionProps) => {
  const [activeTab, setActiveTab] = useState<String>('desc')
  const handleChangeTab = (e: any, key: String) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveTab(key)
  }
  const product = props.product

  return (
    <section className="product-information">
      <Container className="ezy-container">
        <div className="product-info-box">
          <div className="product-info-category">
            <ul className="nav nav-tabs">
              <li className={activeTab === 'desc' ? 'active' : ''}>
                <a
                  data-toggle="tab"
                  className=""
                  href="#description"
                  aria-expanded="true"
                  onClick={(e) => handleChangeTab(e, 'desc')}
                >
                  Description
                </a>
              </li>
              <li className={activeTab === 'info' ? 'active' : ''}>
                <a
                  data-toggle="tab"
                  className=""
                  href="#item-information"
                  aria-expanded="false"
                  onClick={(e) => handleChangeTab(e, 'info')}
                >
                  Item Information
                </a>
              </li>
              <li className={activeTab === 'review' ? 'active' : ''}>
                <a
                  data-toggle="tab"
                  className=""
                  href="#reviews"
                  aria-expanded="false"
                  onClick={(e) => handleChangeTab(e, 'review')}
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div
              className={`tab-pane fade ${
                activeTab === 'desc' && 'active in show'
              }`}
              id="description"
            >
              <div className="product-info-category-content">
                <h3> {product?.productName}</h3>
                <div
                  style={{ whiteSpace: 'pre-wrap' }}
                  dangerouslySetInnerHTML={{
                    __html: product?.description || '',
                  }}
                ></div>
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === 'info' && 'active in show'
              }`}
              id="item-information"
            >
              <div className="product-info-category-content">
                <h3> Information</h3>
                <p className="mb-1">Length: {product?.length || 'N/A'}</p>
                <p className="mb-1">Width: {product?.width || 'N/A'}</p>
                <p className="mb-1">Height: {product?.height || 'N/A'}</p>
                <p className="mb-1">Volume: {product?.volume || 'N/A'}</p>
                <p className="mb-1">Weight: {product?.weight || 'N/A'}</p>
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === 'review' && 'active in show'
              }`}
              id="reviews"
            >
              <div className="product-info-category-content">
                <h3> Reviews</h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DescriptionSection
