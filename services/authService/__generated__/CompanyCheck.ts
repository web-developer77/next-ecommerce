/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanyCheck
// ====================================================

export interface CompanyCheck_companyCheck {
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

export interface CompanyCheck {
  companyCheck: CompanyCheck_companyCheck | null;
}

export interface CompanyCheckVariables {
  name?: string | null;
}
