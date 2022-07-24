/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PrdShoppingCartInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: postPrdShoppingCartOptimized
// ====================================================

export interface postPrdShoppingCartOptimized_postPrdShoppingCartOptimized_result_prdShoppingCartDto {
  __typename: "PrdShoppingCartDtoType";
  categoryID: number | null;
  categoryName: string | null;
  description: string | null;
  productID: number | null;
  productImage: string | null;
  productName: string | null;
  productNumber: string | null;
  quantity: number | null;
  recordID: number | null;
  totalPrice: any | null;
  unitCost: any | null;
}

export interface postPrdShoppingCartOptimized_postPrdShoppingCartOptimized_result {
  __typename: "PrdShoppingCartTotalDtoType";
  /**
   * prdShoppingCartDto
   */
  prdShoppingCartDto: (postPrdShoppingCartOptimized_postPrdShoppingCartOptimized_result_prdShoppingCartDto | null)[] | null;
  totalAmount: any | null;
  amountExlVat: any | null;
  vatAmount: any | null;
  recuringAmount: any | null;
}

export interface postPrdShoppingCartOptimized_postPrdShoppingCartOptimized {
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
  /**
   * Result
   */
  result: postPrdShoppingCartOptimized_postPrdShoppingCartOptimized_result | null;
}

export interface postPrdShoppingCartOptimized {
  postPrdShoppingCartOptimized: postPrdShoppingCartOptimized_postPrdShoppingCartOptimized | null;
}

export interface postPrdShoppingCartOptimizedVariables {
  prdShoppingCart: PrdShoppingCartInputType;
}
