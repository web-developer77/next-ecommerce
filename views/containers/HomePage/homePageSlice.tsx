import { createSlice } from '@reduxjs/toolkit'
import { IHomePageState } from './types'

const initialState: IHomePageState = {
  productList: null,
  legalList: null,
  cartList: null,
}
const HomePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload
    },
    setLegalList: (state, action) => {
      state.legalList = action.payload
    },
    setCartList: (state, action) => {
      state.cartList = action.payload
    },
  },
})

export const { setProductList, setLegalList, setCartList } = HomePageSlice.actions
export default HomePageSlice.reducer
