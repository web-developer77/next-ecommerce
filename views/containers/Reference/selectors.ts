import { createSelector } from 'reselect'
import { IRootState } from '@redux/types'

const selectReference = (state: IRootState) => state.reference

export const makeSelectReference = createSelector(
  selectReference,
  (reference) => reference
)
