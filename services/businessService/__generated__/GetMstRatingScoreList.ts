/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMstRatingScoreList
// ====================================================

export interface GetMstRatingScoreList_getMstRatingScoreList_result {
  __typename: "MstRatingDtoType";
  dateofReview: any | null;
  ratingScoreName: string | null;
  ratingScorePercent: any | null;
  review: string | null;
  title: string | null;
  userName: string | null;
}

export interface GetMstRatingScoreList_getMstRatingScoreList {
  __typename: "Response5";
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
  result: (GetMstRatingScoreList_getMstRatingScoreList_result | null)[] | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface GetMstRatingScoreList {
  getMstRatingScoreList: GetMstRatingScoreList_getMstRatingScoreList | null;
}

export interface GetMstRatingScoreListVariables {
  key?: number | null;
  keyType?: number | null;
  page?: number | null;
  size?: number | null;
}
