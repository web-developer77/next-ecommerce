import gql from "graphql-tag";

export const Guest_Login = gql`
  query GuestLogin {
    guestLogin {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        validTo
        value
      }
    }
  }
`;

export const OAUTH = gql`
  query OAuth {
    oAuth {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        firstName
        lastName
        paymentUrl
        token
        tokenExpires
      }
    }
  }
`;

export const SSO_LOGIN = gql`
  query SSOLogin {
    sSOLogin {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        firstName
        lastName
        paymentUrl
        token
        tokenExpires
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($userDto: MstUserDtoInputType!, $platform: Int!) {
    registerUser(userDto: $userDto, platform: $platform) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        firstName
        lastName
        paymentUrl
        token
        tokenExpires
      }
      success
      totalPages
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  query ForgetPassword($email: String = null, $domainUrl: Int = null) {
    forgetPassword(email: $email, domainUrl: $domainUrl) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
    }
  }
`;

export const CONFIRM_EMAIL = gql`
  query ConfirmEmail($id: String = null) {
    confirmEmail(id: $id) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
    }
  }
`;

export const EMAIL_CHECK = gql`
  query EmailCheck($email: String = null) {
    emailCheck(email: $email) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
    }
  }
`;

export const COMPANY_CHECK = gql`
  query CompanyCheck($name: String = null) {
    companyCheck(name: $name) {
      count
      currentPage
      message
      nextPage
      prevPage
      result
      success
      totalPages
    }
  }
`;

export const MOBILE_CHECK = gql`
  query MobileCheck($mobile: String = null) {
    mobileCheck(mobile: $mobile) {
      count
      currentPage
      message
      nextPage
      prevPage
      result
      success
      totalPages
    }
  }
`;

export const GET_MST_PACKAGE_LIST = gql`
  query GetMstPackageList(
    $packageIds: String = null
    $includePackageIds: String = null
    $excludePackageIds: String = null
    $packageName: String = null
    $packageId: Int = null
    $status: Boolean = null
  ) {
    getMstPackageList(
      packageIds: $packageIds
      includePackageIds: $includePackageIds
      excludePackageIds: $excludePackageIds
      packageName: $packageName
      packageId: $packageId
      status: $status
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        activeText
        amount
        isActive
        isRecommended
        packageID
        packageName
        recommendedText
        sortOrder
      }
      success
      totalPages
    }
  }
`;

export const GET_MST_PACKAGE_DETAIL_LIST = gql`
  query GetMstPackageDetailList(
    $packageId: Int = null
    $status: Boolean = null
  ) {
    getMstPackageDetailList(packageId: $packageId, status: $status) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        activeText
        actualValue
        amount
        attributeID
        attributeName
        isActive
        packageDetailsID
        packageID
        pD_ActiveText
        pD_isActive
        sortOrder
        value
      }
      success
      totalPages
    }
  }
`;

export const REGISTER_BUSINESS = gql`
  mutation RegisterBusiness($userDto: MstUserDtoInputType!) {
    registerBusiness(userDto: $userDto) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        firstName
        lastName
        paymentUrl
        token
        tokenExpires
      }
      success
      totalPages
    }
  }
`;

export const CONTACT_US = gql`
  mutation ContactUs($contactUs: ContactUsDtoInputType!) {
    contactUs(contactUs: $contactUs) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
    }
  }
`;

export const GET_SESSION = gql`
  query GetSession($id: Int = null) {
    getSession(id: $id) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        domain
        expires
        sessionContractLogin
        sessionKeyContractLogin
        sessionKeyLogin
        sessionLogin
      }
      success
      totalPages
    }
  }
`;
