import { apolloClient } from "@graphql/index";
import { MstCustomerEnquiryInputType } from "__generated__/globalTypes";
import { GET_BUSINESS, ADD_CUSTOMER_ENQUIRY, GET_MST_RATING_SCORELIST, GET_BUSINESS_USERS } from "./queries";
import { AddCustomerEnquiry_addCustomerEnquiry } from "./__generated__/AddCustomerEnquiry";
import { GetBusiness, GetBusiness_getBusinessList } from "./__generated__/GetBusiness";
import { GetBusinessUsers_getBusinessUsers_result } from "./__generated__/GetBusinessUsers";
import { GetMstRatingScoreList_getMstRatingScoreList_result } from "./__generated__/GetMstRatingScoreList";

class BusinessService {
  async getBusinessList(
    companyId: Number | null,
    companyName: String | null,
    franchiseeId: Number | null,
    statusIds: String | null,
    categoryIds: String | null,
    provinceIds: String | null,
    cityIds: String | null,
    suburbIds: String | null,
    size: Number | null,
    page: Number | null,
    token?: string,
  ): Promise<GetBusiness_getBusinessList> {
    try {
      const response = await apolloClient(token).query({
        query: GET_BUSINESS,
        variables: {
          companyId,
          companyName,
          franchiseeId,
          statusIds,
          categoryIds,
          provinceIds,
          cityIds,
          suburbIds,
          size,
          page,
        },
      });
      if (!response || !response.data)
        throw new Error("Cannot get business list");
      return response.data.getBusinessList;
    } catch (err) {
      throw err;
    }
  }
  async getBusinessUsers(
    id: number | null,
  ): Promise<GetBusinessUsers_getBusinessUsers_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_BUSINESS_USERS,
        variables: {
          id,
        },
      });
      if (!response || !response.data)
        throw new Error("Cannot get business users");
      return response.data.getBusinessUsers.result;
    } catch (err) {
      throw err;
    }
  }
  async getMstRatingScoreList(
    key: number | null,
    keyType: number | null,
    page: number | null,
    size: number | null,
  ): Promise<GetMstRatingScoreList_getMstRatingScoreList_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_MST_RATING_SCORELIST,
        variables: {
          key,
          keyType,
          size,
          page,
        },
      });
      if (!response || !response.data)
        throw new Error("Cannot get business score list");
      return response.data.getMstRatingScoreList.result;
    } catch (err) {
      throw err;
    }
  }
  async addCustomerEnquiry(
    customerEnquiry: MstCustomerEnquiryInputType,
  ): Promise<AddCustomerEnquiry_addCustomerEnquiry> {
    try {
      const response = await apolloClient().mutate({
        mutation: ADD_CUSTOMER_ENQUIRY,
        variables: { customerEnquiry },
      })
      if (!response || !response.data)
        throw new Error('Cannot contact')
      return response.data.addCustomerEnquiry
    } catch (err) {
      throw err
    }
  }
}

export default new BusinessService();
