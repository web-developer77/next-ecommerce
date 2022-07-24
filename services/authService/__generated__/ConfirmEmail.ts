/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConfirmEmail
// ====================================================

export interface ConfirmEmail_confirmEmail {
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

export interface ConfirmEmail {
  confirmEmail: ConfirmEmail_confirmEmail | null;
}

export interface ConfirmEmailVariables {
  id?: string | null;
}
