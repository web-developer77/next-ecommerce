/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMstPackageList
// ====================================================

export interface GetMstPackageList_getMstPackageList_result {
  __typename: "MstPackageListDtoType";
  activeText: string | null;
  amount: any | null;
  isActive: boolean | null;
  isRecommended: boolean | null;
  packageID: number | null;
  packageName: string | null;
  recommendedText: string | null;
  sortOrder: number | null;
}

export interface GetMstPackageList_getMstPackageList {
  __typename: "ResponseMstPackageListDto";
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
  result: (GetMstPackageList_getMstPackageList_result | null)[] | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface GetMstPackageList {
  getMstPackageList: GetMstPackageList_getMstPackageList | null;
}

export interface GetMstPackageListVariables {
  packageIds?: string | null;
  includePackageIds?: string | null;
  excludePackageIds?: string | null;
  packageName?: string | null;
  packageId?: number | null;
  status?: boolean | null;
}
