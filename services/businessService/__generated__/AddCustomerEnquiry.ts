/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MstCustomerEnquiryInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddCustomerEnquiry
// ====================================================

export interface AddCustomerEnquiry_addCustomerEnquiry {
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
   * Success
   */
  success: boolean;
  /**
   * TotalPages
   */
  totalPages: number;
}

export interface AddCustomerEnquiry {
  addCustomerEnquiry: AddCustomerEnquiry_addCustomerEnquiry | null;
}

export interface AddCustomerEnquiryVariables {
  customerEnquiry: MstCustomerEnquiryInputType;
}
