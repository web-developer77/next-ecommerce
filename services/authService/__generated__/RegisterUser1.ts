/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MstUserDtoInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterUser1
// ====================================================

export interface RegisterUser1_registerUser_result {
  __typename: "MstLoggedInUserDtoType";
  firstName: string | null;
  lastName: string | null;
  paymentUrl: string | null;
  token: string | null;
  tokenExpires: any | null;
}

export interface RegisterUser1_registerUser {
  __typename: "Response4";
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
  result: RegisterUser1_registerUser_result | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface RegisterUser1 {
  registerUser: RegisterUser1_registerUser | null;
}

export interface RegisterUser1Variables {
  userDto: MstUserDtoInputType;
  platform: number;
}
