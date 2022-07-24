import gql from 'graphql-tag'

export const GET_BUSINESS = gql`
  query GetBusiness(
    $companyId: Int = null
    $companyName: String = null
    $franchiseeId: Int = null
    $statusIds: String = null
    $categoryIds: String = null
    $provinceIds: String = null
    $cityIds: String = null
    $suburbIds: String = null
    $size: Int = null
    $page: Int = null
  ) {
    getBusinessList(
      companyId: $companyId
      companyName: $companyName
      franchiseeId: $franchiseeId
      statusIds: $statusIds
      categoryIds: $categoryIds
      provinceIds: $provinceIds
      cityIds: $cityIds
      suburbIds: $suburbIds
      page: $page
      size: $size
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        bEEScorePoint
        bEEStatus
        bEEStatusID
        callType
        categoryIds
        cityId
        cityID
        cityIds
        cityName
        companyId
        companyID
        companyName
        companyPercentage
        companyStatus
        companyStatusID
        compCategory
        compCityID
        compCityName
        compCountryID
        compCountryName
        compDescription
        compEmailId
        compHelpDeskNumber
        compPackageId
        compPackageID
        compPhone
        compProvinceID
        compProvinceName
        compStreetAddress
        compSuburb
        compSuburbID
        compWebSite
        countryId
        countryID
        countryName
        directorsCount
        documentPath
        featured
        franchiseId
        intCategoryIds
        intCompanyMBUDeviceID
        intCompanyMBUDeviceType
        intCompanyMBUEmail
        intCompanyMBUID
        intCompanyMBUName
        intCompPackageID
        intFavouriteID
        intFranchiseID
        intRatingScore
        joinDate
        logoPath
        mainBusinessUserID
        mainCategoryID
        procurementRecognition
        provinceID
        provinceIds
        provinceName
        ratingScore
        selectedCity
        selectedProvince
        selectedSuburb
        serviceTax
        statusId
        suburbID
        suburbIds
        suburbName
        userID
        vATNumber
        zipCode
      }
    }
  }
`

export const GET_BUSINESS_USERS = gql`
  query GetBusinessUsers(
    $id: Int = null
  ) {
    getBusinessUsers(
      id: $id
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        # categoryID
        # cityID
        # cityName
        # companyId
        # companyName
        # compPackageID
        # compPercent
        # contactNo
        # countryId
        # countryName
        # dateofBirth
        # deviceID
        # deviceType
        # domainUrl
        # email
        # emailActivationCode
        # emailNotification
        # facebookUserID
        # failedLoginCount
        # fBAccessCode
        firstName
        # forgetPasswordCode
        # franchiseID
        fullName
        # gender
        # getRequests
        # googleUserID
        # instagramUserID
        # isLoggedIn
        # isMobileLoggedIn
        # joinDate
        # lastLogin
        lastName
        # latitude
        # linkedInUserID
        # longitude
        # mobileActivationCode
        # name
        # packageID
        # password
        # paymentUrl
        # postOnFB
        # postOnGP
        # postOnInstagram
        # postOnLI
        # postOnTwitter
        # provinceID
        # provinceName
        # rId
        # roleId
        # roleName
        # sMSNotification
        # staId
        # statusId
        # statusName
        # streetAddress
        # suburbID
        # suburbName
        # token
        # tokenExpired
        # track
        # twitterUserId
        # userID
        # userName
        userProfileImage
        userProfileThumbNailImage
        # vGender
        # zipCode
      }
      success
      totalPages
    }
  }
`

export const GET_MST_RATING_SCORELIST = gql`
  query GetMstRatingScoreList(
    $key: Int = null
    $keyType: Int = null
    $page: Int = null
    $size: Int = null
  ) {
    getMstRatingScoreList(
      key: $key
      keyType: $keyType
      page: $page
      size: $size
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        # companyID
        # contactNo
        dateofReview
        # documentPath
        # emaiId
        # email
        # fromDate
        # imagePath
        # key
        # keyID
        # keyType
        # mST_RatingID
        # name
        # ratingForDescription
        # ratingForTitle
        # ratingID
        # ratingScore
        # ratingScoreCount
        ratingScoreName
        ratingScorePercent
        review
        # reviewType
        # showResult
        # staId
        # statusId
        # statusName
        title
        # toDate
        # totalRatingCount
        # totalRatingScore
        # userID
        userName
        # userPhoto
      }
      success
      totalPages
    }
  }
`

export const ADD_CUSTOMER_ENQUIRY = gql`
  mutation AddCustomerEnquiry(
    $customerEnquiry: MstCustomerEnquiryInputType!
  ) {
    addCustomerEnquiry(customerEnquiry: $customerEnquiry) {
      count
      currentPage
      message
      nextPage
      prevPage
      # result {
      #   scalar
      # }
      success
      totalPages
    }
  }
`
