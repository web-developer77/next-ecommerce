/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProvince
// ====================================================

export interface GetProvince_getProvince_result {
  __typename: "MstProvinceType";
  provinceId: string | null;
  provinceName: string | null;
  isActive: boolean | null;
}

export interface GetProvince_getProvince {
  __typename: "ResponseMstProvince";
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
  result: (GetProvince_getProvince_result | null)[] | null;
}

export interface GetProvince {
  getProvince: GetProvince_getProvince | null;
}
