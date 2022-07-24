/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSuburb
// ====================================================

export interface GetSuburb_getSuburb_result {
  __typename: "MstSuburbType";
  cityId: number | null;
  isActive: boolean | null;
  suburbId: number;
  suburbName: string | null;
}

export interface GetSuburb_getSuburb {
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
  result: (GetSuburb_getSuburb_result | null)[] | null;
}

export interface GetSuburb {
  getSuburb: GetSuburb_getSuburb | null;
}
