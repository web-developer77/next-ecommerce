/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ForgetPassword
// ====================================================

export interface ForgetPassword_forgetPassword {
  __typename: "Response";
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
}

export interface ForgetPassword {
  forgetPassword: ForgetPassword_forgetPassword | null;
}

export interface ForgetPasswordVariables {
  email?: string | null;
  domainUrl?: number | null;
}
