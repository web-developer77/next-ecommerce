/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MstUserDtoInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterBusiness
// ====================================================

export interface RegisterBusiness_registerBusiness_result {
  __typename: "MstLoggedInUserDtoType";
  firstName: string | null;
  lastName: string | null;
  paymentUrl: string | null;
  token: string | null;
  tokenExpires: any | null;
}

export interface RegisterBusiness_registerBusiness {
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
  result: RegisterBusiness_registerBusiness_result | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface RegisterBusiness {
  registerBusiness: RegisterBusiness_registerBusiness | null;
}

export interface RegisterBusinessVariables {
  userDto: MstUserDtoInputType;
}
