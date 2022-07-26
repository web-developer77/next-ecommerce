import React, { useState, useEffect } from 'react'
import { groupBy, isNull } from 'lodash'
import { Container, Row } from 'react-bootstrap'
import CategoryProducts from '../CategoryProducts'
import {
  GetProducts_getPrdProductList,
  GetProducts_getPrdProductList_result,
} from '@services/productsService/__generated__/GetProducts'
import productsService from '@services/productsService'
import referenceService from '@services/referenceService'
import { Loading } from '@views/elements'

interface IProductsProps {
  productList: GetProducts_getPrdProductList | null
}

const ProductSection = (props: IProductsProps) => {
  let data: any
  const [preloading, setPreLoading] = React.useState<boolean>(false)
  const [productList, setProductList] = useState<any>([])
  const [searchParam, setdata] = useState<any>({})
  const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)
  const fetchPrdCategoryList = async () => {
    const result = await referenceService.getPrdCategoryList(null, 1, 100)
    if (result) {
      // setPrdCategoryList(result);
      for (let i in result) {
        ;(data = result[i].categoryId),
          fetchProductList(1, null, 1, null, null, null, 1, null)
      }
    }
  }
  const fetchSubCategoryList = async (categoryId: number) => {
    const result = await referenceService.getCategoryListByParentId(categoryId)
    if (result) {
      for (let i in result) {
        ;(data = result[i].categoryId),
          fetchProductList(1, null, 1, null, null, null, 1, null)
      }
    }
  }
  const fetchProductList = async (
    page: number,
    categoryid: number | null,
    scopeId: number | null,
    salesTypeId: number | null,
    status: boolean | null,
    domainCategoryIds: String | null,
    typeId: number | null,
    searchText?: string | null,
  ) => {
    // setLoading(true)
    const result = await productsService
      .getPrdProductList(
        searchText || null,
        null,
        null,
        null,
        categoryId == 1447 ? data : null,
        categoryId == 1447 ? categoryId : data,
        null,
        null,
        null,
        null,
        10,
        page || 1,
        null
      )
      .catch((err) => {
        console.log('Error', err)
      })
    // setLoading(false)
    let res: any = result
    if (res?.success) {
      if (res.result.length > 0) {
        const categoryProducts = groupBy(
          res.result,
          categoryId == 1447 ? 'categoryName' : 'domainCategoryName',
        )
        const productList1 = Object.keys(categoryProducts).map((key) => ({
          categoryName: key,
          products:
            categoryProducts[key].length < 2
              ? [
                  ...categoryProducts[key],
                  ...categoryProducts[key],
                  ...categoryProducts[key],
                  ...categoryProducts[key],
                ]
              : categoryProducts[key].length < 5
              ? [...categoryProducts[key], ...categoryProducts[key]]
              : categoryProducts[key],
        }))
        // let finaldata = productList.concat(productList1)
        // setProductList(finaldata)
        if (productList.lenth == 0) {
          setProductList(productList1)
        } else {           
          setProductList((productList: any) => [
            ...productList,
            productList1[0],
          ])
        }
      }
    }
  }

  const fatchMainCategories = async () => {
    const result = await referenceService.getMainCategoryList()
    if (result.length > 0 ) {
      result.map((cat: any) => {
        fetchSubCategoryList(cat.categoryId)
      })
    }
    setPreLoading(!preloading);
    console.log("fetchMainCategories", result)
  }
  useEffect(() => {
    setProductList([])
    /* init search */
    // if (!cityList || !cityList.length) fetchCityList()
    // if (!suburbList || !suburbList.length) fetchSuburbList()

    /* init category */
    // if (!mainCategoryList || !mainCategoryList.length)
    if (categoryId === 0) {
      fatchMainCategories()
    } else {
      if (categoryId == 1447) {
        fetchPrdCategoryList()
      } else {
        fetchSubCategoryList(categoryId)
      }
    }
    // if(categoryId == 1447){
    //   fetchPrdCategoryList();
    // }
    // else{
    //   fetchMainCategoryList();
    // }

    // /* Agreement prd category */
    // // if (!prdCategoryList || !prdCategoryList.length)
    // fetchPrdCategoryList();
  }, [])

  return (
    <section className="product-category clearfix">
      <Container fluid className="product-container mb-5">
        { preloading ? 
        (productList.map(
          (
            item: {
              categoryName: String
              products: (GetProducts_getPrdProductList_result | null)[]
            },
            index: React.Key | null | undefined,
          ) => (
            <CategoryProducts item={item} num={index} />
          ),
        )) : 
        (
          <Loading />
        )}
      </Container>
    </section>
  )
}

export default ProductSection
