/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPrdCategory
// ====================================================

export interface GetPrdCategory_getPrdCategoryList_result {
  __typename: "PrdCategoryDtoType";
  activeText: string | null;
  categoryId: number | null;
  categoryName: string | null;
  domainId: number | null;
  domainID: number | null;
  domainName: string | null;
  isActive: boolean | null;
}

export interface GetPrdCategory_getPrdCategoryList {
  __typename: "ResponsePrdCategoryDto";
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
  result: (GetPrdCategory_getPrdCategoryList_result | null)[] | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface GetPrdCategory {
  getPrdCategoryList: GetPrdCategory_getPrdCategoryList | null;
}

export interface GetPrdCategoryVariables {
  categoryId?: number | null;
  categoryIds?: string | null;
  categoryName?: string | null;
  domainId?: number | null;
  status?: boolean | null;
  includeCategoryIds?: string | null;
  excludeCategoryIds?: string | null;
  page: number;
  size: number;
}
