/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostReplyInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PostReply
// ====================================================

export interface PostReply_postReply {
  __typename: "Response6";
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
  result: number | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface PostReply {
  postReply: PostReply_postReply | null;
}

export interface PostReplyVariables {
  post: PostReplyInputType;
}
