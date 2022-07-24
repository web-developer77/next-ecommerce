import { createSlice } from '@reduxjs/toolkit'
import { IAttorneyState } from './types'

const initialState: IAttorneyState = {
  businessList: null,
}
const AttorneyPageSlice = createSlice({
  name: 'attorneyPage',
  initialState,
  reducers: {
    setBusinessList: (state, action) => {
      state.businessList = action.payload
    },
  },
})

export const { setBusinessList } = AttorneyPageSlice.actions
export default AttorneyPageSlice.reducer
