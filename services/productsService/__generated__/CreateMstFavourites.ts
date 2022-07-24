/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MstFavouritesInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMstFavourites
// ====================================================

export interface CreateMstFavourites_createMstFavourites {
  __typename: "MstFavouritesType";
  companyId: number | null;
  createdBy: number | null;
  createdDate: any | null;
  eflyerId: number | null;
  modifiedBy: number | null;
  modifiedDate: any | null;
  mstFavouriteId: number;
  productId: number | null;
  specialId: number | null;
  userId: number | null;
}

export interface CreateMstFavourites {
  createMstFavourites: CreateMstFavourites_createMstFavourites | null;
}

export interface CreateMstFavouritesVariables {
  mstFavourites: MstFavouritesInputType;
}
