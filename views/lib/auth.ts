import authService from '@services/authService'
import { getMobileOperatingSystem } from '@views/lib/helper'

/* Login & Register */
export const doLogin = async (email: string, password: string) => {
  const token = 'Basic ' + window.btoa(`${email}:${password}`)
  const result = await authService.sSOLogin(token)
  return result
}

export const doRegister = async (
  email: string,
  facebookUserID: string | null,
  googleUserID: string | null,
  userProfileImage: string | null,
  firstName: string | null,
  lastName: string | null,
  mobileNumber: string | null,
  password: string | null,
  province: string | null,
  provinceName: string | null,
  city: string | null,
  cityName: string | null,
  suburb: string | null,
  suburbName: string | null,
  categoryID: number | null,
  fBAccessCode: string | null,
) => {
  const username = facebookUserID || googleUserID || email
  const pwd = facebookUserID ? 3 : googleUserID ? 4 : password
  const token = 'Basic ' + window.btoa(`${username}:${pwd}`)
  const result = await authService.registerUser(
    {
      userID: null,
      email: email,
      contactNo: facebookUserID || googleUserID ? null : mobileNumber,
      userName: null,
      facebookUserID: facebookUserID,
      googleUserID: googleUserID,
      linkedInUserID: null,
      forgetPasswordCode: null,
      rId: null,
      staId: null,
      name: null,
      password: facebookUserID || googleUserID ? null : password,
      track: facebookUserID ? 3 : googleUserID ? 4 : 1,
      compPackageID: null,
      categoryID,
      roleId: null,
      roleName: null,
      statusId: null,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName || ''} ${lastName || ''}`,
      dateofBirth: null,
      gender: null,
      vGender: null,
      streetAddress: null,
      countryId: null,
      countryName: null,
      provinceID: province ? Number(province) : null,
      provinceName,
      cityID: city ? Number(city) : null,
      cityName,
      suburbID: suburb ? Number(suburb) : null,
      suburbName,
      zipCode: null,
      longitude: null,
      latitude: null,
      statusName: null,
      lastLogin: null,
      companyId: null,
      companyName: null,
      compPercent: null,
      packageID: null,
      getRequests: null,
      isLoggedIn: null,
      isMobileLoggedIn: null,
      userProfileImage: userProfileImage || null,
      userProfileThumbNailImage: userProfileImage || null,
      failedLoginCount: null,
      postOnFB: null,
      fBAccessCode: fBAccessCode || null,
      postOnGP: null,
      twitterUserId: null,
      postOnTwitter: null,
      instagramUserID: null,
      postOnInstagram: null,
      emailNotification: null,
      sMSNotification: null,
      joinDate: null,
      postOnLI: null,
      franchiseID: null,
      deviceType: null,
      deviceID: null,
      token: null,
      tokenExpired: null,
      mobileActivationCode: null,
      emailActivationCode: null,
      domainUrl: '1', // lawyer : 1, Manufaturing: 2, TyresandShocks: 3, Carspares: 4
      paymentUrl: null,
    },
    getMobileOperatingSystem() === 'unknown' ? 1 : 0,
    token,
  )
  return result
}
