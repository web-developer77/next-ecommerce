/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PrdBidInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePrdBid
// ====================================================

export interface CreatePrdBid_createPrdBid {
  __typename: "PrdBidType";
  bidAmount: any | null;
  bidApprovedMail: boolean | null;
  bidId: number;
  createdDate: any | null;
  isAccepted: boolean | null;
  isActive: boolean | null;
  modifiedBy: number | null;
  modifiedDate: any | null;
  productId: number | null;
  userId: number | null;
}

export interface CreatePrdBid {
  createPrdBid: CreatePrdBid_createPrdBid | null;
}

export interface CreatePrdBidVariables {
  prdBid: PrdBidInputType;
}
