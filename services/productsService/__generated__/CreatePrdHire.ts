/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PrdHireInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePrdHire
// ====================================================

export interface CreatePrdHire_createPrdHire {
  __typename: "PrdHireType";
  businessConfirmedReturned: boolean | null;
  businessConfirmedReturnedDate: any | null;
  clientConfirmedReturned: boolean | null;
  clientConfirmedReturnedDate: any | null;
  fromDate: any | null;
  hireId: number;
  isAccepted: boolean | null;
  productId: number | null;
  returned: boolean | null;
  returnedDate: any | null;
  toDate: any | null;
  userId: number | null;
}

export interface CreatePrdHire {
  createPrdHire: CreatePrdHire_createPrdHire | null;
}

export interface CreatePrdHireVariables {
  prdHire: PrdHireInputType;
}
