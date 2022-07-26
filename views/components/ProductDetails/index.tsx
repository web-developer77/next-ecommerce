import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Container,
  Row,
  Col,
  Form,
  Accordion,
  Card,
  Button,
  InputGroup,
  FormControl,
  Spinner,
} from 'react-bootstrap'
// import HowToWork from '../ContactUs/howtowork'
import { makeSelectLegalList } from '@views/containers/HomePage/selectors'
import referenceService from '@services/referenceService'
import Pagination from '@views/elements/pagination'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import productsService from '@services/productsService'
import { GetProducts } from '@services/productsService/__generated__/GetProducts'
import { setProductList } from '@views/containers/HomePage/homePageSlice'
import { makeSelectProductList } from '@views/containers/HomePage/selectors'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import { GetSuburb_getSuburb_result } from '@services/referenceService/__generated__/GetSuburb'
import { GetCity_getCity_result } from '@services/referenceService/__generated__/GetCity'
import { setLegalList } from '@views/containers/HomePage/homePageSlice'
import { Empty, Loading, Product } from '@views/elements'
import {
  setNewsSliderKey,
  setSuburbList,
  setCityList,
  setSubCategoryList,
} from '@views/containers/Reference/ReferenceSlice'
import { GetCategoryByParentId_getMstCategoryByParentId_result } from '@services/referenceService/__generated__/GetCategoryByParentId'
import { getRouterParamValue } from '@views/lib/helper'
import CategoriesListing from '../CategoriesListing'
import { AsyncPaginate } from 'react-select-async-paginate'

const actionDispatch = (dispatch: Dispatch) => ({
  setProductList: (page: GetProducts[]) => dispatch(setProductList(page)),
  setNewsSliderKey: (key: String) => dispatch(setNewsSliderKey(key)),
  setSuburbList: (data: GetSuburb_getSuburb_result[]) =>
    dispatch(setSuburbList(data)),
  setCityList: (data: GetCity_getCity_result[]) => dispatch(setCityList(data)),
  setLegalList: (page: GetProducts[]) => dispatch(setLegalList(page)),
  setSubCategoryList: (
    data: GetCategoryByParentId_getMstCategoryByParentId_result[],
  ) => dispatch(setSubCategoryList(data)),
})

const stateSelector = createSelector(makeSelectProductList, (productList) => ({
  productList,
}))
const stateLegalSelector = createSelector(makeSelectLegalList, (legalList) => ({
  legalList,
}))
const referenceSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const LegalContractSection = () => {
  const router = useRouter()
  const dataa: any = router.query?.data
  const _scopeId = getRouterParamValue(router.query?.scopeId, 'number')
  const _categoryId = getRouterParamValue(router.query?.categoryId, 'number')
  const page = getRouterParamValue(router.query?.page, 'number', 1)

  const categoryIds = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)
  const { setLegalList } = actionDispatch(useAppDispatch());
  const { legalList } = useAppSelector(stateLegalSelector)
  const [fromPrice, setFromPrice] = useState<any>(null)
  const [toPrice, setToPrice] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [legalList1, SetList] = useState<Array<any>>([
    {
      activeText: "Active",
      categoryId: 8,
      categoryName: "Apologies",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true
    },
    {
      activeText: "Active",
      categoryId: 2,
      categoryName: "Citizenship",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 3,
      categoryName: "Commercial Transactions",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 4,
      categoryName: "Companies",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 5,
      categoryName: "Estates",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 1,
      categoryName: "Home Affairs",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 6,
      categoryName: "Intellectual Property",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 10,
      categoryName: "Mortgage and Notarial Agreements ",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 7,
      categoryName: "Persons & Family",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 9,
      categoryName: "Property",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    },
    {
      activeText: "Active",
      categoryId: 11,
      categoryName: "Sales ",
      domainID: 0,
      domainId: 0,
      domainName: null,
      isActive: true,
    }
  ])
  const [priceRange, setPriceRange] = useState<Array<string>>([])
  const [categoryId, setCategoryId] = useState<number | null>(_categoryId)
  const [categoryAsyncId, setCategoryAsyncId] = useState<any>({value: 0, label: "All Category"})
  const [categoryId12, setCategoryId1] = useState<number | null>(_categoryId)

  const [scopeId, setScopeId] = useState<number | null>(_scopeId)
  const [salesTypeId, setSalesTypeId] = useState<number | null>(null)
  const [typeId, setTypeId] = useState<number | null>(null)
  const [status, setStatus] = useState<boolean | null>(null)
  const [edata, setefy] = useState<any | null>(null)
  const [domainCategoryIds, setDomainCategoryIds] = useState<string | null>(
    categoryIds.toString(),
  )
  const [searchParam, setSearchParam] = useState<any>({})
  const { setProductList, setNewsSliderKey } = actionDispatch(useAppDispatch())
  const { productList } = useAppSelector(stateSelector)
  const {
    prdCategoryList,
    packageList,
    packageDetailList,
    subCategoryList,
    provinceList,
    cityList,
    suburbList,
  } = useAppSelector(referenceSelector)
  const categoryId1 = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)
  const [categoryData1, setCategoryData] = useState<any>(
    prdCategoryList?.find((e) => e.categoryId === categoryId),
  )

  const categoryData = prdCategoryList?.find((e) => e.categoryId === categoryId)
  const filteredCityList = searchParam.province
    ? cityList?.filter((el) => el.provinceId === searchParam.province)
    : null // cityList
  const filteredSuburbList = searchParam.city
    ? suburbList?.filter((el) => el.cityId === searchParam.city)
    : null // suburbList
  const { setSubCategoryList } = actionDispatch(useAppDispatch())


  useEffect(() => { // Loading category
    fetchPrdCategoryList();
    if (categoryId1 !== 1447 && categoryId1 !== 0) {
      fetchSubCategoryList(categoryIds);
    }
  }, []);

  useEffect(() => { // Loading category
    console.log("categoryIds ==>>", categoryIds)
    if (categoryIds === 0) {
      fetchProductList(
        page,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      )
    }
  }, []);

  /* useEffect(() => { // product filtering fetch call by salestype
    if (salesTypeId)
      fetchProductListByProductSalesType(salesTypeId);
  }, [salesTypeId]);
  useEffect(() => { // product filtering fetch call by scopeId
    if (scopeId)
      fetchProductListByProductScope(scopeId)
  }, [scopeId]);
  useEffect(() => { // product filtering fetch call by typeId
    if (typeId)
      fetchProductListByProductUserId(typeId)
  }, [typeId]);
  useEffect(() => { // product filtering fetch call by status
    if (status)
      fetchProductListByProductStatus(status)
  }, [status]); */

  const handleChangeProvince = (e: any) => {
    setNewsSliderKey('attorney')
    if (e.target.value === 'all') {
      setSearchParam({ ...searchParam, province: null, city: null })
    } else {
      setSearchParam({
        ...searchParam,
        province: Number(e.target.value),
        emptyCity: false,
      })
      fetchCityListByProvinceId(Number(e.target.value))
    }
  }
  const handleChangeSubCategory = (e: any) => {
    setNewsSliderKey('attorney')
    if (!e) {
      setSearchParam({ ...searchParam, subCategoryId: null })
    } else {
      setSearchParam({ ...searchParam, subCategoryId: Number(e) })
    }
  }

  const loadSubCategory = async (search: any, loadedOptions: any, { page }: any) => {
    const res: any = await referenceService.getCategoryListByParentIdAsync(categoryIds, page, 10)
    console.log("resutls", categoryIds)
    let options: any = [];
    let hasMore = true;

    if (res.result.length > 0) {
      if (res.nextPage === page) {
        hasMore = false
      }
      options.push({value: 1447, label: "All Category"})
      res.result.map((el: any, index: any) => {
        options.push({ value: el?.categoryId, label: el?.categoryName });
      })
    }

    return {
      options: options,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  }

  const fetchCityListByProvinceId = async (provinceId: number) => {
    setCityList([])
    const result = await referenceService.getCityListByProvinceId(provinceId)
    if (result) {
      setCityList(result)
      if (!result.length) setSearchParam({ ...searchParam, emptyCity: true })
    }
  }
  const fetchProductListByProductSalesType = async (productId: number) => {
    setLoading(true);
    const result = await productsService.getPrdProductList(
      null,
      productId,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false);
    const res: any = result;
    if (res?.success) {
      setProductList(res);
    }
  }
  const fetchProductListByProductScope = async (scopeId: any) => {
    setLoading(true);
    const result = await productsService.getPrdProductList(
      null,
      null,
      null,
      null,
      null,
      domainCategoryIds,
      null,
      null,
      scopeId,
      null,
      null,
      null,
      null
    )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false);
    const res: any = result;
    if (res?.success) {
      setProductList(res);
    }
  }
  const fetchProductListByProductUserId = async (userId: number) => {
    setLoading(true);
    const domainCategoryIds = "1447";
    const result = await productsService.getPrdProductList(
      null,
      null,
      null,
      null,
      null,
      domainCategoryIds,
      null,
      null,
      null,
      null,
      userId,
      null,
      null
    )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false);
    const res: any = result;
    if (res?.success) {
      setProductList(res);
    }
  }
  const fetchProductListByProductStatus = async (status: Boolean) => {
    setLoading(true);
    const result = await productsService.getPrdProductList(
      null,
      null,
      null,
      null,
      status,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false);
    const res: any = result;
    if (res?.success) {
      setProductList(res);
    }
  }
  const handleChangeCity = (e: any) => {
    setNewsSliderKey('attorney')
    if (e.target.value === 'all') {
      setSearchParam({ ...searchParam, city: null })
    } else {
      setSearchParam({
        ...searchParam,
        city: Number(e.target.value),
        emptySuburb: false,
      })
      fetchSuburbListByCityId(Number(e.target.value))
    }
  }
  const fetchSubCategoryList = async (categoryId: number) => {
    const result = await referenceService.getCategoryListByParentId(categoryId)
    if (result) {
      // tempSubCategory = tempSubCategory
      //   ? [...tempSubCategory, ...result]
      //   : result
      // setSubCategoryList(result)
      if (result) {
        let tempDomainCategoryIds = ''
        for (let i = 0; i < result.length; i++) {
          if (result[i].categoryId) {
            if (i == result.length - 1) {
              tempDomainCategoryIds = tempDomainCategoryIds + result[i].categoryId
            } else if (i == 0) {
              tempDomainCategoryIds = `${result[i].categoryId},`
            } else {
              tempDomainCategoryIds = tempDomainCategoryIds + `${result[i].categoryId},`
            }
          }
        }

        if (tempDomainCategoryIds) {
          setDomainCategoryIds(tempDomainCategoryIds)
          fetchProductList(
            page,
            null,
            null,
            null,
            null,
            null,
            null,
            tempDomainCategoryIds,
            null,
            null,
          )
        }
      }

    }
  }
  const fetchSuburbListByCityId = async (cityId: number) => {
    setSuburbList([])
    const result = await referenceService.getSuburbListByCityId(cityId)
    if (result) {
      setSuburbList(result)
      if (!result.length) setSearchParam({ ...searchParam, emptySuburb: true })
    }
  }

  const handleChangeSururb = (e: any) => {
    setNewsSliderKey('attorney')
    if (e.target.value === 'all') {
      setSearchParam({ ...searchParam, suburb: null })
    } else {
      setSearchParam({ ...searchParam, suburb: Number(e.target.value) })
    }
  }
  const fetchProductList = async (
    page: number,
    categoryId: number | null,
    startPrice: number | null,
    endPrice: number | null,
    scopeId: number | null,
    salesTypeId: number | null,
    status: boolean | null,
    domainCategoryIds: any | null,
    typeId: number | null,
    searchText?: string | null,
  ) => {
    setLoading(true)
    console.log("categoryId", categoryId)
    console.log("domainCategoryIds", domainCategoryIds)
    const result = await productsService
      .getPrdProductList(
        searchText || null,
        null,
        startPrice,
        endPrice,
        categoryId,
        domainCategoryIds == "0" || domainCategoryIds == 0 ? null : domainCategoryIds,
        status,
        salesTypeId,
        scopeId,
        0,
        10,
        page || 1,
        null,
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)
    let res: any = result
    if (res?.success) {
      setProductList(res)
    }
  }

  const fetchProductList3 = async (
    specialId: number | null,
    specialName: String | null,
    franchiseId: number | null,
    statusIds: String | null,
    distance: number | null,
    companyIds: String | null,
    categoryIds: String | null,
    provinceIds: String | null,
    cityIds: String | null,
    suburbIds: String | null,
    page: number | null,
    size: number | null,
  ) => {
    setLoading(true)
    const result = await productsService
      .getMstSpecialList(
        specialId,
        specialName,
        franchiseId,
        statusIds,
        distance,
        companyIds,
        categoryIds,
        provinceIds,
        cityIds,
        suburbIds,
        page || 1,
        size,
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)
    let res: any = result
    if (res?.success) {
      if (res.result.length > 0) {
        setProductList(res)
      }
    }
  }

  const fetchProductList2 = async (
    franchiseId: number | null,
    eflyerId: String | null,
    magazineName: String | null,
    statusIds: String | null,
    companyIds: String | null,
    categoryIds: String | null,
    provinceIds: String | null,
    cityIds: String | null,
    suburbIds: String | null,
    page: number | null,
    size: number | null,
  ) => {
    setLoading(true)
    const result = await productsService
      .getMagazinesList(
        franchiseId,
        eflyerId,
        magazineName,
        statusIds,
        companyIds,
        categoryIds,
        provinceIds,
        cityIds,
        suburbIds,
        page || 1,
        size,
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)
    let res: any = result
    if (res?.success) {
      if (res.result.length > 0) {
        setProductList(res)
      }
    }
  }

  const handleChangePage = (page: number) => {
    if (dataa == 1) {
      fetchProductList2(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        page,
        null,
      )
    } else if (dataa == 2) {
      fetchProductList3(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        page,
        null,
      )
    } else {
      fetchProductList(
        page,
        categoryId,
        fromPrice,
        toPrice,
        scopeId,
        salesTypeId,
        status,
        domainCategoryIds,
        typeId,
        searchText || null,
      )
    }
    // router.push({
    //   pathname: "/lawyers/contracts"
    // }, `/lawyers/contracts?page=${page}`)
  }

  const handleChangeCategory = (catId: any) => {
    console.log(catId)
    setCategoryId1(null)
    setCategoryData(
      subCategoryList?.find((f) => f.categoryId == catId),
    )
    if (catId === 1447) {
      setCategoryId(null)
      fetchProductList(
        page,
        null,
        fromPrice,
        toPrice,
        scopeId,
        salesTypeId,
        status,
        domainCategoryIds,
        typeId,
        searchText || null,
      )
    } else {
      setCategoryId(Number(catId))
      fetchProductList(
        page,
        Number(catId),
        fromPrice,
        toPrice,
        scopeId,
        salesTypeId,
        status,
        Number(catId),
        typeId,
        searchText || null,
      )
    }
  }
  const handleChangeCategory1 = (e: any) => {
    console.log("product detail *******************",e)
    setCategoryData(legalList1?.find((f) => f.categoryId == e.target.value))
    if (e.target.value === 'all') {
      setCategoryId(null)
      setDomainCategoryIds(categoryIds.toString())
      setCategoryId1(null)
      fetchProductList(
        page,
        null,
        fromPrice,
        toPrice,
        scopeId,
        salesTypeId,
        status,
        null,
        typeId,
        searchText || null,
      )
    } else {
      setCategoryId(null)
      setDomainCategoryIds(categoryIds.toString())
      setCategoryId1(e.target.value)
      fetchProductList(
        page,
        parseInt(e.target.value),
        fromPrice,
        toPrice,
        scopeId,
        salesTypeId,
        status,
        categoryIds.toString(),
        typeId,
        searchText || null,
      )
    }
  }

  const handleSubmit = () => {
    if (dataa == 1) {
      fetchProductList2(
        null,
        null,
        edata,
        null,
        null,
        searchParam?.subCategoryId,
        searchParam?.province,
        searchParam?.city,
        searchParam?.suburb,
        null,
        null,
      )
    } else if (dataa == 2) {
      fetchProductList3(
        null,
        edata,
        null,
        null,
        null,
        null,
        searchParam?.subCategoryId,
        searchParam?.province,
        searchParam?.city,
        searchParam?.suburb,
        null,
        null,
      )
    }
  }

  const handleSalesTypeIdChange = (val: any) => {
    setSalesTypeId(val)
    fetchProductList(
      page,
      categoryId,
      fromPrice,
      toPrice,
      scopeId,
      val,
      status,
      domainCategoryIds,
      typeId,
      searchText || null,
    )
  }

  const handleScopeIDChange = (val: any) => {
    setScopeId(val)
    fetchProductList(
      page,
      categoryId,
      fromPrice,
      toPrice,
      val,
      salesTypeId,
      status,
      domainCategoryIds,
      typeId,
      searchText || null,
    )
  }

  const handleTypeIdChange = (val: any) => {
    setTypeId(val)
    fetchProductList(
      page,
      categoryId,
      fromPrice,
      toPrice,
      scopeId,
      salesTypeId,
      status,
      domainCategoryIds,
      val,
      searchText || null,
    )
  }

  const handleChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }

  const handleCheckPrice = (e: any, value: string) => {
    let priceRangeTemp = [...priceRange]

    if (e.target.checked) priceRangeTemp = [...priceRange, value]
    else priceRangeTemp = priceRangeTemp.filter((e) => e !== value)

    const prices: any = [];
    priceRangeTemp.forEach(elem => {
      const pricesTemp = elem.split('_')
      prices.push(parseFloat(pricesTemp[0]), parseFloat(pricesTemp[1]))
    })
    prices.sort((a: any, b: any) => a < b);

    const startPrice = prices[0] ? prices[0] : null;
    const endPrice = prices[prices.length - 1] ? prices[prices.length - 1] > 50 ? null : prices[prices.length - 1] : null;

    setFromPrice(startPrice)
    setToPrice(endPrice)
    setPriceRange(priceRangeTemp)

    fetchProductList(
      page,
      categoryId,
      startPrice,
      endPrice,
      scopeId,
      salesTypeId,
      status,
      domainCategoryIds,
      typeId,
    )
  }

  const fetchPrdCategoryList = async () => {
    const result = await referenceService.getPrdCategoryList(null, 1, 100)
    if (result) {
      SetList(result)
    }
  }

  useEffect(() => {
    // if (!productList?.result?.length)

    if (!legalList?.result?.length) fetchPrdCategoryList()
    if (dataa == 1) {
      fetchProductList2(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      )
    } else if (dataa == 2) {
      fetchProductList3(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      )
    } else {
      fetchProductList(
        page,
        categoryId,
        fromPrice,
        toPrice,
        scopeId,
        salesTypeId,
        status,
        domainCategoryIds,
        typeId,
      )
    }
  }, [])

  // useEffect(() => {
  //   fetchProductList(
  //     1,
  //     categoryId,
  //     scopeId,
  //     salesTypeId,
  //     status,
  //     domainCategoryIds,
  //     typeId,
  //   )
  //   setSearchText('')
  // }, [categoryId, scopeId, salesTypeId, status, domainCategoryIds, typeId])

  let renderData = productList?.result?.length ? productList?.result : []

  const handleSearchByText = () => {
    fetchProductList(
      1,
      categoryId,
      fromPrice,
      toPrice,
      scopeId,
      salesTypeId,
      status,
      domainCategoryIds,
      typeId,
      searchText || null,
    )
  }
  const handleChangeFiles = (e: any) => {
    setefy(e.target.value)
  }

  return (
    <section className="category-product w-100 clearfix">
      <Container fluid className="page-container">
        <Row className="justify-content-center">
          {!dataa && (
            <Col xs={12} sm={4}>
              <div className="product-filter">
                <h3>
                  Filter Option{' '}
                  <i className="fa fa-filter" aria-hidden="true"></i>
                </h3>
                <Accordion defaultActiveKey="0" className="product-filter-box">
                  <Card className="product-filter-option">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="0"
                      className="w-100"
                    >
                      <h4 className="">Price</h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body className="product-filter-option-box">
                        <Form.Group controlId="20_30">
                          <Form.Check
                            type="checkbox"
                            label="R20 - R30"
                            custom
                            onChange={(e) => handleCheckPrice(e, '20_30')}
                          />
                        </Form.Group>
                        <Form.Group controlId="30_40">
                          <Form.Check
                            type="checkbox"
                            label="R31 - R40"
                            custom
                            onChange={(e) => handleCheckPrice(e, '31_40')}
                          />
                        </Form.Group>
                        <Form.Group controlId="40_50">
                          <Form.Check
                            type="checkbox"
                            label="R41 - R50"
                            custom
                            onChange={(e) => handleCheckPrice(e, '41_50')}
                          />
                        </Form.Group>
                        <Form.Group controlId="50_">
                          <Form.Check
                            type="checkbox"
                            label="More than R50"
                            custom
                            onChange={(e) => handleCheckPrice(e, '50_51')}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="product-filter-option category-filter">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="1"
                      className="w-100"
                    >
                      <h4 className="">Category</h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        {categoryIds === 0 ?
                          <CategoriesListing setCategoryId={(catID: any) => handleChangeCategory(catID)} />
                          : (
                            <AsyncPaginate
                              className="business-list-category-select-box"
                              value={categoryAsyncId}
                              onChange={(e: any) => { handleChangeCategory(e.value); setCategoryAsyncId(e) }}
                              loadOptions={loadSubCategory}
                              additional={{
                                page: 1,
                              }}
                            />
                            /* { <select
                            name="categoryId"
                            id="prdCategory"
                            className="form-control"
                            value={categoryId || 'all'}
                            onChange={(e: any) => handleChangeCategory(e.target.value)}
                          >
                            <option value="all">All Category</option>
                            {subCategoryList?.map((category, index) => (
                              <option
                                value={category?.categoryId || ''}
                                key={index}
                              >
                                {category?.categoryName}
                              </option>
                            ))}
                          </select> } */
                          )
                        }

                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {categoryId1 == 1447 && (
                    <Card className="product-filter-option">
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey="1"
                        className="w-100"
                      >
                        <h4 className="">Legal Category</h4>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <select
                            name="categoryId1"
                            id="prdCategory1"
                            className="form-control"
                            value={categoryId12 || 'all'}
                            onChange={handleChangeCategory1}
                          >
                            {legalList1.length === 0 && <option value="all">Loading...</option>}
                            {legalList1.length !== 0 && <option value="all">All Category</option>}
                            {legalList1?.map((category, index) => (
                              <option
                                value={category?.categoryId || ''}
                                key={index}
                              >
                                {category?.categoryName}
                              </option>
                            ))}
                          </select>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )}

                  <Card className="product-filter-option">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="2"
                      className="w-100"
                    >
                      <h4 className="">Text</h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Search text"
                            aria-label="Search text"
                            aria-describedby="search-text"
                            value={searchText || ''}
                            name="search"
                            type="text"
                            onChange={handleChangeSearchText}
                          />
                          <InputGroup.Append>
                            <button
                              className="btn-ezy btn-ezy-primary"
                              onClick={handleSearchByText}
                              disabled={loading}
                            >
                              Search
                            </button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="product-filter-option">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="3"
                      className="w-100"
                    >
                      <h4 className="">Product Sales Type</h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body className="product-filter-option-box">
                        <Form.Group controlId="0">
                          <Form.Check
                            name="salesType"
                            type="radio"
                            label="None"
                            custom
                            onChange={() => handleSalesTypeIdChange(null)}
                          />
                        </Form.Group>
                        <Form.Group controlId="1">
                          <Form.Check
                            name="salesType"
                            type="radio"
                            label="Purchase"
                            custom
                            onChange={() => handleSalesTypeIdChange(1)}
                          />
                        </Form.Group>
                        <Form.Group controlId="2">
                          <Form.Check
                            name="salesType"
                            type="radio"
                            label="Bid"
                            custom
                            onChange={() => handleSalesTypeIdChange(2)}
                          />
                        </Form.Group>
                        <Form.Group controlId="3">
                          <Form.Check
                            name="salesType"
                            type="radio"
                            label="Hire"
                            custom
                            onChange={() => handleSalesTypeIdChange(3)}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="product-filter-option">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="4"
                      className="w-100"
                    >
                      <h4 className="">Product Scope</h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body className="product-filter-option-box">
                        <Form.Group controlId="14">
                          <Form.Check
                            name="score"
                            type="radio"
                            label="None"
                            custom
                            onChange={() => handleScopeIDChange(null)}
                          />
                        </Form.Group>
                        <Form.Group controlId="4">
                          <Form.Check
                            name="score"
                            type="radio"
                            label="Normal"
                            custom
                            onChange={() => handleScopeIDChange(1)}
                          />
                        </Form.Group>
                        <Form.Group controlId="5">
                          <Form.Check
                            name="score"
                            type="radio"
                            label="Special"
                            custom
                            onChange={() => handleScopeIDChange(2)}
                          />
                        </Form.Group>
                        <Form.Group controlId="6">
                          <Form.Check
                            name="score"
                            type="radio"
                            label="Featured"
                            custom
                            onChange={() => handleScopeIDChange(3)}
                          />
                        </Form.Group>
                        <Form.Group controlId="7">
                          <Form.Check
                            name="score"
                            type="radio"
                            label="Most Viewed"
                            custom
                            onChange={() => handleScopeIDChange(4)}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="product-filter-option">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="5"
                      className="w-100"
                    >
                      <h4 className="">Product Type</h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body className="product-filter-option-box">
                        <Form.Group controlId="15">
                          <Form.Check
                            name="type"
                            type="radio"
                            label="None"
                            custom
                            onChange={() => handleTypeIdChange(null)}
                          />
                        </Form.Group>
                        <Form.Group controlId="8">
                          <Form.Check
                            name="type"
                            type="radio"
                            label="Physical"
                            custom
                            onChange={() => handleTypeIdChange(1)}
                          />
                        </Form.Group>
                        <Form.Group controlId="9">
                          <Form.Check
                            name="type"
                            type="radio"
                            label="Digital"
                            custom
                            onChange={() => handleTypeIdChange(2)}
                          />
                        </Form.Group>
                        <Form.Group controlId="10">
                          <Form.Check
                            name="type"
                            type="radio"
                            label="Service"
                            custom
                            onChange={() => handleTypeIdChange(4)}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="product-filter-option">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="6"
                      className="w-100"
                    >
                      <h4 className="">Product Status</h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="6">
                      <Card.Body className="product-filter-option-box">
                        <Form.Group controlId="11">
                          <Form.Check
                            name="type"
                            type="radio"
                            label="Active"
                            custom
                            onChange={() => setStatus(true)}
                          />
                        </Form.Group>
                        <Form.Group controlId="12">
                          <Form.Check
                            name="type"
                            type="radio"
                            label="Inactive"
                            custom
                            onChange={() => setStatus(false)}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </Col>
          )}
          {/* Product section */}
          <Col xs={12} sm={8}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="breadcrumbs clearfix">
                  <ul className="clearfix">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      {categoryData?.categoryName ||
                        `${dataa == 1
                          ? 'All Catalogue'
                          : dataa == 2
                            ? 'All Special'
                            : 'All Category'
                        }`}
                    </li>
                  </ul>
                </div>
                <div className="single-category-product-box">
                  <h3>
                    {categoryData1?.categoryName || 'All Category'}{' '}
                    {productList?.count ? `(${productList?.count})` : ``}
                  </h3>
                  {dataa && (
                    <div style={{ display: 'flex', marginBottom: 30 }}>
                      <div className="search_option_col">
                        {/* <div className="search_option_col_icon">
                                <img
                                  src="/assets/img/search_option_col_icon_1.png"
                                  width="22"
                                  height="20"
                                  alt=""
                                />
                              </div> */}
                        <div className="search_option_col_content">
                          <div
                            className="custom-select_col"
                            style={{ display: 'flex' }}
                          >
                            <div
                              className="ezy-select"
                              style={{
                                marginRight: 15,
                                height: 34,
                                background: '#e0e0e0',
                                border: 'none',
                              }}
                            >
                              <input
                                style={{ height: 34, border: 'none' }}
                                value={edata}
                                placeholder={
                                  dataa == 1
                                    ? 'Enter Catalogue'
                                    : 'Enter Special'
                                }
                                onChange={handleChangeFiles}
                              />
                            </div>
                            <div className="ezy-select" style={{ width: 150 }}>
                              <select
                                defaultValue="all"
                                disabled={!provinceList}
                                onChange={handleChangeProvince}
                              >
                                <option value="all">All Provinces</option>
                                {provinceList &&
                                  provinceList.map((el, index) => (
                                    <option
                                      value={el?.provinceId || ''}
                                      key={index}
                                    >
                                      {el?.provinceName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="ezy-select" style={{ width: 150 }}>
                              <select
                                defaultValue="all"
                                disabled={!filteredCityList}
                                onChange={handleChangeCity}
                              >
                                <option value="all">All Cities</option>
                                {filteredCityList ? (
                                  filteredCityList.length ? (
                                    filteredCityList.map((el, index) => (
                                      <option
                                        value={el?.cityId || ''}
                                        key={index}
                                      >
                                        {el?.cityName}
                                      </option>
                                    ))
                                  ) : searchParam.emptyCity ? (
                                    <option disabled>No City</option>
                                  ) : (
                                    <option disabled>Loading...</option>
                                  )
                                ) : null}
                              </select>
                            </div>
                            <div className="ezy-select" style={{ width: 150 }}>
                              <select
                                defaultValue="all"
                                disabled={!filteredSuburbList}
                                onChange={handleChangeSururb}
                              >
                                <option value="all">All Suburbs</option>
                                {filteredSuburbList ? (
                                  filteredSuburbList.length ? (
                                    filteredSuburbList.map((el, index) => (
                                      <option
                                        value={el?.suburbId || ''}
                                        key={index}
                                      >
                                        {el?.suburbName}
                                      </option>
                                    ))
                                  ) : searchParam.emptySuburb ? (
                                    <option disabled>No Suburb</option>
                                  ) : (
                                    <option disabled>Loading...</option>
                                  )
                                ) : null}
                              </select>
                            </div>
                            <div className="ezy-select" style={{ width: 150 }}>
                              <select
                                // value={searchParam.category || categoryId}
                                defaultValue=""
                                disabled={!subCategoryList}
                                onChange={handleChangeSubCategory}
                              >
                                <option value="">All Category</option>
                                {subCategoryList ? (
                                  subCategoryList.length ? (
                                    subCategoryList.map((el, index) => (
                                      <option
                                        value={el?.categoryId || ''}
                                        key={index}
                                      >
                                        {el?.categoryName}
                                      </option>
                                    ))
                                  ) : (
                                    <option disabled>Loading...</option>
                                  )
                                ) : null}
                              </select>
                            </div>
                            <div
                              className={`parent_option open-`}
                              onClick={() => {
                                handleSubmit()
                              }}
                            // TODO: onBlur
                            >
                              <button
                                style={{
                                  width: 100,
                                  height: 34,
                                  border: 'none',
                                  background: '#e0e0e0',
                                }}
                              >
                                Search
                                <span>
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  />
                                </span>
                              </button>
                              {/* <ul className="main_option">{renderCategoryTree()}</ul> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Row className="justify-content-center">
                    {renderData.length ? (
                      renderData.map((product: any, index: number) => (
                        <Col sm={4} xs={12} key={index}>
                          <Product product={product} />
                        </Col>
                      ))
                    ) : (
                      <Empty text="No Product" />
                    )}
                  </Row>
                  <Row className="justify-content-center">
                    <Pagination
                      data={productList}
                      onChange={handleChangePage}
                      loading={loading}
                    />
                  </Row>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default LegalContractSection
