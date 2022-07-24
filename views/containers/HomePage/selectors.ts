import { createSelector } from 'reselect'
import { IRootState } from '@redux/types'

const selectHomePage = (state: IRootState) => state.homePage

export const makeSelectProductList = createSelector(
  selectHomePage,
  (homePage) => homePage.productList,
)

export const makeSelectLegalList = createSelector(
  selectHomePage,
  (homePage) => homePage.legalList,
)

export const makeSelectCartList = createSelector(
  selectHomePage,
  (homePage) => homePage.cartList,
)
