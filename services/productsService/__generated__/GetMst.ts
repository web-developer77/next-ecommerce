/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMst
// ====================================================

export interface GetMst_getMstSpecialList_result_mapSpecialUpload {
  __typename: "MapSpecialUploadType";
  uploadPath: string | null;
  thumbNailPath: string | null;
}

export interface GetMst_getMstSpecialList_result {
  __typename: "MstSpecialsDtoType";
  amount: any | null;
  categoryID: number | null;
  categoryIds: string | null;
  categoryName: string | null;
  cityID: number | null;
  cityName: string | null;
  companyIds: string | null;
  countryID: number | null;
  countryName: string | null;
  dis: number | null;
  distance: any | null;
  documentLink: string | null;
  endDate: any | null;
  franchiseId: number | null;
  imagePath: string | null;
  latitude: string | null;
  longitude: string | null;
  phone: string | null;
  provinceID: number | null;
  provinceIds: string | null;
  provinceName: string | null;
  specialDescription: string | null;
  specialId: number | null;
  specialID: number | null;
  specialName: string | null;
  staId: string | null;
  startDate: any | null;
  statusId: number | null;
  statusName: string | null;
  streetAddress: string | null;
  suburb: string | null;
  suburbID: number | null;
  suburbIds: string | null;
  userId: number | null;
  userLatitude: number | null;
  userLongtitude: number | null;
  zipCode: string | null;
  mapSpecialUpload: (GetMst_getMstSpecialList_result_mapSpecialUpload | null)[] | null;
}

export interface GetMst_getMstSpecialList {
  __typename: "ResponseMstSpecialsDto";
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
  result: (GetMst_getMstSpecialList_result | null)[] | null;
}

export interface GetMst {
  getMstSpecialList: GetMst_getMstSpecialList | null;
}

export interface GetMstVariables {
  specialId?: number | null;
  specialName?: string | null;
  franchiseId?: number | null;
  statusIds?: string | null;
  distance?: any | null;
  companyIds?: string | null;
  categoryIds?: string | null;
  provinceIds?: string | null;
  cityIds?: string | null;
  suburbIds?: string | null;
  page?: number | null;
  size?: number | null;
}
