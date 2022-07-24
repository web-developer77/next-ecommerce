/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EmailCheck
// ====================================================

export interface EmailCheck_emailCheck {
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

export interface EmailCheck {
  emailCheck: EmailCheck_emailCheck | null;
}

export interface EmailCheckVariables {
  email?: string | null;
}
