/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMstPackageDetailList
// ====================================================

export interface GetMstPackageDetailList_getMstPackageDetailList_result {
  __typename: "MstPackageDetailsDtoType";
  activeText: string | null;
  actualValue: string | null;
  amount: any | null;
  attributeID: number | null;
  attributeName: string | null;
  isActive: boolean | null;
  packageDetailsID: number | null;
  packageID: number | null;
  pD_ActiveText: string | null;
  pD_isActive: boolean | null;
  sortOrder: number | null;
  value: string | null;
}

export interface GetMstPackageDetailList_getMstPackageDetailList {
  __typename: "ResponseMstPackageDetailsDto";
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
   * Result
   */
  result: (GetMstPackageDetailList_getMstPackageDetailList_result | null)[] | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface GetMstPackageDetailList {
  getMstPackageDetailList: GetMstPackageDetailList_getMstPackageDetailList | null;
}

export interface GetMstPackageDetailListVariables {
  packageId?: number | null;
  status?: boolean | null;
}
