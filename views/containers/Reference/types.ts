import { GetMstPackageDetailList_getMstPackageDetailList_result } from '@services/authService/__generated__/GetMstPackageDetailList'
import { GetMstPackageList_getMstPackageList_result } from '@services/authService/__generated__/GetMstPackageList'
import { GetCategoryByParentId_getMstCategoryByParentId_result } from '@services/referenceService/__generated__/GetCategoryByParentId'
import { GetCity_getCity_result } from '@services/referenceService/__generated__/GetCity'
import { GetMainCategory_getMstCategoryMain_result } from '@services/referenceService/__generated__/GetMainCategory'
import { GetPostList_getPostList_result, GetPostList_getPostList } from '@services/referenceService/__generated__/GetPostList'
import { GetPrdCategory_getPrdCategoryList_result } from '@services/referenceService/__generated__/GetPrdCategory'
import { GetProvince_getProvince_result } from '@services/referenceService/__generated__/GetProvince'
import { GetSuburb_getSuburb_result } from '@services/referenceService/__generated__/GetSuburb'
import { RegisterUser_registerUser_result } from '@services/authService/__generated__/RegisterUser'

export interface IReferenceState {
  provinceList: GetProvince_getProvince_result[] | null
  cityList: GetCity_getCity_result[] | null
  suburbList: GetSuburb_getSuburb_result[] | null
  mainCategoryList: GetMainCategory_getMstCategoryMain_result[] | null
  subCategoryList:
    | GetCategoryByParentId_getMstCategoryByParentId_result[]
    | null
  categoryId: number,
  newsSliderKey: String,
  prdCategoryList: GetPrdCategory_getPrdCategoryList_result[] | null,
  registeredUser: RegisterUser_registerUser_result | null,
  postList: GetPostList_getPostList_result[] | null,
  jobList: GetPostList_getPostList | null,
  packageList: GetMstPackageList_getMstPackageList_result[] | null,
  packageDetailList: GetMstPackageDetailList_getMstPackageDetailList_result[] | null
}
