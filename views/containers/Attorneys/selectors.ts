import { createSelector } from 'reselect'
import { IRootState } from '@redux/types'

const selectAttorneyPage = (state: IRootState) => state.attorneyPage

export const makeSelectBusinessList = createSelector(
  selectAttorneyPage,
  (attorneyPage) => attorneyPage.businessList,
)
