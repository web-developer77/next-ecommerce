/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MobileCheck
// ====================================================

export interface MobileCheck_mobileCheck {
  __typename: "Response1";
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
  message: string | null;
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
  result: string | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface MobileCheck {
  mobileCheck: MobileCheck_mobileCheck | null;
}

export interface MobileCheckVariables {
  mobile?: string | null;
}
