import { GetBusiness } from '@services/businessService/__generated__/GetBusiness'

export interface IAttorneyState {
  businessList: GetBusiness['getBusinessList']
}
