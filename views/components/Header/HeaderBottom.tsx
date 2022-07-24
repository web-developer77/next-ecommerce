import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Dispatch } from "redux"
import { createSelector } from "reselect"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import referenceService from "@services/referenceService"
import { GetCity_getCity_result } from "@services/referenceService/__generated__/GetCity"
import { GetSuburb_getSuburb_result } from "@services/referenceService/__generated__/GetSuburb"
import { GetMainCategory_getMstCategoryMain_result } from "@services/referenceService/__generated__/GetMainCategory"
import { GetCategoryByParentId_getMstCategoryByParentId_result } from "@services/referenceService/__generated__/GetCategoryByParentId"
import { GetProvince_getProvince_result } from "@services/referenceService/__generated__/GetProvince"
import { GetPrdCategory_getPrdCategoryList_result } from "@services/referenceService/__generated__/GetPrdCategory"
import {
  setProvinceList,
  setCityList,
  setSuburbList,
  setMainCategoryList,
  setSubCategoryList,
  setCategoryId,
  setNewsSliderKey,
  setPrdCategoryList,
} from "@views/containers/Reference/ReferenceSlice"
import { makeSelectReference } from "@views/containers/Reference/selectors"
import { domainData } from "@views/lib/constants"
import { AsyncPaginate } from "react-select-async-paginate"
import CategoriesListing from "../CategoriesListing"

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
})

const stateSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

let tempSubCategory: GetCategoryByParentId_getMstCategoryByParentId_result[]

const HeaderBottom = (props: any) => {
  const router = useRouter()
  const [search, setSearch] = useState<Boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const [searchToggle, setSearchToggle] = useState<Boolean>(false)
  const [selectToggle, setSelectToggle] = useState<Boolean>(false)
  const [searchParam, setSearchParam] = useState<any>({})
  const [searchParamAsync, setsearchParamAsync] = useState<any>({
    subCategoryId: {
      value: 1,
      label: "All Categories",
    },
    prdCategoryId: {
      value: 1,
      label: "All Categories",
    },
  })
  const {
    setProvinceList,
    setCityList,
    setSuburbList,
    setMainCategoryList,
    setSubCategoryList,
    setCategoryId,
    setNewsSliderKey,
    setPrdCategoryList,
  } = actionDispatch(useAppDispatch())
  const {
    provinceList,
    cityList,
    suburbList,
    mainCategoryList,
    subCategoryList,
    newsSliderKey,
    prdCategoryList,
  } = useAppSelector(stateSelector)

  const categoryId =
    props.categoryId || Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

  const fetchProvinceList = async () => {
    const result = await referenceService.getProvinceList()
    if (result) {
      setProvinceList(result)
    }
  }

  const fetchCityList = async () => {
    const result = await referenceService.getCityList()
    if (result) {
      setCityList(result)
    }
  }

  const fetchSuburbList = async () => {
    const result = await referenceService.getSuburbList()
    if (result) {
      setSuburbList(result)
    }
  }

  const fetchSubCategoryList = async (categoryId: number) => {
    const result = await referenceService.getCategoryListByParentId(categoryId)
    if (result) {
      // tempSubCategory = tempSubCategory
      //   ? [...tempSubCategory, ...result]
      //   : result
      setSubCategoryList(result)
    }
  }

  const fetchMainCategoryList = async () => {
    const result = await referenceService.getMainCategoryList()
    if (result) {
      setMainCategoryList(result)
      // result.forEach((el) => {
      //   if (el?.categoryId && el?.isMainCategory) {
      //     fetchSubCategoryList(el?.categoryId)
      //   }
      // })
      fetchSubCategoryList(categoryId)
    }
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

  const fetchPrdCategoryList = async () => {
    const result = await referenceService.getPrdCategoryList(null, 1, 100)
    if (result) {
      setPrdCategoryList(result)
    }
  }

  useEffect(() => {
    /* init search */
    if (!provinceList || !provinceList.length) fetchProvinceList()
    if (!cityList || !cityList.length) fetchCityList()
    if (!suburbList || !suburbList.length) fetchSuburbList()
    /* init category */
    // if (!mainCategoryList || !mainCategoryList.length)fetchMainCategoryList();
    /* Agreement prd category */
    // if (!prdCategoryList || !prdCategoryList.length)
    if (categoryId == 1447) {
      // fetchPrdCategoryList();
    } else {
      // fetchSubCategoryList(categoryId);
    }
    
  }, [props])

  const handleSelectAgreement = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleSelectLegal = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleChangeProvince = (e: any) => {
    setNewsSliderKey("attorney")
    if (e.target.value === "all") {
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
    setNewsSliderKey("attorney")
    if (e.target.value === "all") {
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
    setNewsSliderKey("attorney")
    if (e.target.value === "all") {
      setSearchParam({ ...searchParam, suburb: null })
    } else {
      setSearchParam({ ...searchParam, suburb: Number(e.target.value) })
    }
  }

  const handleChangeSubCategory = (e: any) => {
    setNewsSliderKey("attorney")
    if (e?.value) {
      setSearchParam({ ...searchParam, subCategoryId: Number(e.value) })
      setsearchParamAsync({ subCategoryId: e })
    } else {
      setSearchParam({ ...searchParam, subCategoryId: null })
      setsearchParamAsync({ subCategoryId: null })
    }
  }

  // legal help
  const handleChangeLegalSubCategory = (e: any) => {
    setNewsSliderKey("help")
    if (!e.target.value) {
      setSearchParam({ ...searchParam, domainCategoryIds: null })
    } else {
      setSearchParam({ ...searchParam, domainCategoryIds: e.target.value })
    }
  }

  // Agreement category
  const handleChangePrdCategory = (e: any) => {
    setNewsSliderKey("agreement")
    if (e?.value) {
      setSearchParam({ ...searchParam, prdCategoryId: Number(e.value) })
      setsearchParamAsync({ prdCategoryId: e })
    } else {
      setSearchParam({ ...searchParam, prdCategoryId: null })
      setsearchParamAsync({ prdCategoryId: null })
    }
  }

  const handleChangeMainCategory = (e: any) => {
    const categoryDate =
      domainData.find((el) => el.categoryId === Number(e.target.value)) ||
      domainData[0]
    // window.location.assign(`/${categoryDate.name}`)
  }

  const handleClickCategory = (categoryId: Number) => {
    // console.log(categoryId)
  }

  const renderCategoryTree = () => {
    return mainCategoryList?.map((el, index) => {
      const subItems = subCategoryList
        ? subCategoryList.filter((e) => e?.parentCategoryId === el?.categoryId)
        : null
      if (subItems && subItems.length) {
        return (
          <li className="have_chid" key={index}>
            <a rel="noreferrer noopener">{el?.categoryName}</a>
            <span>
              <i className="fa fa-angle-down" aria-hidden="true" />
            </span>
            <ul>
              {subItems?.map((item, index) => {
                if (item?.isMenuAllowed) {
                  return (
                    <li className="have_chid" key={index}>
                      <a onClick={() => handleClickCategory(item?.categoryId)}>
                        {item?.categoryName}
                      </a>
                      <span>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                      <ul>
                        <li>
                          <a>Son</a>
                        </li>
                        <li>
                          <a>Son</a>
                        </li>
                        <li>
                          <a>Son</a>
                        </li>
                        <li>
                          <a>Son</a>
                        </li>
                      </ul>
                    </li>
                  )
                } else {
                  return (
                    <li key={index}>
                      <a onClick={() => handleClickCategory(item?.categoryId)}>
                        {item?.categoryName}
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </li>
        )
      } else {
        return (
          <li key={index}>
            <a onClick={() => handleClickCategory(el?.categoryId)}>
              {el?.categoryName}
            </a>
          </li>
        )
      }
    })
  }

  const filteredCityList = searchParam.province
    ? cityList?.filter((el) => el.provinceId === searchParam.province)
    : null // cityList
  const filteredSuburbList = searchParam.city
    ? suburbList?.filter((el) => el.cityId === searchParam.city)
    : null // suburbList

  // Switch News Slider key
  const handleClickDropDown = (key: String) => {
    // setSearchToggle(false)
    setNewsSliderKey(key)
  }

  const handleSubmitSearch = (e: any) => {
    e.preventDefault()
    setSearchToggle(false)
    // Search ....
    switch (newsSliderKey) {
      case "attorney":
        router.push(
          {
            pathname: "/businesses",
            query: {
              text: searchText,
              province: searchParam?.province,
              city: searchParam?.city,
              suburb: searchParam?.suburb,
              subCategoryId: searchParam?.subCategoryId,
            },
          },
          // '/lawyers/attorneys',
        )
        break
      case "agreement":
        router.push(
          {
            pathname: "/listing",
            query: { categoryId: searchParam.prdCategoryId || "" },
          },
          "/listing",
        )
        break
      case "help":
        router.push(
          {
            pathname: "/lawyers",
            query: { domainCategoryIds: searchParam.domainCategoryIds || "" },
          },
          // '/lawyers',
        )
        break
      default:
        router.push({ pathname: "/listing" })
        break
    }
  }

  const loadCategories = async (
    search: any,
    loadedOptions: any,
    { page }: any,
  ) => {
    const res: any = await referenceService.getCategoryListByParentIdAsync(
      categoryId,
      page,
      10,
    )
    let options: any = []
    let hasMore = true
    
    if (page == 1)
      options.push({ value: 1, label: "All Categories" })
    if (res.result.length > 0) {
      if (res.nextPage === page) {
        hasMore = false
      }
      res.result.map((el: any, index: any) => {
        options.push({ value: el?.categoryId, label: el?.categoryName })
      })
    }

    return {
      options: options,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    }
  }

  const loadPrdCategory = async (
    search: any,
    loadedOptions: any,
    { page }: any,
  ) => {
    const res: any = await referenceService.getPrdCategoryListAsync(
      null,
      1,
      100,
    )
    let options: any = []
    let hasMore = true

    if (page == 1)
      options.push({ value: 1, label: "All Categories" })
    if (res.result.length > 0) {
      if (res.nextPage === page) {
        hasMore = false
      }
      res.result.map((el: any, index: any) => {
        options.push({ value: el?.categoryId, label: el?.categoryName })
      })
    }

    return {
      options: options,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    }
  }

  return (
    <section className="w-100">
      <div
        className={
          search
            ? "header-search hidden-mobile-area clearfix search-div d-block"
            : "header-search hidden-mobile-area clearfix"
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="search-content clearfix">
                <form onSubmit={handleSubmitSearch}>
                  <div className="search-form">
                    <label>
                      {props.categoryId == 1447
                        ? "Search Attorneys / Contracts:"
                        : props.categoryId == 1402
                        ? "SEARCH FILTERS"
                        : props.categoryId == 549
                        ? "SEARCH PART / SPARE "
                        : props.categoryId == 1672
                        ? "SEARCH BY TYRE SIZE "
                        : props.categoryId == 1396
                        ? "SEARCH FILTERS"
                        : props.categoryId == 1384
                        ? "SEARCH FILTERS"
                        : props.categoryId == 1384
                        ? "SEARCH FILTERS"
                        : props.categoryId == 0
                        ? "SEARCH FILTERS"
                        : "SEARCH MAG BY NAME OR SIZE"}
                    </label>
                    <div className="search-form-wrapper">
                      <input
                        type="text"
                        className="search-control"
                        placeholder={
                          props.categoryId == 1447
                            ? "Find Attorney / Agreements / Legal Help"
                            : props.categoryId == 1402
                            ? "SEARCH FILTERS"
                            : props.categoryId == 549
                            ? "Part / Spare to search"
                            : props.categoryId == 1672
                            ? "Select Here"
                            : props.categoryId == 1396
                            ? "Select Here"
                            : props.categoryId == 1384
                            ? "Select Here"
                            : props.categoryId == 1384
                            ? "Select Here"
                            : "Select Here"
                        }
                        name=""
                        onFocus={() => {
                          setSearchToggle(true)
                        }}
                        onBlur={() => {
                          setSearchToggle(false)
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      <div
                        className={`parent_option open-`}
                        onClick={() => {
                          setSearchToggle(false)
                        }}
                        // TODO: onBlur
                      >
                        <button>
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
                      <button type="submit" aria-label="search">
                        <i className="icon-search"></i>
                      </button>
                      <div
                        className={`search_option ${
                          searchToggle ? "open_search_opton" : ""
                        }`}
                      >
                        {/* <i
                          className="fa fa-angle-down"
                          aria-hidden="true"
                        /> */}
                        <ul
                          onMouseOver={() => {
                            setSelectToggle(true)
                          }}
                          onMouseOut={() => {
                            setSearchToggle(selectToggle || false)
                          }}
                        >
                          <li>
                            <div className="search_option_col">
                              <div className="search_option_col_icon">
                                <img
                                  src="/assets/img/search_option_col_icon_1.webp"
                                  width="22"
                                  height="20"
                                  alt="search_option_col_icon_1"
                                />
                              </div>
                              <div className="search_option_col_content">
                                <h3
                                  onClick={() =>
                                    handleClickDropDown("attorney")
                                  }
                                  className={
                                    newsSliderKey === "attorney" ? "active" : ""
                                  }
                                >
                                  {props.categoryId == 1447
                                    ? "Law Firm / Attorney"
                                    : props.categoryId == 1402
                                    ? ""
                                    : props.categoryId == 549
                                    ? ""
                                    : props.categoryId == 1672
                                    ? ""
                                    : props.categoryId == 1396
                                    ? ""
                                    : props.categoryId == 1384
                                    ? ""
                                    : props.categoryId == 1384
                                    ? ""
                                    : ""}
                                </h3>
                                <div className="custom-select_col">
                                  <div className="ezy-select">
                                    <select
                                      defaultValue="all"
                                      disabled={!provinceList}
                                      onChange={handleChangeProvince}
                                    >
                                      {provinceList === null && (
                                        <option value="all">Loading...</option>
                                      )}
                                      {provinceList && (
                                        <option value="all">
                                          All Provinces
                                        </option>
                                      )}
                                      {provinceList &&
                                        provinceList.map((el, index) => (
                                          <option
                                            value={el?.provinceId || ""}
                                            key={index}
                                          >
                                            {el?.provinceName}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                  <div className="ezy-select">
                                    <select
                                      defaultValue="all"
                                      disabled={!filteredCityList}
                                      onChange={handleChangeCity}
                                    >
                                      {filteredCityList === null && (
                                        <option value="all">Loading...</option>
                                      )}
                                      {filteredCityList && (
                                        <option value="all">All Cities</option>
                                      )}
                                      {filteredCityList ? (
                                        filteredCityList.length ? (
                                          filteredCityList.map((el, index) => (
                                            <option
                                              value={el?.cityId || ""}
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
                                  <div className="ezy-select">
                                    {" "}
                                    <select
                                      defaultValue="all"
                                      disabled={!filteredSuburbList}
                                      onChange={handleChangeSururb}
                                    >
                                      {filteredSuburbList === null && (
                                        <option value="all">Loading...</option>
                                      )}
                                      {filteredSuburbList && (
                                        <option value="all">
                                          All Suburbes
                                        </option>
                                      )}
                                      {filteredSuburbList ? (
                                        filteredSuburbList.length ? (
                                          filteredSuburbList.map(
                                            (el, index) => (
                                              <option
                                                value={el?.suburbId || ""}
                                                key={index}
                                              >
                                                {el?.suburbName}
                                              </option>
                                            ),
                                          )
                                        ) : searchParam.emptySuburb ? (
                                          <option disabled>No Suburb</option>
                                        ) : (
                                          <option disabled>Loading...</option>
                                        )
                                      ) : null}
                                    </select>
                                  </div>
                                  <div className="ezy-select header-select-custom">
                                    {/*  <select
                                      // value={searchParam.category || categoryId}
                                      defaultValue=""
                                      disabled={!subCategoryList}
                                      onChange={handleChangeSubCategory}
                                    >
                                      {subCategoryList === null && <option value="all">Loading...</option>}
                                      {subCategoryList && <option value="all">All Category</option>}
                                      {subCategoryList ? (
                                        subCategoryList.length ? (
                                          subCategoryList.map((el, index) => (
                                            <option
                                              value={el?.categoryId || ""}
                                              key={index}
                                            >
                                              {el?.categoryName}
                                            </option>
                                          ))
                                        ) : (
                                          <option disabled>Loading...</option>
                                        )
                                      ) : null}
                                    </select> */}
                                    {categoryId === 0 ? (
                                      <CategoriesListing
                                        setCategoryId={(catID: any) =>
                                          setSearchParam({
                                            ...searchParam,
                                            subCategoryId: catID,
                                          })
                                        }
                                      />
                                    ) : (
                                      <AsyncPaginate
                                        className="header-select-box"
                                        value={searchParamAsync.subCategoryId}
                                        onChange={handleChangeSubCategory}
                                        loadOptions={loadCategories}
                                        additional={{
                                          page: 1,
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div
                              className="search_option_col"
                              onClick={handleSelectAgreement}
                            >
                              <div className="search_option_col_icon">
                                <img
                                  src="/assets/img/search_option_col_icon_2.webp"
                                  width="23"
                                  height="19"
                                  alt="search_option_col_icon_2"
                                />
                              </div>
                              <div className="search_option_col_content">
                                <h3
                                  onClick={() =>
                                    handleClickDropDown("agreement")
                                  }
                                  className={
                                    newsSliderKey === "agreement"
                                      ? "active"
                                      : ""
                                  }
                                >
                                  {props.categoryId == 1447
                                    ? " Download Agreements / Contracts"
                                    : "Products"}
                                </h3>
                                <div className="custom-select_col">
                                  <p>select the agreements for search</p>
                                  <div className="ezy-select header-select-custom inner-select">
                                    {/* <select
                                      defaultValue="all"
                                      disabled={!prdCategoryList}
                                      onChange={handleChangePrdCategory}
                                    >
                                      {prdCategoryList === null && <option value="all">Loading...</option>}
                                      {prdCategoryList && <option value="all">All Category</option>}
                                      {prdCategoryList &&
                                        prdCategoryList.map((el, index) => (
                                          <option
                                            value={el?.categoryId || ""}
                                            key={index}
                                          >
                                            {el?.categoryName}
                                          </option>
                                        ))}
                                    </select> */}

                                    {categoryId === 0 ? (
                                      <CategoriesListing
                                        setCategoryId={(catID: any) =>
                                          setSearchParam({
                                            ...searchParam,
                                            prdCategoryId: catID,
                                          })
                                        }
                                      />
                                    ) : (
                                      <AsyncPaginate
                                        className="header-select-box"
                                        value={searchParamAsync.prdCategoryId}
                                        onChange={handleChangePrdCategory}
                                        loadOptions={loadPrdCategory}
                                        additional={{
                                          page: 1,
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          {props.categoryId == 1447 ||
                          props.categoryId == 1384 ? (
                            <li>
                              <div
                                className="search_option_col"
                                onClick={handleSelectLegal}
                              >
                                <div className="search_option_col_icon">
                                  <img
                                    src="/assets/img/search_option_col_icon_3.webp"
                                    width="22"
                                    height="22"
                                    alt="search_option_col_icon_3"
                                  />
                                </div>
                                <div className="search_option_col_content">
                                  <h3
                                    onClick={() => handleClickDropDown("help")}
                                    className={
                                      newsSliderKey === "help" ? "active" : ""
                                    }
                                  >
                                    {props.categoryId == 1447
                                      ? " Legal Help"
                                      : "Financial Help"}
                                  </h3>
                                  <div className="custom-select_col">
                                    <p>select the legal help for search</p>
                                    <div className="ezy-select inner-select">
                                      {/*  <select
                                      // value={searchParam.category || categoryId}
                                      defaultValue=""
                                      disabled={!subCategoryList}
                                      onChange={handleChangeLegalSubCategory}
                                    >
                                      {subCategoryList === null && <option value="all">Loading...</option>}
                                      {<option value="all">All Category</option>}
                                      {subCategoryList ? (
                                        subCategoryList.length ? (
                                          subCategoryList.map((el, index) => (
                                            <option
                                              value={el?.categoryId || ""}
                                              key={index}
                                            >
                                              {el?.categoryName}
                                            </option>
                                          ))
                                        ) : (
                                          <option disabled>Loading...</option>
                                        )
                                      ) : null}
                                    </select> */}
                                      <AsyncPaginate
                                        className="header-select-box"
                                        value={searchParamAsync.subCategoryId}
                                        onChange={handleChangeSubCategory}
                                        loadOptions={loadCategories}
                                        additional={{
                                          page: 1,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-right hidden-desktop-area">
        <button
          className="search-icon"
          aria-label="Search"
          onClick={() => setSearch(!search)}
        >
          <i className="icon-search"></i>
        </button>
      </div>
    </section>
  )
}

export default HeaderBottom
