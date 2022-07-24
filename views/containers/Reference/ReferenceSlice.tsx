import { createSlice } from '@reduxjs/toolkit'
import { IReferenceState } from './types'

const initialState: IReferenceState = {
  provinceList: null,
  cityList: null,
  suburbList: null,
  mainCategoryList: null,
  subCategoryList: null,
  categoryId: Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID),
  newsSliderKey: "",
  prdCategoryList: null,
  registeredUser: null,
  postList: null,
  jobList: null,
  packageList: null,
  packageDetailList: null,
}
const ReferenceSlice = createSlice({
  name: 'reference',
  initialState,
  reducers: {
    setProvinceList: (state, action) => {
      state.provinceList = action.payload
    },
    setCityList: (state, action) => {
      state.cityList = action.payload
    },
    setSuburbList: (state, action) => {
      state.suburbList = action.payload
    },
    setMainCategoryList: (state, action) => {
      state.mainCategoryList = action.payload
    },
    setSubCategoryList: (state, action) => {
      state.subCategoryList = action.payload
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    setNewsSliderKey: (state, action) => {
      state.newsSliderKey = action.payload
    },
    setPrdCategoryList: (state, action) => {
      state.prdCategoryList = action.payload
    },
    setRegisteredUser: (state, action) => {
      state.registeredUser = action.payload
    },
    setPostList: (state, action) => {
      state.postList = action.payload
    },
    setJobList: (state, action) => {
      state.jobList = action.payload
    },
    setPackageList: (state, action) => {
      state.packageList = action.payload
    },
    setPackageDetailList: (state, action) => {
      state.packageDetailList = [...state.packageDetailList || [], ...action.payload]
    },
  },
})

export const {
  setProvinceList,
  setCityList,
  setSuburbList,
  setMainCategoryList,
  setSubCategoryList,
  setCategoryId,
  setNewsSliderKey,
  setPrdCategoryList,
  setRegisteredUser,
  setPostList,
  setJobList,
  setPackageList,
  setPackageDetailList,
} = ReferenceSlice.actions
export default ReferenceSlice.reducer
