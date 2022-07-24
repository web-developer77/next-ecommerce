/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCityByProvince
// ====================================================

export interface GetCityByProvince_getCityByProvince_result {
  __typename: "MstCityType";
  cityId: number;
  cityName: string | null;
  isActive: boolean | null;
  provinceId: number | null;
}

export interface GetCityByProvince_getCityByProvince {
  __typename: "ResponseMstCity";
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
  result: (GetCityByProvince_getCityByProvince_result | null)[] | null;
}

export interface GetCityByProvince {
  getCityByProvince: GetCityByProvince_getCityByProvince | null;
}

export interface GetCityByProvinceVariables {
  id?: number | null;
}
