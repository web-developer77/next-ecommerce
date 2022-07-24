/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMainCategory
// ====================================================

export interface GetMainCategory_getMstCategoryMain_result {
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

export interface GetMainCategory_getMstCategoryMain {
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
  result: (GetMainCategory_getMstCategoryMain_result | null)[] | null;
}

export interface GetMainCategory {
  getMstCategoryMain: GetMainCategory_getMstCategoryMain | null;
}
