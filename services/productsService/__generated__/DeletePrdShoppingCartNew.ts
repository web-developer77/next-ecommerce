/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePrdShoppingCartNew
// ====================================================

export interface DeletePrdShoppingCartNew_deletePrdShoppingCartNew_result {
  __typename: "PrdShoppingCartDtoType";
  recordID: number | null;
  productID: number | null;
  categoryID: number | null;
  categoryName: string | null;
  productNumber: string | null;
  productName: string | null;
  productImage: string | null;
  unitCost: any | null;
  description: string | null;
  quantity: number | null;
  totalPrice: any | null;
  fromDate: any | null;
  endDate: any | null;
}

export interface DeletePrdShoppingCartNew_deletePrdShoppingCartNew {
  __typename: "ResponsePrdShoppingCartDto";
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
  result: (DeletePrdShoppingCartNew_deletePrdShoppingCartNew_result | null)[] | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface DeletePrdShoppingCartNew {
  deletePrdShoppingCartNew: DeletePrdShoppingCartNew_deletePrdShoppingCartNew | null;
}

export interface DeletePrdShoppingCartNewVariables {
  prdShoppingCartId: number;
}
