/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCity
// ====================================================

export interface GetCity_getCity_result {
  __typename: "MstCityType";
  cityId: number;
  cityName: string | null;
  isActive: boolean | null;
  provinceId: number | null;
}

export interface GetCity_getCity {
  __typename: "ResponseMstCity";
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
  result: (GetCity_getCity_result | null)[] | null;
}

export interface GetCity {
  getCity: GetCity_getCity | null;
}
