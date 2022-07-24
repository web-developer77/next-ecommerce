/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBusinessUsers
// ====================================================

export interface GetBusinessUsers_getBusinessUsers_result {
  __typename: "MstUserDtoType";
  firstName: string | null;
  fullName: string | null;
  lastName: string | null;
  userProfileImage: string | null;
  userProfileThumbNailImage: string | null;
}

export interface GetBusinessUsers_getBusinessUsers {
  __typename: "ResponseMstUserDto";
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
  result: (GetBusinessUsers_getBusinessUsers_result | null)[] | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface GetBusinessUsers {
  getBusinessUsers: GetBusinessUsers_getBusinessUsers | null;
}

export interface GetBusinessUsersVariables {
  id?: number | null;
}
