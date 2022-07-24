import { GetPrdShoppingCart_getPrdShoppingCart } from '@services/productsService/__generated__/GetPrdShoppingCart';
import { GetProducts } from '@services/productsService/__generated__/GetProducts'

export interface IHomePageState {
  productList: GetProducts['getPrdProductList'],
  legalList: GetProducts['getPrdProductList'],
  cartList: GetPrdShoppingCart_getPrdShoppingCart | null,
}
