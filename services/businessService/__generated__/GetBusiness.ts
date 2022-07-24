/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBusiness
// ====================================================

export interface GetBusiness_getBusinessList_result {
  __typename: "MstCompanyDtoType";
  bEEScorePoint: string | null;
  bEEStatus: string | null;
  bEEStatusID: number | null;
  callType: number | null;
  categoryIds: string | null;
  cityId: number | null;
  cityID: number | null;
  cityIds: string | null;
  cityName: string | null;
  companyId: number | null;
  companyID: number | null;
  companyName: string | null;
  companyPercentage: any | null;
  companyStatus: string | null;
  companyStatusID: number | null;
  compCategory: string | null;
  compCityID: number | null;
  compCityName: string | null;
  compCountryID: number | null;
  compCountryName: string | null;
  compDescription: string | null;
  compEmailId: string | null;
  compHelpDeskNumber: string | null;
  compPackageId: number | null;
  compPackageID: number | null;
  compPhone: string | null;
  compProvinceID: number | null;
  compProvinceName: string | null;
  compStreetAddress: string | null;
  compSuburb: string | null;
  compSuburbID: number | null;
  compWebSite: string | null;
  countryId: number | null;
  countryID: number | null;
  countryName: string | null;
  directorsCount: number | null;
  documentPath: string | null;
  featured: boolean | null;
  franchiseId: number | null;
  intCategoryIds: string | null;
  intCompanyMBUDeviceID: string | null;
  intCompanyMBUDeviceType: number | null;
  intCompanyMBUEmail: string | null;
  intCompanyMBUID: number | null;
  intCompanyMBUName: string | null;
  intCompPackageID: number | null;
  intFavouriteID: number | null;
  intFranchiseID: number | null;
  intRatingScore: any | null;
  joinDate: any | null;
  logoPath: string | null;
  mainBusinessUserID: number | null;
  mainCategoryID: number | null;
  procurementRecognition: string | null;
  provinceID: number | null;
  provinceIds: string | null;
  provinceName: string | null;
  ratingScore: any | null;
  selectedCity: boolean | null;
  selectedProvince: boolean | null;
  selectedSuburb: boolean | null;
  serviceTax: string | null;
  statusId: string | null;
  suburbID: number | null;
  suburbIds: string | null;
  suburbName: string | null;
  userID: number | null;
  vATNumber: string | null;
  zipCode: string | null;
}

export interface GetBusiness_getBusinessList {
  __typename: "ResponseMstCompanyDto";
  /**
   * Count
   */
  count: number;
  /**
   * CurrentPage
   */
  currentPage: number;
  /**
   * Message
   */
  message: string;
  /**
   * NextPage
   */
  nextPage: number;
  /**
   * PrevPage
   */
  prevPage: number;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
  /**
   * Result
   */
  result: (GetBusiness_getBusinessList_result | null)[] | null;
}

export interface GetBusiness {
  getBusinessList: GetBusiness_getBusinessList | null;
}

export interface GetBusinessVariables {
  companyId?: number | null;
  companyName?: string | null;
  franchiseeId?: number | null;
  statusIds?: string | null;
  categoryIds?: string | null;
  provinceIds?: string | null;
  cityIds?: string | null;
  suburbIds?: string | null;
  size?: number | null;
  page?: number | null;
}
