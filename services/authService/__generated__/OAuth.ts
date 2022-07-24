/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OAuth
// ====================================================

export interface OAuth_oAuth_result {
  __typename: "MstLoggedInUserDtoType";
  firstName: string | null;
  lastName: string | null;
  paymentUrl: string | null;
  token: string | null;
  tokenExpires: any | null;
}

export interface OAuth_oAuth {
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
  result: OAuth_oAuth_result | null;
}

export interface OAuth {
  oAuth: OAuth_oAuth | null;
}
