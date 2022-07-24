/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PrdShoppingCartInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PostPrdShoppingCart
// ====================================================

export interface PostPrdShoppingCart_postPrdShoppingCart {
  __typename: "ResponsePrdShoppingCartTotalDto";
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
  result: any | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface PostPrdShoppingCart {
  postPrdShoppingCartOptimized: PostPrdShoppingCart_postPrdShoppingCart | null;
}

export interface PostPrdShoppingCartVariables {
  prdShoppingCart: PrdShoppingCartInputType;
}
