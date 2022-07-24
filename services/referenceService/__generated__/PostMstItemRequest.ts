/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MstItemRequestInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PostMstItemRequest
// ====================================================

export interface PostMstItemRequest_postMstItemRequest {
  __typename: "Response6";
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
}

export interface PostMstItemRequest {
  postMstItemRequest: PostMstItemRequest_postMstItemRequest | null;
}

export interface PostMstItemRequestVariables {
  mstItemRequest: MstItemRequestInputType;
  files?: (any | null)[] | null;
}
