/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostList
// ====================================================

export interface GetPostList_getPostList_result {
  __typename: "PostDtoType";
  categoryID: number | null;
  companyID: number | null;
  companyName: string | null;
  description: string | null;
  descriptionSEO: string | null;
  documentName: string | null;
  domainID: number | null;
  endDate: any | null;
  filePath: string | null;
  googleSchema: string | null;
  keywordsSEO: string | null;
  location: string | null;
  name: string | null;
  postID: number | null;
  startDate: any | null;
  thumbNailImagePath: string | null;
  title: string | null;
  titleSEO: string | null;
}

export interface GetPostList_getPostList {
  __typename: "ResponsePostDto";
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
  result: (GetPostList_getPostList_result | null)[] | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface GetPostList {
  getPostList: GetPostList_getPostList | null;
}

export interface GetPostListVariables {
  postId?: number | null;
  title?: string | null;
  domainId?: number | null;
  categoryId?: number | null;
  companyId?: number | null;
  location?: string | null;
  page?: number | null;
  size?: number | null;
}
