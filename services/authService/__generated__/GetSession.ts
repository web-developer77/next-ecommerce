/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSession
// ====================================================

export interface GetSession_getSession_result {
  __typename: "SessionType";
  domain: string | null;
  expires: any | null;
  sessionContractLogin: string | null;
  sessionKeyContractLogin: string | null;
  sessionKeyLogin: string | null;
  sessionLogin: string | null;
}

export interface GetSession_getSession {
  __typename: "Response2";
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
  result: GetSession_getSession_result | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface GetSession {
  getSession: GetSession_getSession | null;
}

export interface GetSessionVariables {
  id?: number | null;
}
