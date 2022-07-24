/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_getPrdProductList_result_mapProductImages {
  __typename: "MapProductImagesType";
  imageName: string | null;
  imagePath: string | null;
}

export interface GetProducts_getPrdProductList_result_prdBid {
  __typename: "PrdBidType";
  bidId: number;
  createdDate: any | null;
  bidAmount: any | null;
  userId: number | null;
}

export interface GetProducts_getPrdProductList_result_prdHire {
  __typename: "PrdHireType";
  hireId: number;
  userId: number | null;
  isAccepted: boolean | null;
  fromDate: any | null;
  toDate: any | null;
  returned: boolean | null;
}

export interface GetProducts_getPrdProductList_result {
  __typename: "ProductDtType";
  activeText: string | null;
  categoryID: number | null;
  categoryName: string | null;
  description: string | null;
  documentName: string | null;
  documentPath: string | null;
  isActive: boolean | null;
  companyID: number | null;
  ratingScore: any | null;
  salesTypeId: number | null;
  scopeID: number | null;
  typeID: number | null;
  productID: number | null;
  productImage: string | null;
  productName: string | null;
  productNumber: string | null;
  inventory: number | null;
  clickCount: number | null;
  viewCount: number | null;
  unitCost: any | null;
  length: any | null;
  width: any | null;
  height: any | null;
  volume: any | null;
  weight: any | null;
  googleSchema: string | null;
  domainCategoryName: string | null;
  domainCategory: number | null;
  endDate: any | null;
  mapProductImages: (GetProducts_getPrdProductList_result_mapProductImages | null)[] | null;
  prdBid: (GetProducts_getPrdProductList_result_prdBid | null)[] | null;
  prdHire: (GetProducts_getPrdProductList_result_prdHire | null)[] | null;
}

export interface GetProducts_getPrdProductList {
  __typename: "ResponseProductDt";
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
  result: (GetProducts_getPrdProductList_result | null)[] | null;
}

export interface GetProducts {
  getPrdProductList: GetProducts_getPrdProductList | null;
}

export interface GetProductsVariables {
  productName?: string | null;
  productId?: number | null;
  categoryId?: number | null;
  status?: boolean | null;
  salesTypeId?: number | null;
  domainCategoryIds?: string | null;
  userId?: number | null;
  scopeId?: number | null;
  size?: number | null;
  page?: number | null;
  companyId?: number | null;
  fromPrice: number | null;
  toPrice: number | null;
}
