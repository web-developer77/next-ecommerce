import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch } from 'redux'
import { Form, InputGroup } from 'react-bootstrap'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import referenceService from '@services/referenceService'
import { GetCity_getCity_result } from '@services/referenceService/__generated__/GetCity'
import { GetSuburb_getSuburb_result } from '@services/referenceService/__generated__/GetSuburb'
import { GetMainCategory_getMstCategoryMain_result } from '@services/referenceService/__generated__/GetMainCategory'
import { GetCategoryByParentId_getMstCategoryByParentId_result } from '@services/referenceService/__generated__/GetCategoryByParentId'
import { GetProvince_getProvince_result } from '@services/referenceService/__generated__/GetProvince'
import { GetPrdCategory_getPrdCategoryList_result } from '@services/referenceService/__generated__/GetPrdCategory'
import {
  setProvinceList,
  setCityList,
  setSuburbList,
  setMainCategoryList,
  setSubCategoryList,
  setCategoryId,
  setNewsSliderKey,
  setPrdCategoryList,
  setRegisteredUser,
} from '@views/containers/Reference/ReferenceSlice'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { RegisterUser_registerUser_result } from '@services/authService/__generated__/RegisterUser'
import authService from '@services/authService'
import { doLogin, doRegister } from '@views/lib/auth'
import { config } from '@views/lib/constants'
import { useToasts } from 'react-toast-notifications'
import { CategoriesListing } from '@views/components'
import { AsyncPaginate } from 'react-select-async-paginate'

const actionDispatch = (dispatch: Dispatch) => ({
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
  setNewsSliderKey: (key: String) => dispatch(setNewsSliderKey(key)),
  setPrdCategoryList: (data: GetPrdCategory_getPrdCategoryList_result[]) =>
    dispatch(setPrdCategoryList(data)),
  setRegisteredUser: (data: RegisterUser_registerUser_result) =>
    dispatch(setRegisteredUser(data)),
})

const stateSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)


const RequestAssistance = (props: any) => {
  const { addToast } = useToasts()
  const [step, setStep] = useState<Number>(1)
  const [searchParam, setSearchParam] = useState<any>({})
  const [emailValid, setEmailValid] = useState<string>('')
  const [pwdValid, setPwdValid] = useState<string>('')
  const [mobileValid, setMobileValid] = useState<string>('')
  const [forgotPwd, setForgotPwd] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchAsyncSelect, setSearchAsyncSelect] = useState<any>({
    subCategoryId: {
      value: 1,
      label: "All Categories",
    },
  })


  const { setCityList, setSuburbList, setRegisteredUser } = actionDispatch(
    useAppDispatch(),
  )
  const {
    provinceList,
    cityList,
    suburbList,
    subCategoryList,
  } = useAppSelector(stateSelector)

  const renderTtile = (step: Number) => {
    switch (step) {
      case 1:
        {
          if (props.categoryData.categoryId == 1447) {
            return { title: 'Legal Help', desc: 'Submit your legal query here.' }
          }
          else if (props.categoryData.categoryId == 1402) {
            return { title: 'SUBMIT ITEM', desc: 'LET US ASSIST IN WHAT YOU LOOKING FOR' }
          }
          else if (props.categoryData.categoryId == 549) {
            return { title: 'SUBMIT PART IMAGE AND', desc: 'REQUEST FOR QUOTES, FOR FREE!!' }
          }
          else if (props.categoryData.categoryId == 1672) {
            return { title: 'SUBMIT PART IMAGE AND', desc: 'REQUEST FOR QUOTES, FOR FREE!!' }
          }
          else if (props.categoryData.categoryId == 1396) {
            return { title: 'SUBMIT ITEM', desc: 'LET US ASSIST IN WHAT YOU LOOKING FOR' }
          }
          else if (props.categoryData.categoryId == 1384) {
            return { title: "REQUEST FOR ANY BANKING OR FINANCIAL PRODUCT", desc: 'HERE, FOR FREE!!' }
          }
          else if (props.categoryData.categoryId == 1342) {
            return { title: 'Legal Help', desc: 'Submit your legal query here.' }
          }
          else {
            return { title: 'SUBMIT DENT IMAGE ', desc: 'REQUEST FOR QUOTES, FOR FREE!!' }
          }
        }

      case 2:
        return { title: 'Select Legal Category', desc: 'Please choose' }
      case 3:
        return { title: 'Select Location', desc: 'Please choose' }
      case 4:
        return { title: 'Upload Image', desc: 'Upload here' }
      case 5:
        return { title: 'Register', desc: '' }
      default:
        return { title: '', desc: '' }
    }
  }
  /* Step 1 */
  const handleSubmitEnquiry = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setStep(+step + 1)
  }

  /* Step 3 (PCS) */
  const fetchSuburbListByCityId = async (cityId: number) => {
    setSuburbList([])
    const result = await referenceService.getSuburbListByCityId(cityId)
    if (result) {
      // console.log('suburb => ', result)
      setSuburbList(result)
      if (!result.length) setSearchParam({ ...searchParam, emptySuburb: true })
    }
  }

  const fetchCityListByProvinceId = async (provinceId: number) => {
    setCityList([])
    const result = await referenceService.getCityListByProvinceId(provinceId)
    if (result) {
      // console.log('city => ', result)
      setCityList(result)
      if (!result.length) setSearchParam({ ...searchParam, emptyCity: true })
    }
  }

  const handleChangeSubCategory = (e: any) => {
    console.log(e)
    if (e?.value) {
      console.log(e?.value)
      setSearchAsyncSelect({ subCategoryId: e })
      setSearchParam({ ...searchParam, subCategoryId: Number(e?.value) })
    } else {
      setSearchParam({ ...searchParam, subCategoryId: null });
      setSearchAsyncSelect({ subCategoryId: null })
    }
  }

  const handleChangeProvince = (e: any) => {
    if (e.target.value === '') {
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
    if (e.target.value === '') {
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
    if (e.target.value === '') {
      setSearchParam({ ...searchParam, suburb: null })
    } else {
      setSearchParam({ ...searchParam, suburb: Number(e.target.value) })
    }
  }

  /* Step 4 (Image Upload) */
  const handleChangeFiles = (e: any) => {
    const promiseArr = []
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 20 * 1024 * 1024) {
        alert(`Image ${e.target.files[i].name} size cannot be more than 20mb.`)
        break
      }
      promiseArr.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(e.target.files[i])
          reader.onload = async () => {
            // console.log(reader.result)
            resolve(reader.result)
          }
          reader.onerror = (e) => reject(e)
        }),
      )
    }
    console.log('e.target.files', e.target.files)
    Promise.all(promiseArr).then((result) => {
      setSearchParam({
        ...searchParam,
        images: searchParam.images
          ? [...searchParam.images, ...result]
          : [...result],
        files: searchParam.files
          ? [...searchParam.files, ...e.target.files]
          : [...e.target.files],
      })
    })
  }

  /* post Mst Item request (API) */
  const postMstItemRequest = async () => {
    const files = searchParam.files?.length ? searchParam.files : null;
    // (searchParam.images?.length &&
    //   searchParam.images?.map((e: string) => e.split(';base64,').pop())) ||
    // null
    console.log({ searchParam, files })
    // return
    const result = await referenceService.postMstItemRequest(
      {
        itemRequestId: null,
        userId: null,
        itemRequestTitle: searchParam.enquiry,
        itemRequestDescription: searchParam.enquiryDesc,
        itemRequestDate: null,
        itemRequestStatusId: null,
        selectedCompany: null,
        categoryId: Number(searchParam.subCategoryId),
        provinceId: Number(searchParam.province),
        cityId: Number(searchParam.city),
        suburbId: Number(searchParam.suburb),
        requestApprovedMail: null,
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
      },
      files,
    )
    console.log(result)
    if (result?.success) {
      addToast('Successfully requested Legal Assistance!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setStep(1)
      setSearchParam({})
    } else {
      addToast('Failed to request Legal Assistance', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  /* Step 5 (Submit) */
  const responseFacebook = async (response: any) => {
    console.log(response)
    const { email, name, userID, picture, accessToken } = response
    if (!userID || !accessToken) {
      addToast('FaceBook OAuth Error. Try again', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }
    // emailCheck
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const token = 'Basic ' + window.btoa(`${userID}:3`)
      const loginRes = await authService.oAuth(token)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in with Facebook!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        postMstItemRequest()
        return
      } else {
        addToast('Failed to login with Facebook', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      return
    }

    setLoading(true)
    const result = await doRegister(
      email,
      userID,
      null,
      picture.data.url,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
      null,
      null,
      searchParam.province,
      provinceList?.find((e) => e.provinceId === searchParam.province)
        ?.provinceName || null,
      searchParam.city,
      cityList?.find((e) => e.cityId === searchParam.city)?.cityName || null,
      searchParam.suburb,
      suburbList?.find((e) => e.suburbId === searchParam.suburb)?.suburbName ||
      null,
      searchParam.subCategoryId,
      accessToken,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered with Facebook!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      postMstItemRequest()
    } else {
      addToast('Failed to register with Facebook', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  const responseGoogle = async (response: any) => {
    console.log(response)
    if (response?.error) {
      addToast('Google OAuth Error. Try again', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }
    const {
      googleId,
      accessToken,
      tokenId,
      profileObj: { email, name, imageUrl: picture },
    } = response
    // emailCheck
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const token = 'Basic ' + window.btoa(`${googleId}:4`)
      const loginRes = await authService.oAuth(token)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in with Google!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        postMstItemRequest()
        return
      } else {
        addToast('Failed to login with Google', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      return
    }

    setLoading(true)
    const result = await doRegister(
      email,
      null,
      googleId,
      picture,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
      null,
      null,
      searchParam.province,
      provinceList?.find((e) => e.provinceId === searchParam.province)
        ?.provinceName || null,
      searchParam.city,
      cityList?.find((e) => e.cityId === searchParam.city)?.cityName || null,
      searchParam.suburb,
      suburbList?.find((e) => e.suburbId === searchParam.suburb)?.suburbName ||
      null,
      searchParam.subCategoryId,
      null,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered  with Google!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      postMstItemRequest()
    } else {
      addToast('Failed to register with Google', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  const handleSubmitRequest = async (e: any) => {
    e.preventDefault()

    // password vaild
    if (!/^(?:(?=.*\d)(?=.*[A-Z]).*)$/.test(searchParam.password)) {
      setPwdValid('Include one capital letter and one number or more')
      return
    }
    setPwdValid('')

    // mobile vaild
    if (
      !searchParam.mobileNumber.match(/^(\+\d{1,3}[- ]?)?\d{9}$/) ||
      searchParam.mobileNumber.match(/0{5,}/)
    ) {
      setMobileValid('Invaild Mobile Number')
      return
    }
    setMobileValid('')

    // emailCheck
    const result1 = await authService.emailCheck(searchParam.email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const loginRes = await doLogin(searchParam.email, searchParam.password)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        postMstItemRequest()
        return
      } else {
        addToast('Password is not correct', {
          appearance: 'error',
          autoDismiss: true,
        })
        setForgotPwd(true)
        return
      }

      // setEmailValid(result1.message)
      // return
    }
    setEmailValid('')

    // mobileCheck
    const result2 = await authService.mobileCheck(searchParam.mobileNumber)
    console.log(result2)
    if (result2?.result !== 'true') {
      addToast(result2?.message || 'Phone Number already exists', {
        appearance: 'error',
        autoDismiss: true,
      })
      setMobileValid(result2?.message || 'Phone Number already exists')
      return
    }
    setMobileValid('')

    // submitting...
    console.log(searchParam)
    setLoading(true)
    const result = await doRegister(
      searchParam.email,
      null,
      null,
      searchParam.images ? searchParam.images : null,
      null,
      null,
      searchParam.mobileNumber,
      searchParam.password,
      searchParam.province,
      provinceList?.find((e) => e.provinceId === searchParam.province)
        ?.provinceName || null,
      searchParam.city,
      cityList?.find((e) => e.cityId === searchParam.city)?.cityName || null,
      searchParam.suburb,
      suburbList?.find((e) => e.suburbId === searchParam.suburb)?.suburbName ||
      null,
      searchParam.subCategoryId,
      null,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      postMstItemRequest()
    } else {
      addToast('Failed to register', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const loadCategories = async (search: any, loadedOptions: any, { page }: any) => {
    const res: any = await referenceService.getCategoryListByParentIdAsync(props.categoryData.categoryId, page, 10)
    let options: any = [];
    let hasMore = true;
    if (page == 1)
      options.push({ value: 1, label: "All Categories" })
    console.log(page)
    if (res.result.length > 0) {
      if (res.nextPage === page) {
        hasMore = false
      } 
      res.result.map((el: any, index: any) => {
        options.push({ value: el?.categoryId,label: el?.categoryName});
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

  return (
    <div className={`request-item ${props.className || ''}`}>
      <h3>{props.categoryData.categoryId == 1447 ? "Request Legal Assistance" : props.categoryData.categoryId == 1402 ? "SUBMIT YOUR REQUEST HERE !!" : props.categoryData.categoryId == 549 ? "SUBMIT YOUR REQUEST HERE !!" : props.categoryData.categoryId == 1672 ? "SUBMIT YOUR REQUEST HERE !!" : props.categoryData.categoryId == 1396 ? "SUBMIT YOUR REQUEST HERE !!" : props.categoryData.categoryId == 1384 ? "SUBMIT YOUR REQUEST HERE !!" : props.categoryData.categoryId == 1384 ? "SUBMIT YOUR REQUEST HERE !!" : "SUBMIT YOUR REQUEST HERE !!"}</h3>
      <div className="request-item-box">
        <h3>{renderTtile(step).title}</h3>
        <p className="mb-0">{renderTtile(step).desc}</p>
        <div className="request-item-form">
          {/* Request Steps 1 ~ 5 */}
          {step === 1 ? (
            <Form onSubmit={handleSubmitEnquiry}>
              <div className="request-item-form-box mb-2">
                <Form.Group controlId="item_title">
                  <Form.Label>
                    {props.categoryData.categoryId == 1447 ? "Enquiry:" : props.categoryData.categoryId == 1402 ? "Item Required" : props.categoryData.categoryId == 549 ? "Title" : props.categoryData.categoryId == 1672 ? "Title" : props.categoryData.categoryId == 1396 ? "Item Required" : props.categoryData.categoryId == 1384 ? "Finance" : props.categoryData.categoryId == 1384 ? "Finance" : "Title"}
                  </Form.Label>
                  <Form.Control
                    name="item_title"
                    onChange={(e) =>
                      setSearchParam({
                        ...searchParam,
                        enquiry: e.target.value,
                      })
                    }
                    value={searchParam.enquiry || ''}
                    required
                  />
                </Form.Group>
              </div>
              <div className="request-item-form-box">
                <Form.Group controlId="item_description">
                  <Form.Label>
                    {props.categoryData.categoryId == 1447 ? "Enquiry Description:" : props.categoryData.categoryId == 1402 ? "Description" : props.categoryData.categoryId == 549 ? "Description" : props.categoryData.categoryId == 1672 ? "Description" : props.categoryData.categoryId == 1396 ? "Description" : props.categoryData.categoryId == 1384 ? "Description " : props.categoryData.categoryId == 1384 ? "Description" : "Description"}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="item_description"
                    rows={3}
                    placeholder=""
                    onChange={(e) =>
                      setSearchParam({
                        ...searchParam,
                        enquiryDesc: e.target.value,
                      })
                    }
                    value={searchParam.enquiryDesc || ''}
                    required
                  />
                </Form.Group>
              </div>
              <div className="request-item-form-box">
                <button
                  type="submit"
                  className="btn-ezy btn-ezy-primary w-100"
                  aria-label="Next"
                // disabled={!searchParam.enquiry || !searchParam.enquiryDesc}
                >
                  Next
                </button>
              </div>
            </Form>
          ) : step === 2 ? (
            <form>
              <div className="request-item-form-box">
                <label htmlFor="item_category">Category:</label>
                {
                  props.categoryData.categoryId !== 0 ?
                    <>
                      {/*  <select
                        placeholder="Select category"
                        name="item_category"
                        id="item_category"
                        value={searchParam.subCategoryId || ''}
                        disabled={!subCategoryList}
                        onChange={handleChangeSubCategory}
                      >
                        <option value="">All Category</option>
                        {subCategoryList ? (
                          subCategoryList.length ? (
                            subCategoryList.map((el, index) => (
                              <option value={el?.categoryId || ''} key={index}>
                                {el?.categoryName}
                              </option>
                            ))
                          ) : (
                            <option disabled>Loading...</option>
                          )
                        ) : null}
                      </select> */}
                      {console.log("searchParam", searchParam.subCategoryId)}
                      <AsyncPaginate
                        value={searchAsyncSelect.subCategoryId}
                        onChange={handleChangeSubCategory}
                        loadOptions={loadCategories}
                        additional={{
                          page: 1,
                        }}
                      />
                    </> :
                    <>
                      <CategoriesListing setCategoryId={(catID: any) => setSearchParam({ ...searchParam, subCategoryId: catID })} />
                    </>
                }
              </div>
              <div className="request-item-form-box d-flex justify-content-between">
                <button
                  type="button"
                  className="btn-ezy btn-ezy-secondary"
                  aria-label="Prev"
                  onClick={() => setStep(+step - 1)}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="btn-ezy btn-ezy-primary"
                  aria-label="Next"
                  onClick={() => setStep(+step + 1)}
                  disabled={!searchParam.subCategoryId}
                >
                  Next
                </button>
              </div>
            </form>
          ) : step === 3 ? (
            <form>
              <div className="request-item-form-box">
                <label htmlFor="province">Province:</label>
                <select
                  placeholder="Select provience"
                  name="province"
                  id="province"
                  value={searchParam.province || ''}
                  disabled={!provinceList}
                  onChange={handleChangeProvince}
                >
                  <option value="">All Provinces</option>
                  {provinceList &&
                    provinceList.map((el, index) => (
                      <option value={el?.provinceId || ''} key={index}>
                        {el?.provinceName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="request-item-form-box">
                <label htmlFor="city">City:</label>
                <select
                  placeholder="Select city"
                  name="city"
                  id="city"
                  value={searchParam.city || ''}
                  disabled={!cityList}
                  onChange={handleChangeCity}
                >
                  <option value="">All Cities</option>
                  {cityList ? (
                    cityList.length ? (
                      cityList.map((el, index) => (
                        <option value={el?.cityId || ''} key={index}>
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
              <div className="request-item-form-box">
                <label htmlFor="suburb">Suburb:</label>
                <select
                  placeholder="Select suburb"
                  name="suburb"
                  id="suburb"
                  value={searchParam.suburb || ''}
                  disabled={!suburbList}
                  onChange={handleChangeSururb}
                >
                  <option value="">All Suburbs</option>
                  {suburbList ? (
                    suburbList.length ? (
                      suburbList.map((el, index) => (
                        <option value={el?.suburbId || ''} key={index}>
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
              <div className="request-item-form-box d-flex justify-content-between">
                <button
                  type="button"
                  className="btn-ezy btn-ezy-secondary"
                  aria-label="Prev"
                  onClick={() => setStep(+step - 1)}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="btn-ezy btn-ezy-primary"
                  aria-label="Next"
                  onClick={() => setStep(+step + 1)}
                  disabled={
                    !searchParam.province ||
                    !searchParam.city ||
                    !searchParam.suburb
                  }
                >
                  Next
                </button>
              </div>
            </form>
          ) : step === 4 ? (
            <form>
              <div className="request-item-form-box">
                <label htmlFor="upload" className="w-100">
                  Upload
                  <div
                    className="upload-input text-center"
                  /* style={{
                    backgroundImage:
                      searchParam?.images && searchParam?.images[0]
                        ? `url(${searchParam.images[0]})`
                        : 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto 100%',
                    backgroundPosition: 'center',
                  }} */
                  >
                    <i className="fa fa-upload text-secondary" />
                    <p className="text-secondary">Click to upload</p>
                  </div>
                </label>
                <input
                  type="file"
                  hidden
                  id="upload"
                  multiple
                  onChange={handleChangeFiles}
                  accept="image/*"
                />
                <span className="text-secondary">
                  <span className="text-primary">Note:</span>Image or dc size
                  cannot be more than 20mb.
                </span>
                <div className="image-preview mt-2">
                  {searchParam.images?.map((image: any, index: number) => (
                    <div className="mr-1 position-relative">
                      <img
                        src={image}
                        alt={`bannersec-image-${index}`}
                        key={index}
                        width="100"
                        height="80"
                      />
                      <i
                        className="fa fa-close close"
                        onClick={() =>
                          setSearchParam({
                            ...searchParam,
                            images: searchParam.images?.filter(
                              (e: string) => e !== image,
                            ),
                            files: searchParam.files?.filter(
                              (e: any) => e.name !== image.name,
                            ),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="request-item-form-box d-flex justify-content-between">
                <button
                  type="button"
                  className="btn-ezy btn-ezy-secondary"
                  aria-label="Prev"
                  onClick={() => setStep(+step - 1)}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="btn-ezy btn-ezy-primary"
                  aria-label="Next"
                  onClick={() => setStep(+step + 1)}
                >
                  Next
                </button>
              </div>
            </form>
          ) : step === 5 ? (
            <Form onSubmit={handleSubmitRequest}>
              <Form.Group className="mb-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  required
                  onChange={(e: any) =>
                    setSearchParam({
                      ...searchParam,
                      email: e.target.value,
                    })
                  }
                  value={searchParam.email || ''}
                />
                {emailValid && (
                  <Form.Text className="text-danger">{emailValid}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Mobile Number</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">+27</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Enter mobile number"
                    aria-describedby="inputGroupPrepend"
                    name="phone"
                    required
                    onChange={(e) =>
                      setSearchParam({
                        ...searchParam,
                        mobileNumber: e.target.value.slice(0, 9),
                      })
                    }
                    value={searchParam.mobileNumber || ''}
                  />
                </InputGroup>
                {mobileValid && (
                  <Form.Text className="text-danger">{mobileValid}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  required
                  onChange={(e: any) =>
                    setSearchParam({
                      ...searchParam,
                      password: e.target.value,
                    })
                  }
                  value={searchParam.password || ''}
                />
                {pwdValid && (
                  <Form.Text className="text-danger">{pwdValid}</Form.Text>
                )}
                {forgotPwd && (
                  <Form.Text className="text-danger text-right cursor-pointer">
                    <Link href="/forgot">Forgot password?</Link>
                  </Form.Text>
                )}
              </Form.Group>
              <div className="request-item-form-box mb-0">
                <hr />
                <span className="hr-text text-secondary">Or</span>
              </div>
              <div className="request-item-form-box mb-0 d-flex justify-content-between">
                <FacebookLogin
                  appId={config?.facebookAppId || ''}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon my-1 xs-w-100 px-1"
                  icon="fa-facebook mr-2"
                  textButton="Facebook"
                />
                <GoogleLogin
                  clientId={config?.googleClientId || ''}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon ml-2 my-1 xs-w-100 px-1"
                    >
                      <i className="fa fa-google mr-2" aria-hidden="true"></i>
                      Google
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <div className="request-item-form-box mb-0 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn-ezy btn-ezy-secondary"
                  aria-label="Prev"
                  onClick={() => setStep(+step - 1)}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="btn-ezy btn-ezy-primary"
                  aria-label="Request"
                  disabled={loading}
                >
                  Request
                </button>
              </div>
            </Form>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default RequestAssistance
