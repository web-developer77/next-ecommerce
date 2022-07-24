import { createSelector } from 'reselect'
import { IRootState } from '@redux/types'

const selectProductDetail = (state: IRootState) => state.homePage

export const makeSelectProducts = createSelector(
  selectProductDetail,
  (homePage) => [...homePage.productList?.result || [], ...homePage.legalList?.result || []]
)
