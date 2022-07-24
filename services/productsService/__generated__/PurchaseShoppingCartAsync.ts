/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PurchaseShoppingCartAsync
// ====================================================

export interface PurchaseShoppingCartAsync_purchaseShoppingCartAsync {
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

export interface PurchaseShoppingCartAsync {
  purchaseShoppingCartAsync: PurchaseShoppingCartAsync_purchaseShoppingCartAsync | null;
}

export interface PurchaseShoppingCartAsyncVariables {
  id: number;
}
