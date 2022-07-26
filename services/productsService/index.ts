import { apolloClient } from '@graphql/index'
import {
  MstFavouritesInputType,
  MstRatingInputType,
  PrdBidInputType,
  PrdHireInputType,
  PrdShoppingCartInputType,
} from '__generated__/globalTypes'
import {
  CREATE_MST_FAVOURITES,
  CREATE_MST_RATING,
  CREATE_PRD_BID,
  CREATE_PRD_HIRE,
  DELETE_PRD_SHOPPING_CART_NEW,
  GET_PRD_SHOPPING_CART,
  GET_PRODUCTS,
  POST_PRD_SHOPPING_CART,
  PURCHASE_SHOPPING_CART_ASYNC,
  GET_MST,
  GET_MAG,
  DELETE_PRD_SHOPPING_CART,
  UPDATE_PRD_SHOPPING_CART,
} from './queries'
import {
  GetProducts,
  GetProducts_getPrdProductList,
} from './__generated__/GetProducts'
import { GetMst, GetMst_getMstSpecialList } from './__generated__/GetMst'
import { GetMag, GetMag_getMagazinesList } from './__generated__/GetMag'
import { PostPrdShoppingCart_postPrdShoppingCart } from './__generated__/PostPrdShoppingCart'
import { CreatePrdBid_createPrdBid } from './__generated__/CreatePrdBid'
import { CreateMstRating_createMstRating } from './__generated__/CreateMstRating'
import { GetPrdShoppingCart_getPrdShoppingCart } from './__generated__/GetPrdShoppingCart'
import { PurchaseShoppingCartAsync_purchaseShoppingCartAsync } from './__generated__/PurchaseShoppingCartAsync'
import { DeletePrdShoppingCartNew_deletePrdShoppingCartNew } from './__generated__/DeletePrdShoppingCartNew'
import { CreatePrdHire_createPrdHire } from './__generated__/CreatePrdHire'

class ProductService {
  async getPrdProductList(
    productName: String | null,
    productId: Number | null,
    fromPrice: Number | null,
    toPrice: Number | null,
    categoryId: any | null,
    domainCategoryIds: any | null,
    status: Boolean | null,
    salesTypeId: Number | null,
    scopeId: Number | null,
    userId: Number | null,
    size: Number | null,
    page: Number | null,
    companyId: Number | null,
    token?: string,
  ): Promise<GetProducts_getPrdProductList> {
    try {
      const response = await apolloClient(token).query({
        query: GET_PRODUCTS,
        variables: {
          productName,
          productId,
          fromPrice,
          toPrice,
          categoryId,
          domainCategoryIds: domainCategoryIds ? `${domainCategoryIds}` : null,
          status,
          salesTypeId,
          scopeId,
          userId,
          companyId,
          page,
          size,
        },
      })
      if (!response || !response.data)
        throw new Error('Cannot get product list')
      return response.data.getPrdProductList
    } catch (err) {
      throw err
    }
  }

  async getMstSpecialList(
    specialId: any | null,
    specialName: any | null,
    franchiseId: Number | null,
    statusIds: String | null,
    distance: Number | null,
    companyIds: String | null,
    categoryIds: String | null,
    provinceIds: String | null,
    cityIds: String | null,
    suburbIds: String | null,
    page: Number | null,
    size: Number | null,
    token?: string,
  ): Promise<GetMst_getMstSpecialList | null> {
    try {
      const response = await apolloClient(token).query({
        query: GET_MST,
        variables: {
          specialId,
          specialName,
          franchiseId,
          statusIds,
          distance,
          companyIds,
          categoryIds,
          provinceIds,
          cityIds,
          suburbIds,
          page,
          size,
        },
      })
      if (!response || !response.data)
        throw new Error('Cannot get product list')
      return response.data.getMstSpecialList
    } catch (err) {
      throw err
    }
  }

  async getMagazinesList(
    franchiseId: number | null,
    eflyerId: any | null,
    magazineName: String | null,
    statusIds: String | null,
    companyIds: String | null,
    categoryIds: String | null,
    provinceIds: String | null,
    cityIds: String | null,
    suburbIds: String | null,
    page: number | null,
    size: number | null,
    token?: string,
  ): Promise<GetMag_getMagazinesList | null> {
    try {
      const response = await apolloClient(token).query({
        query: GET_MAG,
        variables: {
          franchiseId,
          eflyerId,
          magazineName,
          statusIds,
          companyIds,
          categoryIds,
          provinceIds,
          cityIds,
          suburbIds,
          page,
          size,
        },
      })
      if (!response || !response.data)
        throw new Error('Cannot get product list')
      return response.data.getMagazinesList
    } catch (err) {
      throw err
    }
  }

  async getPrdShoppingCart(
    size: number,
    page: number,
    token?: string,
  ): Promise<GetPrdShoppingCart_getPrdShoppingCart> {
    try {
      const response = await apolloClient(token).query({
        query: GET_PRD_SHOPPING_CART,
        variables: {
          size,
          page,
        },
      })
      if (!response || !response.data) throw new Error('Cannot get cart list')
      return response.data.getPrdShoppingCart
    } catch (err) {
      throw err
    }
  }
  async purchaseShoppingCartAsync(
    id: number,
  ): Promise<PurchaseShoppingCartAsync_purchaseShoppingCartAsync> {
    try {
      const response = await apolloClient().query({
        query: PURCHASE_SHOPPING_CART_ASYNC,
        variables: { id },
      })
      if (!response || !response.data)
        throw new Error('Cannot cownload cart list')
      return response.data.purchaseShoppingCartAsync
    } catch (err) {
      throw err
    }
  }
  async postPrdShoppingCart(
    prdShoppingCart: PrdShoppingCartInputType,
  ): Promise<PostPrdShoppingCart_postPrdShoppingCart> {
    try {
      console.log("postPrdShoppingCart-before", prdShoppingCart)
      const response = await apolloClient().mutate({
        mutation: POST_PRD_SHOPPING_CART,
        variables: { prdShoppingCart },
        refetchQueries: [
          {
            query: GET_PRD_SHOPPING_CART,
            variables: {
              size: 10,
              page: 1,
            },
          },
        ],
      })
      if (!response || !response.data) throw new Error('Cannot add cart')
      console.log("postPrdShoppingCart-after", response.data.postPrdShoppingCartOptimized)
      return response.data.postPrdShoppingCartOptimized
    } catch (err) {
      throw err
    }
  }
  async updatePrdShoppingCart(
    prdShoppingCart: PrdShoppingCartInputType,
  ): Promise<PostPrdShoppingCart_postPrdShoppingCart> {
    try {
      const response = await apolloClient().mutate({
        mutation: UPDATE_PRD_SHOPPING_CART,
        variables: { prdShoppingCart },
        refetchQueries: [
          {
            query: GET_PRD_SHOPPING_CART,
            variables: {
              size: 10,
              page: 1,
            },
          },
        ],
      })
      if (!response || !response.data) throw new Error('Cannot add cart')
      return response.data.postPrdShoppingCartOptimized
    } catch (err) {
      throw err
    }
  }

  async deletePrdShoppingCartNew(recordId: any): Promise<
    DeletePrdShoppingCartNew_deletePrdShoppingCartNew
  > {
    try {
      let token = localStorage.getItem('token')
      const response = await apolloClient().mutate({
        mutation: DELETE_PRD_SHOPPING_CART,
        variables: { prdShoppingCart: { recordId: Number(recordId) } },
        refetchQueries: [
          {
            query: GET_PRD_SHOPPING_CART,
            variables: {
              size: 10,
              page: 1,
            },
          },
        ],
      })
      if (!response || !response.data) throw new Error('Cannot empty cart')
      return response.data.deletePrdShoppingCartNew
    } catch (err) {
      throw err
    }
  }
  async createPrdBid(
    prdBid: PrdBidInputType,
  ): Promise<CreatePrdBid_createPrdBid> {
    try {
      const response = await apolloClient().mutate({
        mutation: CREATE_PRD_BID,
        variables: { prdBid },
      })
      if (!response || !response.data) throw new Error('Cannot create bid')
      return response.data.createPrdBid
    } catch (err) {
      throw err
    }
  }
  async createPrdHire(
    prdHire: PrdHireInputType,
  ): Promise<CreatePrdHire_createPrdHire> {
    try {
      const response = await apolloClient().mutate({
        mutation: CREATE_PRD_HIRE,
        variables: { prdHire },
      })
      if (!response || !response.data) throw new Error('Cannot create hire')
      return response.data.createPrdHire
    } catch (err) {
      throw err
    }
  }
  async createMstRating(
    mstRating: MstRatingInputType,
  ): Promise<CreateMstRating_createMstRating> {
    try {
      const response = await apolloClient().mutate({
        mutation: CREATE_MST_RATING,
        variables: { mstRating },
      })
      if (!response || !response.data) throw new Error('Cannot create rating')
      return response.data.createMstRating
    } catch (err) {
      throw err
    }
  }
  async createMstFavourites(
    mstFavourites: MstFavouritesInputType,
  ): Promise<CreateMstRating_createMstRating> {
    try {
      const response = await apolloClient().mutate({
        mutation: CREATE_MST_FAVOURITES,
        variables: { mstFavourites },
      })
      if (!response || !response.data)
        throw new Error('Cannot create favourites')
      return response.data.createMstFavourites
    } catch (err) {
      throw err
    }
  }
}

export default new ProductService()
