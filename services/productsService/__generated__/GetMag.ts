/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMag
// ====================================================

export interface GetMag_getMagazinesList_result_mapEflyersUploadDtos {
  __typename: "MstEFlyersUploadDtoType";
  filePath: string | null;
}

export interface GetMag_getMagazinesList_result {
  __typename: "MstEFlyersDtoType";
  eflyerId: number | null;
  magazineName: string | null;
  eFlyerDescription: string | null;
  categoryID: number | null;
  categoryName: string | null;
  startDate: any | null;
  endDate: any | null;
  statusId: number | null;
  statusName: string | null;
  companyId: number | null;
  companyName: string | null;
  companyDescription: string | null;
  isMenu: boolean | null;
  streetAddress: string | null;
  countryID: number | null;
  countryName: string | null;
  provinceID: number | null;
  provinceName: string | null;
  cityID: number | null;
  cityName: string | null;
  suburbID: number | null;
  suburb: string | null;
  zipCode: string | null;
  phone: string | null;
  companyLocation: string | null;
  mapEflyersUploadDtos: (GetMag_getMagazinesList_result_mapEflyersUploadDtos | null)[] | null;
}

export interface GetMag_getMagazinesList {
  __typename: "ResponseMstEFlyersDto";
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
  /**
   * Result
   */
  result: (GetMag_getMagazinesList_result | null)[] | null;
}

export interface GetMag {
  getMagazinesList: GetMag_getMagazinesList | null;
}

export interface GetMagVariables {
  franchiseId?: number | null;
  eflyerId?: string | null;
  magazineName?: string | null;
  statusIds?: string | null;
  companyIds?: string | null;
  categoryIds?: string | null;
  provinceIds?: string | null;
  cityIds?: string | null;
  suburbIds?: string | null;
  page?: number | null;
  size?: number | null;
}
