import { apolloClient } from "@graphql/index"
import {
  MstItemRequestInputType,
  MstUserDtoInputType,
  PostReplyInputType,
} from "__generated__/globalTypes"
import {
  GetPostList_getPostList_result,
  GetPostList_getPostList,
} from "./__generated__/GetPostList"
import {
  GET_PROVINCE,
  GET_CITY,
  GET_CITY_BY_PROVINCE,
  GET_SUBURB,
  GET_SUBURB_BY_CITY,
  GET_MAIN_CATEGORY,
  GET_CATEGORY_BY_PARENTID,
  GET_PRD_CATEGORY,
  POST_MST_ITEM_REQUEST,
  GET_POST_LIST,
  POST_REPLY,
} from "./queries"
import { GetCategoryByParentId_getMstCategoryByParentId_result } from "./__generated__/GetCategoryByParentId"
import { GetCity_getCity_result } from "./__generated__/GetCity"
import { GetMainCategory_getMstCategoryMain_result } from "./__generated__/GetMainCategory"
import { GetPrdCategory_getPrdCategoryList_result } from "./__generated__/GetPrdCategory"
import { GetProvince_getProvince_result } from "./__generated__/GetProvince"
import { GetSuburb_getSuburb_result } from "./__generated__/GetSuburb"
import { PostMstItemRequest_postMstItemRequest } from "./__generated__/PostMstItemRequest"
import { PostReply_postReply } from "./__generated__/PostReply"

class ReferenceService {
  async getProvinceList(): Promise<GetProvince_getProvince_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_PROVINCE,
        variables: {},
      })
      if (!response || !response.data)
        throw new Error("Cannot get province list")
      return response.data.getProvince.result
    } catch (err) {
      throw err
    }
  }
  async getCityList(): Promise<GetCity_getCity_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_CITY,
        variables: {},
      })
      if (!response || !response.data) throw new Error("Cannot get city list")
      return response.data.getCity.result
    } catch (err) {
      throw err
    }
  }
  async getCityListByProvinceId(
    id: number | null,
  ): Promise<GetCity_getCity_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_CITY_BY_PROVINCE,
        variables: { id },
      })
      if (!response || !response.data) throw new Error("Cannot get city list")
      return response.data.getCityByProvince.result
    } catch (err) {
      throw err
    }
  }
  async getSuburbList(): Promise<GetSuburb_getSuburb_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_SUBURB,
        variables: {},
      })
      if (!response || !response.data) throw new Error("Cannot get Suburb list")
      return response.data.getSuburb.result
    } catch (err) {
      throw err
    }
  }
  async getSuburbListByCityId(
    id: number | null,
  ): Promise<GetSuburb_getSuburb_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_SUBURB_BY_CITY,
        variables: { id },
      })
      if (!response || !response.data) throw new Error("Cannot get Suburb list")
      return response.data.getSuburbByCity.result
    } catch (err) {
      throw err
    }
  }
  // Category
  async getMainCategoryList(): Promise<
    GetMainCategory_getMstCategoryMain_result[]
  > {
    try {
      const response = await apolloClient().query({
        query: GET_MAIN_CATEGORY,
        variables: {},
      })
      if (!response || !response.data)
        throw new Error("Cannot get Main Category list")
        console.log(response.data.getMstCategoryMain)
      return response.data.getMstCategoryMain.result
    } catch (err) {
      throw err
    }
  }
  async getCategoryListByParentId(
    id: number | null,
    token?: string,
  ): Promise<GetCategoryByParentId_getMstCategoryByParentId_result[]> {
    try {
      const response = await apolloClient(token).query({
        query: GET_CATEGORY_BY_PARENTID,
        variables: { id },
      })
      if (!response || !response.data)
        throw new Error("Cannot get Category List By ParentId")
      return response.data.getMstCategoryByParentId.result
    } catch (err) {
      throw err
    }
  }
  async getCategoryListByParentIdAsync(
    id: number | null,
    page?: number | null,
    size?: number | null,
    token?: string,
  ): Promise<GetCategoryByParentId_getMstCategoryByParentId_result[]> {
    try {
      const response = await apolloClient(token).query({
        query: GET_CATEGORY_BY_PARENTID,
        variables: { id, page, size },
      })
      if (!response || !response.data)
        throw new Error("Cannot get Category List By ParentId")
      return response.data.getMstCategoryByParentId
    } catch (err) {
      throw err
    }
  }
  async getPrdCategoryList(
    categoryId: number | null,
    page: number,
    size: number,
  ): Promise<GetPrdCategory_getPrdCategoryList_result[]> {
    console.log("getPrdCategoryList")
    console.log(categoryId)
    try {
      const response = await apolloClient().query({
        query: GET_PRD_CATEGORY,
        variables: { categoryId, page, size },
      })
      if (!response || !response.data)
        throw new Error("Cannot get Prd Category List")
      return response.data.getPrdCategoryList.result
    } catch (err) {
      throw err
    }
  }
  async getPrdCategoryListAsync(
    categoryId: number | null,
    page: number,
    size: number,
  ): Promise<GetPrdCategory_getPrdCategoryList_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_PRD_CATEGORY,
        variables: { categoryId, page, size },
      })
      if (!response || !response.data)
        throw new Error("Cannot get Prd Category List")
      return response.data.getPrdCategoryList
    } catch (err) {
      throw err
    }
  }
  async postMstItemRequest(
    mstItemRequest: MstItemRequestInputType,
    files: any | null,
  ): Promise<PostMstItemRequest_postMstItemRequest> {
    try {
      console.log({ mstItemRequest, files })
      const response = await apolloClient().mutate({
        mutation: POST_MST_ITEM_REQUEST,
        variables: { mstItemRequest, files },
      })
      if (!response || !response.data) throw new Error("Cannot register")
      return response.data.postMstItemRequest
    } catch (err) {
      throw err
    }
  }
  async getPostList(
    postId: number | null,
    title: String | null,
    domainId: number | null,
    categoryId: number | null,
    companyId: number | null,
    location: String | null,
    page: number | null,
    size: number | null,
    token?: string,
  ): Promise<GetPostList_getPostList_result[]> {
    try {
      const response = await apolloClient(token).query({
        query: GET_POST_LIST,
        variables: {
          postId,
          title,
          domainId,
          categoryId,
          companyId,
          location,
          page,
          size,
        },
      })
      if (!response || !response.data) throw new Error("Cannot get post list")
      return response.data.getPostList.result
    } catch (err) {
      throw err
    }
  }
  async getJobList(
    postId: number | null,
    title: String | null,
    domainId: number | null,
    categoryId: number | null,
    companyId: number | null,
    location: String | null,
    page: number | null,
    size: number | null,
    token?: string,
  ): Promise<GetPostList_getPostList> {
    try {
      const response = await apolloClient(token).query({
        query: GET_POST_LIST,
        variables: {
          postId,
          title,
          domainId,
          categoryId,
          companyId,
          location,
          page,
          size,
        },
      })
      if (!response || !response.data) throw new Error("Cannot get job list")
      return response.data.getPostList
    } catch (err) {
      throw err
    }
  }
  async postReply(post: PostReplyInputType): Promise<PostReply_postReply> {
    try {
      const response = await apolloClient().mutate({
        mutation: POST_REPLY,
        variables: { post },
      })
      if (!response || !response.data) throw new Error("Cannot post")
      return response.data.postReply
    } catch (err) {
      throw err
    }
  }
}

export default new ReferenceService()
