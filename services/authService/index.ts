import { apolloClient } from '@graphql/index'
import {
  ContactUsDtoInputType,
  MstUserDtoInputType,
} from '__generated__/globalTypes'
import {
  COMPANY_CHECK,
  CONTACT_US,
  EMAIL_CHECK,
  FORGOT_PASSWORD,
  GET_MST_PACKAGE_DETAIL_LIST,
  GET_MST_PACKAGE_LIST,
  Guest_Login,
  MOBILE_CHECK,
  OAUTH,
  REGISTER_BUSINESS,
  SSO_LOGIN,
  REGISTER_USER,
  GET_SESSION,
  CONFIRM_EMAIL
} from './queries'
import { CompanyCheck_companyCheck } from './__generated__/CompanyCheck'
import { ContactUs_contactUs } from './__generated__/ContactUs'
import { EmailCheck_emailCheck } from './__generated__/EmailCheck'
import { ForgetPassword_forgetPassword } from './__generated__/ForgetPassword'
import { ConfirmEmail_confirmEmail } from './__generated__/ConfirmEmail'
import { GetMstPackageDetailList_getMstPackageDetailList_result } from './__generated__/GetMstPackageDetailList'
import { GetMstPackageList_getMstPackageList_result } from './__generated__/GetMstPackageList'
import { GetSession_getSession_result } from './__generated__/GetSession'
import { GuestLogin_guestLogin_result } from './__generated__/GuestLogin'
import { MobileCheck_mobileCheck } from './__generated__/MobileCheck'
import { OAuth_oAuth } from './__generated__/OAuth'
import { RegisterBusiness_registerBusiness, RegisterBusiness_registerBusiness_result } from './__generated__/RegisterBusiness'
import { RegisterUser_registerUser_result } from './__generated__/RegisterUser'
import { SSOLogin_sSOLogin } from './__generated__/SSOLogin'

class AuthService {
  async getGuestToken(): Promise<GuestLogin_guestLogin_result> {
    try {
      const response = await apolloClient().query({
        query: Guest_Login,
      })
      if (!response || !response.data) throw new Error('Cannot get JWT token')
      return response.data.guestLogin.result
    } catch (err) {
      throw err
    }
  }
  async getMstPackageList(
    packageIds: String | null,
    includePackageIds: String | null,
    excludePackageIds: String | null,
    packageName: String | null,
    packageId: number | null,
    status: Boolean | null,
    token?: string,
  ): Promise<GetMstPackageList_getMstPackageList_result[]> {
    try {
      const response = await apolloClient(token).query({
        query: GET_MST_PACKAGE_LIST,
        variables: {
          packageIds,
          includePackageIds,
          excludePackageIds,
          packageName,
          packageId,
          status,
        },
      })
      if (!response || !response.data)
        throw new Error('Cannot get package list')
      return response.data.getMstPackageList.result
    } catch (err) {
      throw err
    }
  }
  async getMstPackageDetailList(
    packageId: number | null,
    status: Boolean | null,
  ): Promise<GetMstPackageDetailList_getMstPackageDetailList_result[]> {
    try {
      const response = await apolloClient().query({
        query: GET_MST_PACKAGE_DETAIL_LIST,
        variables: {
          packageId,
          status,
        },
      })
      if (!response || !response.data)
        throw new Error('Cannot get package detail')
      return response.data.getMstPackageDetailList.result
    } catch (err) {
      throw err
    }
  }
  async emailCheck(email: String | null): Promise<EmailCheck_emailCheck> {
    try {
      const response = await apolloClient().query({
        query: EMAIL_CHECK,
        variables: { email },
      })
      if (!response || !response.data) throw new Error('Cannot check email')
      return response.data.emailCheck
    } catch (err) {
      throw err
    }
  }
  async companyCheck(name: String | null): Promise<CompanyCheck_companyCheck> {
    try {
      const response = await apolloClient().query({
        query: COMPANY_CHECK,
        variables: { name },
      })
      if (!response || !response.data)
        throw new Error('Cannot check company name')
      return response.data.companyCheck
    } catch (err) {
      throw err
    }
  }
  async mobileCheck(mobile: String | null): Promise<MobileCheck_mobileCheck> {
    try {
      const response = await apolloClient().query({
        query: MOBILE_CHECK,
        variables: { mobile },
      })
      if (!response || !response.data)
        throw new Error('Cannot check mobile number')
      return response.data.mobileCheck
    } catch (err) {
      throw err
    }
  }
  async registerBusiness(
    userDto: MstUserDtoInputType,
  ): Promise<RegisterBusiness_registerBusiness_result> {
    try {
      const response = await apolloClient().mutate({
        mutation: REGISTER_BUSINESS,
        variables: { userDto },
      })
      if (!response || !response.data) throw new Error('Cannot register')
      return response.data.registerBusiness.result
    } catch (err) {
      throw err
    }
  }
  async contactUs(
    contactUs: ContactUsDtoInputType,
  ): Promise<ContactUs_contactUs> {
    try {
      const response = await apolloClient().mutate({
        mutation: CONTACT_US,
        variables: { contactUs },
      })
      if (!response || !response.data) throw new Error('Cannot contact')
      return response.data.contactUs
    } catch (err) {
      throw err
    }
  }
  // Authentication
  async oAuth(token: string): Promise<OAuth_oAuth> {
    try {
      const response = await apolloClient(token).query({
        query: OAUTH,
      })
      if (!response || !response.data) throw new Error('Cannot oauth')
      return response.data.oAuth
    } catch (err) {
      throw err
    }
  }
  async sSOLogin(token: string): Promise<SSOLogin_sSOLogin> {
    try {
      const response = await apolloClient(token).query({
        query: SSO_LOGIN,
      })
      if (!response || !response.data) throw new Error('Cannot SSO LOGIN')
      return response.data.sSOLogin
    } catch (err) {
      throw err
    }
  }
  async forgetPassword(
    email: String | null,
    domainUrl: number | null,
  ): Promise<ForgetPassword_forgetPassword> {
    try {
      const response = await apolloClient().query({
        query: FORGOT_PASSWORD,
        variables: { email, domainUrl },
      })
      if (!response || !response.data) throw new Error('Cannot forget Password')
      return response.data.forgetPassword
    } catch (err) {
      throw err
    }
  }
  async confirmEmail(
    id: String | null,
  ): Promise<ConfirmEmail_confirmEmail> {
    try {
      const response = await apolloClient().query({
        query: CONFIRM_EMAIL,
        variables: { id },
      })
      if (!response || !response.data) throw new Error('Cannot confirm Password')
      return response.data.confirmEmail
    } catch (err) {
      throw err
    }
  }
  async registerUser(
    userDto: MstUserDtoInputType,
    platform: number,
    token: string,
  ): Promise<RegisterUser_registerUser_result> {
    try {
      const response = await apolloClient("empty").mutate({
        mutation: REGISTER_USER,
        variables: { userDto, platform },
      })
      if (!response || !response.data) throw new Error('Cannot register')
      return response.data.registerUser.result
    } catch (err) {
      throw err
    }
  }
  async getSession(id: number | null): Promise<GetSession_getSession_result> {
    try {
      const response = await apolloClient().query({
        query: GET_SESSION,
        variables: { id },
      })
      if (!response || !response.data) throw new Error('Cannot get session')
      return response.data.getSession.result
    } catch (err) {
      throw err
    }
  }
}

export default new AuthService()
