/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContactUsDtoInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ContactUs
// ====================================================

export interface ContactUs_contactUs {
  __typename: "Response";
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
}

export interface ContactUs {
  contactUs: ContactUs_contactUs | null;
}

export interface ContactUsVariables {
  contactUs: ContactUsDtoInputType;
}
