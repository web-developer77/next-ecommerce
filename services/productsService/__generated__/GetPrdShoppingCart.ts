/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPrdShoppingCart
// ====================================================

export interface GetPrdShoppingCart_getPrdShoppingCart_result_prdShoppingCartDto {
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

export interface GetPrdShoppingCart_getPrdShoppingCart_result {
  __typename: "PrdShoppingCartTotalDtoType";
  /**
   * prdShoppingCartDto
   */
  prdShoppingCartDto: (GetPrdShoppingCart_getPrdShoppingCart_result_prdShoppingCartDto | null)[] | null;
  totalAmount: any | null;
  amountExlVat: any | null;
  vatAmount: any | null;
  recuringAmount: any | null;
}

export interface GetPrdShoppingCart_getPrdShoppingCart {
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
   * Result
   */
  result: GetPrdShoppingCart_getPrdShoppingCart_result | null;
}

export interface GetPrdShoppingCart {
  getPrdShoppingCart: GetPrdShoppingCart_getPrdShoppingCart | null;
}

export interface GetPrdShoppingCartVariables {
  page: number;
  size: number;
}
