import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import style from './component.module.scss'
import ListItem from './listItem'
import Pagination from '@views/elements/pagination'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import businessService from '@services/businessService'
import referenceService from '@services/referenceService'
import { GetCity_getCity_result } from '@services/referenceService/__generated__/GetCity'
import { GetSuburb_getSuburb_result } from '@services/referenceService/__generated__/GetSuburb'
import { GetMainCategory_getMstCategoryMain_result } from '@services/referenceService/__generated__/GetMainCategory'
import { GetCategoryByParentId_getMstCategoryByParentId_result } from '@services/referenceService/__generated__/GetCategoryByParentId'
import { GetProvince_getProvince_result } from '@services/referenceService/__generated__/GetProvince'
import { GetBusiness } from '@services/businessService/__generated__/GetBusiness'
import { setBusinessList } from '@views/containers/Attorneys/AttorneyPageSlice'
import { makeSelectBusinessList } from '@views/containers/Attorneys/selectors'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import {
  setProvinceList,
  setCityList,
  setSuburbList,
  setMainCategoryList,
  setSubCategoryList,
  setCategoryId,
} from '@views/containers/Reference/ReferenceSlice'
import { Loading, Toast, Empty, Input, Select } from '@views/elements'
import QuestionModal from '../QuestionModal'
import { getRouterParamValue } from '@views/lib/helper'
import { AsyncPaginate } from 'react-select-async-paginate'

const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID);

const actionDispatch = (dispatch: Dispatch) => ({
  setBusinessList: (page: GetBusiness[]) => dispatch(setBusinessList(page)),
  setProvinceList: (data: GetProvince_getProvince_result[]) =>
    dispatch(setProvinceList(data)),
  setCityList: (data: GetCity_getCity_result[]) => dispatch(setCityList(data)),
  setSuburbList: (data: GetSuburb_getSuburb_result[]) =>
    dispatch(setSuburbList(data)),
  setMainCategoryList: (data: GetMainCategory_getMstCategoryMain_result[]) =>
    dispatch(setMainCategoryList(data)),
  setSubCategoryList: (
    data: GetCategoryByParentId_getMstCategoryByParentId_result[],
  ) => dispatch(setSubCategoryList(data)),
  setCategoryId: (data: number) => dispatch(setCategoryId(data)),
})

const stateSelector = createSelector(
  makeSelectBusinessList,
  (businessList) => ({
    businessList,
  }),
)

const referenceSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const AttorneyLists = (props: any) => {
  console.log("inside iamge checking BusinessList",props);
  const { _businessList } = props
  const router = useRouter()

  // Get Query Params
  const text = getRouterParamValue(router.query?.text)
  const province = getRouterParamValue(router.query?.province, "number")
  const city = getRouterParamValue(router.query?.city, "number")
  const suburb = getRouterParamValue(router.query?.suburb, "number")
  const subCategoryId = getRouterParamValue(router.query?.subCategoryId, "number")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [searchParam, setSearchParam] = useState<any>({
    text,
    province,
    city,
    suburb,
    subCategoryId,
  })
  const [searchParamAsync, setsearchParamAsync] = useState<any>({ subCategoryId: {value: 0, label: "All Category"}});
  const [activeCompayId, setActiveCompanyId] = useState<any>(null)
  const [questionModalShow, setQuestionModalShow] = useState<boolean>(false)
  const { setBusinessList } = actionDispatch(useAppDispatch())
  const { businessList } = useAppSelector(stateSelector)
  const {
    provinceList,
    cityList,
    suburbList,
    subCategoryList,
  } = useAppSelector(referenceSelector)
  const { setCityList, setSuburbList } = actionDispatch(useAppDispatch())

  const fetchBusinessList = async (page: number | null) => {
    console.log('searchParam', searchParam)
    let provinceIds = searchParam?.province
    let cityIds = searchParam?.city
    let suburbIds = searchParam?.suburb

    if (!provinceIds) {
      provinceIds = provinceList?.map(list => list.provinceId).join(',')
      cityIds = null
    }

    if (searchParam?.province && !cityIds) {
      cityIds = cityList?.map(list => list.cityId).join(',')
      suburbIds = null
    }

    if (searchParam?.city && !suburbIds) {
      suburbIds = suburbList?.map(list => list.suburbId).join(',')
    }


    setLoading(true)
    const result = await businessService
      .getBusinessList(
        null,
        searchParam.text || null,
        null,
        null,
        `${process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID}${searchParam?.subCategoryId ? `, ${searchParam?.subCategoryId}` : ``
        }`,
        provinceIds ? provinceIds.toString() : null,
        cityIds ? cityIds.toString() : null,
        suburbIds ? suburbIds.toString() : null,
        null,
        page || null,
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)
    let response: any = result
    if (response?.success) {
      setBusinessList(response)
    } else {
      setError(true)
    }
  }

  const handleChangePage = (page: number) => {
    fetchBusinessList(page)
  }

  const handleChange = (e: any) => {
    setSearchParam({ ...searchParam, text: e.target.value })
  }

  const fetchCityListByProvinceId = async (provinceId: number) => {
    setCityList([])
    const result = await referenceService.getCityListByProvinceId(provinceId)
    if (result) {
      setCityList(result)
      if (!result.length) setSearchParam({ ...searchParam, emptyCity: true })
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

  const handleChangeProvince = (e: any) => {
    if (!e.target.value) {
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

  const handleChangeCity = (e: any) => {
    if (!e.target.value) {
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

  const handleChangeSururb = (e: any) => {
    if (!e.target.value) {
      setSearchParam({ ...searchParam, suburb: null })
    } else {
      setSearchParam({ ...searchParam, suburb: Number(e.target.value) })
    }
  }

  /* const handleChangeSubCategory = (e: any) => {
    if (!e.target.value) {
      setSearchParam({ ...searchParam, subCategoryId: null })
    } else {
      setSearchParam({ ...searchParam, subCategoryId: Number(e.target.value) })
    }
    // setCategoryId(Number(e.target.value))
    // const categoryDate =
    //   domainData.find((el) => el.categoryId === Number(e.target.value)) ||
    //   domainData[0]
    // window.location.assign(`/${categoryDate.name}`)
  } */

  const handleChangeSubCategory = (e: any) => {
    if (e?.value) {
      setSearchParam({ ...searchParam, subCategoryId: Number(e.value) });
      setsearchParamAsync({ subCategoryId: e });
    } else {
      setSearchParam({ ...searchParam, subCategoryId: null });
      setsearchParamAsync({ subCategoryId: null });
    }
  };

  const loadSubCategory = async (search: any, loadedOptions: any, { page }: any) => {
    const res: any = await referenceService.getCategoryListByParentIdAsync(categoryId, page, 10)
    console.log("resutls", res)
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

  const handleSearch = () => {
    fetchBusinessList(null)
  }

  useEffect(() => {
    // if (!businessList || !businessList.result || businessList.result.length < 2)
    console.log('_businessList', _businessList)
    if (_businessList) {
      setBusinessList(_businessList)
    } else {
      fetchBusinessList(null)
    }
  }, [])

  const filteredCityList = searchParam.province
    ? cityList?.filter((el) => el.provinceId === searchParam.province)
    : null // cityList
  const filteredSuburbList = searchParam.city
    ? suburbList?.filter((el) => el.cityId === searchParam.city)
    : null // suburbList

  const onContact = (companyId: number) => {
    setActiveCompanyId(companyId)
    const activeCompany = businessList?.result?.find(
      (e) => e?.companyId === companyId,
    )
    setSearchParam({ ...searchParam, title: activeCompany?.companyName || '' })
    setQuestionModalShow(true)
  }

  let renderData = businessList?.result?.length
    ? businessList?.result
    : []

  return (
    <Container className={style.main}>
      <Row className={style.header}>
        <Col xs={12}>
          <h5>Search Result</h5>
          <h5 className="text-primary">
            {`"${loading ? 0 : businessList?.count || 0
              }" 
            ${categoryId == 1447 ? "Attorneys Or Lawyers Law Firm " : categoryId == 1402 ? "Results Found" : categoryId == 549 ? "Results Found" : categoryId == 1672 ? "Results Found" : categoryId == 1396 ? "Results Found" : categoryId == 1384 ? "Results Found" : categoryId == 1342 ? "Results Found" : ""}
            `}
          </h5>
          <br />
        </Col>
        <Col xs={12} md={5}>
          <Input
            onChange={handleChange}
            name=""
            placeholder="Enter Company / Products Name"
            preIcon={<i className="fa fa-search" />}
            value={searchParam?.text || ''}
            disabled={loading}
          />
        </Col>
        <Col xs={12} md={5} className="d-flex">
          <Select
            onChange={handleChangeProvince}
            name=""
            placeholder=""
            disabled={!provinceList || loading}
            value={searchParam?.province || ''}
            options={[
              ...[{ value: '', label: 'All Provinces' }],
              ...(provinceList || []).map((el, index) => ({
                value: el?.provinceId,
                label: el?.provinceName,
              })),
            ]}
          />
          <Select
            onChange={handleChangeCity}
            name=""
            placeholder=""
            disabled={!filteredCityList || loading}
            value={searchParam?.city || ''}
            options={[
              ...[{ value: '', label: 'All Cities' }],
              ...(filteredCityList || []).map((el, index) => ({
                value: el?.cityId,
                label: el?.cityName,
              })),
            ]}
          />
          <Select
            onChange={handleChangeSururb}
            name=""
            placeholder=""
            disabled={!filteredSuburbList || loading}
            value={searchParam?.suburb || ''}
            options={[
              ...[{ value: '', label: 'All Suburbs' }],
              ...(filteredSuburbList || []).map((el, index) => ({
                value: el?.suburbId,
                label: el?.suburbName,
              })),
            ]}
          />
          {/*  <Select
            onChange={handleChangeSubCategory}
            // value={categoryId}
            name=""
            placeholder=""
            disabled={!subCategoryList || loading}
            value={searchParam?.subCategoryId || ''}
            options={[
              ...[{ value: '', label: 'All Category' }],
              ...(subCategoryList || []).map((el, index) => ({
                value: el?.categoryId,
                label: el?.categoryName,
              })),
            ]}
          /> */}
          <AsyncPaginate
            className="business-list-category-select-box"
            value={searchParamAsync?.subCategoryId}
            onChange={handleChangeSubCategory}
            loadOptions={loadSubCategory}
            // placeholder="All Category"
            additional={{
              page: 1,
            }}
          />
        </Col>
        <Col xs={12} md={2}>
          <button
            className="btn-ezy btn-ezy-primary float-right w-100"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </button>
        </Col>
      </Row>
      <Row className="searching_list">
        {loading ? (
          <Loading />
        ) : renderData.length ? (
          renderData.map((item, index) => (
            <ListItem key={index} data={item} onContact={onContact} />
          ))
        ) : (
          <Empty text="No Business" />
        )}
      </Row>
      <Pagination
        data={businessList}
        onChange={handleChangePage}
        loading={loading}
      />
      {/* {error && <Toast />} */}
      <QuestionModal
        show={questionModalShow}
        toggle={setQuestionModalShow}
        companyId={activeCompayId}
        title="Contact Attorney"
      />
    </Container>
  )
}

export default AttorneyLists
