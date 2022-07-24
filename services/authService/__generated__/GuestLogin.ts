/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GuestLogin
// ====================================================

export interface GuestLogin_guestLogin_result {
  __typename: "JwtTokenType";
  validTo: any | null;
  value: string | null;
}

export interface GuestLogin_guestLogin {
  __typename: "Response3";
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
  result: GuestLogin_guestLogin_result | null;
}

export interface GuestLogin {
  guestLogin: GuestLogin_guestLogin | null;
}
