/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SSOLogin
// ====================================================

export interface SSOLogin_sSOLogin_result {
  __typename: "MstLoggedInUserDtoType";
  firstName: string | null;
  lastName: string | null;
  paymentUrl: string | null;
  token: string | null;
  tokenExpires: any | null;
}

export interface SSOLogin_sSOLogin {
  __typename: "ResponseMstLoggedInUserDto";
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
  result: SSOLogin_sSOLogin_result | null;
}

export interface SSOLogin {
  sSOLogin: SSOLogin_sSOLogin | null;
}
