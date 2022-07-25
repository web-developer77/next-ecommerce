import gql from 'graphql-tag'

export const GET_PRODUCTS = gql`
  query GetProducts(
    $productName: String
    $productId: Int
    $fromPrice: Decimal
    $toPrice: Decimal
    $categoryId: Int
    $status: Boolean
    $salesTypeId: Int
    $domainCategoryIds: String
    $userId: Int
    $scopeId: Int
    $size: Int
    $page: Int
    $companyId: Int    
  ) {
    getPrdProductList(
      productName: $productName
      productId: $productId
      fromPrice: $fromPrice
      toPrice: $toPrice
      categoryId: $categoryId
      status: $status
      salesTypeId: $salesTypeId
      domainCategoryIds: $domainCategoryIds
      userId: $userId
      scopeId: $scopeId
      page: $page
      size: $size
      companyId: $companyId     
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        activeText
        categoryID
        categoryName
        description
        documentName
        documentPath
        isActive
        companyID
        ratingScore
        salesTypeId
        scopeID
        typeID
        productID
        productImage
        productName
        productNumber
        inventory
        clickCount
        viewCount
        unitCost
        length
        width
        height
        volume
        weight
        googleSchema
        domainCategoryName
        domainCategory
        endDate
        mapProductImages {
          imageName
          imagePath
        }
        prdBid {
          bidId
          createdDate
          bidAmount
          userId
        }
        prdHire {
          hireId
          userId
          isAccepted
          fromDate
          toDate
          returned
        }
      }
    }
  }
`

export const GET_MST = gql`
  query GetMst(
    $specialId: Int
    $specialName: String
    $franchiseId: Int
    $statusIds: String
    $distance: Decimal
    $companyIds: String
    $categoryIds: String
    $provinceIds: String
    $cityIds: String
    $suburbIds: String
    $page: Int
    $size: Int
  ) {
    getMstSpecialList(
      specialId: $specialId
      specialName: $specialName
      franchiseId: $franchiseId
      statusIds: $statusIds
      distance: $distance
      companyIds: $companyIds
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
        amount
        categoryID
        categoryIds
        categoryName
        cityID
        cityName
        companyIds
        countryID
        countryName
        dis
        distance
        documentLink
        endDate
        franchiseId
        imagePath
        latitude
        longitude
        phone
        provinceID
        provinceIds
        provinceName
        specialDescription
        specialId
        specialID
        specialName
        staId
        startDate
        statusId
        statusName
        streetAddress
        suburb
        suburbID
        suburbIds
        userId
        userLatitude
        userLongtitude
        zipCode
        mapSpecialUpload {
          uploadPath
          thumbNailPath
        }
      }
    }
  }
`

export const GET_MAG = gql`
  query GetMag(
    $franchiseId: Int
    $eflyerId: String
    $magazineName: String
    $statusIds: String
    $companyIds: String
    $categoryIds: String
    $provinceIds: String
    $cityIds: String
    $suburbIds: String
    $page: Int
    $size: Int
  ) {
    getMagazinesList(
      franchiseId: $franchiseId
      eflyerId: $eflyerId
      magazineName: $magazineName
      statusIds: $statusIds
      companyIds: $companyIds
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
        eflyerId
        magazineName
        eFlyerDescription
        categoryID
        categoryName
        startDate
        endDate
        statusId
        statusName
        companyId
        companyName
        companyDescription
        isMenu
        streetAddress
        countryID
        countryName
        provinceID
        provinceName
        cityID
        cityName
        suburbID
        suburb
        zipCode
        phone
        companyLocation
        mapEflyersUploadDtos {
          filePath
        }
      }
    }
  }
`

export const GET_PRD_SHOPPING_CART = gql`
  query GetPrdShoppingCart($page: Int!, $size: Int!) {
    getPrdShoppingCart(page: $page, size: $size) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        prdShoppingCartDto {
          categoryID
          categoryName
          description
          productID
          productImage
          productName
          productNumber
          quantity
          recordID
          fromDate
          endDate
          totalPrice
          unitCost
          prdProduct {
            salesTypeId
          }
        }
        totalAmount
        amountExlVat
        vatAmount
        recuringAmount
      }
    }
  }
`

export const PURCHASE_SHOPPING_CART_ASYNC = gql`
  query PurchaseShoppingCartAsync($id: Int!) {
    purchaseShoppingCartAsync(id: $id) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        paymentUrl,
        paymentMethod
      }
    }
  }
`

export const DELETE_PRD_SHOPPING_CART_NEW = gql`
  mutation DeletePrdShoppingCartNew($prdShoppingCartId: Int!) {
    deletePrdShoppingCartNew(
      prdShoppingCartId: $prdShoppingCartId
      recordID: 0
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        recordID
        productID
        categoryID
        categoryName
        productNumber
        productName
        productImage
        unitCost
        description
        quantity
        totalPrice
        fromDate
        endDate
      }
      success
      totalPages
    }
  }
`
export const DELETE_PRD_SHOPPING_CART = gql`
  mutation deletePrdShoppingCart($prdShoppingCart: PrdShoppingCartInputType!) {
    deletePrdShoppingCart(
      prdShoppingCart: $prdShoppingCart
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        totalAmount  
        vatAmount
        amountExlVat
        recuringAmount
        prdShoppingCartDto
        {
          recordID
          productID
          categoryID
          categoryName
          productNumber
          productName
          productImage
          unitCost
          description
          quantity
          totalPrice
          fromDate
          endDate
        }
      }
      success
      totalPages
    }
  }
`

export const POST_PRD_SHOPPING_CART = gql`
  mutation postPrdShoppingCartOptimized(
    $prdShoppingCart: PrdShoppingCartInputType!
  ) {
    postPrdShoppingCartOptimized(prdShoppingCart: $prdShoppingCart) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        prdShoppingCartDto {
          categoryID
          categoryName
          description
          productID
          productImage
          productName
          productNumber
          quantity
          recordID
          fromDate
          endDate
          totalPrice
          unitCost
          prdProduct {
            salesTypeId
          }
        }
        totalAmount
        amountExlVat
        vatAmount
        recuringAmount
      }
    }
  }
`

export const UPDATE_PRD_SHOPPING_CART = gql`
  mutation updatePrdShoppingCart(
    $prdShoppingCart: PrdShoppingCartInputType!
  ) {
    updatePrdShoppingCart(prdShoppingCart: $prdShoppingCart) {
      recordId,
      sessionId
    }
  }
`

export const CREATE_PRD_BID = gql`
  mutation CreatePrdBid($prdBid: PrdBidInputType!) {
    createPrdBid(prdBid: $prdBid) {
      bidAmount
      bidApprovedMail
      bidId
      createdDate
      isAccepted
      isActive
      modifiedBy
      modifiedDate
      # mstCountry {
      # }
      productId
      userId
    }
  }
`

export const CREATE_PRD_HIRE = gql`
  mutation CreatePrdHire($prdHire: PrdHireInputType!) {
    createPrdHire(prdHire: $prdHire) {
      businessConfirmedReturned
      businessConfirmedReturnedDate
      clientConfirmedReturned
      clientConfirmedReturnedDate
      fromDate
      hireId
      isAccepted
      # mstCountry {
      # }
      productId
      returned
      returnedDate
      toDate
      userId
    }
  }
`

export const CREATE_MST_RATING = gql`
  mutation CreateMstRating($mstRating: MstRatingInputType!) {
    createMstRating(mstRating: $mstRating) {
      # company {
      # }
      companyId
      contactNo
      createdBy
      createdDate
      eflyerId
      emaiId
      modifiedBy
      modifiedDate
      mstRatingId
      name
      productId
      ratingScore
      review
      # special {
      # }
      specialId
      # status {
      # }
      statusId
      # user {
      # }
      userId
    }
  }
`

export const CREATE_MST_FAVOURITES = gql`
  mutation CreateMstFavourites($mstFavourites: MstFavouritesInputType!) {
    createMstFavourites(mstFavourites: $mstFavourites) {
      companyId
      createdBy
      createdDate
      eflyerId
      modifiedBy
      modifiedDate
      mstFavouriteId
      productId
      specialId
      userId
    }
  }
`
