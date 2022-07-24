/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategoryByParentId
// ====================================================

export interface GetCategoryByParentId_getMstCategoryByParentId_result {
  __typename: "MstCategoryType";
  categoryIcon: string | null;
  categoryId: number;
  categoryName: string | null;
  categoryThumbNailIcon: string | null;
  isActive: boolean | null;
  isCategory: boolean | null;
  isMainCategory: boolean | null;
  isMenuAllowed: boolean | null;
  parentCategoryId: number | null;
  timeDelayException: boolean | null;
}

export interface GetCategoryByParentId_getMstCategoryByParentId {
  __typename: "ResponseMstCategory";
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
  result: (GetCategoryByParentId_getMstCategoryByParentId_result | null)[] | null;
}

export interface GetCategoryByParentId {
  getMstCategoryByParentId: GetCategoryByParentId_getMstCategoryByParentId | null;
}

export interface GetCategoryByParentIdVariables {
  id?: number | null;
}
