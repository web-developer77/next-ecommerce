/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MstRatingInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMstRating
// ====================================================

export interface CreateMstRating_createMstRating {
  __typename: "MstRatingType";
  companyId: number | null;
  contactNo: string | null;
  createdBy: number | null;
  createdDate: any | null;
  eflyerId: number | null;
  emaiId: string | null;
  modifiedBy: number | null;
  modifiedDate: any | null;
  mstRatingId: number;
  name: string | null;
  productId: number | null;
  ratingScore: number | null;
  review: string | null;
  specialId: number | null;
  statusId: number | null;
  userId: number | null;
}

export interface CreateMstRating {
  createMstRating: CreateMstRating_createMstRating | null;
}

export interface CreateMstRatingVariables {
  mstRating: MstRatingInputType;
}
