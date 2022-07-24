/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSuburbByCity
// ====================================================

export interface GetSuburbByCity_getSuburbByCity_result {
  __typename: "MstSuburbType";
  cityId: number | null;
  isActive: boolean | null;
  suburbId: number;
  suburbName: string | null;
}

export interface GetSuburbByCity_getSuburbByCity {
  __typename: "ResponseMstSuburb";
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
  result: (GetSuburbByCity_getSuburbByCity_result | null)[] | null;
}

export interface GetSuburbByCity {
  getSuburbByCity: GetSuburbByCity_getSuburbByCity | null;
}

export interface GetSuburbByCityVariables {
  id?: number | null;
}
