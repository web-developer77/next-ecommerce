import gql from 'graphql-tag'
import { MstUserDtoInputType } from '__generated__/globalTypes'

export const GET_PROVINCE = gql`
  query GetProvince {
    getProvince {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        provinceId
        provinceName
        # countryId
        # country {
        #   countryId
        #   countryName
        #   createdBy
        #   createdDate
        #   isActive
        #   modifiedBy
        #   modifiedDate
        # }
        # createdBy
        # createdDate
        # modifiedBy
        # modifiedDate
        isActive
        # mapCompanyArea {
        #   city {
        #     cityId
        #     cityName
        #   }
        #   cityId
        #   companyAreaId
        #   compPackageId
        # }
        # mstCity {
        #   cityId
        #   cityName
        #   createdBy
        #   createdDate
        #   isActive
        #   modifiedBy
        #   modifiedDate
        #   mstSuburb {
        #     cityId
        #     suburbId
        #     suburbName
        #     createdBy
        #     createdDate
        #     isActive
        #     modifiedBy
        #     modifiedDate
        #   }
        #   provinceId
        # }
        # mstSpecials {
        #   specialId
        #   companyId
        #   specialName
        #   description
        #   startDate
        #   endDate
        #   amount
        #   statusId
        #   streetAddress
        #   categoryId
        #   countryId
        #   provinceId
        #   cityId
        #   suburbId
        # }
      }
    }
  }
`

export const GET_CITY = gql`
  query GetCity {
    getCity {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        cityId
        cityName
        # createdBy
        # createdDate
        isActive
        # modifiedBy
        # modifiedDate
        provinceId
      }
    }
  }
`

export const GET_CITY_BY_PROVINCE = gql`
  query GetCityByProvince($id: Int = null) {
    getCityByProvince(id: $id) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        cityId
        cityName
        # createdBy
        # createdDate
        isActive
        # modifiedBy
        # modifiedDate
        provinceId
      }
    }
  }
`

export const GET_SUBURB = gql`
  query GetSuburb {
    getSuburb {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        cityId
        # createdBy
        # createdDate
        isActive
        # modifiedBy
        # modifiedDate
        suburbId
        suburbName
      }
    }
  }
`

export const GET_SUBURB_BY_CITY = gql`
  query GetSuburbByCity($id: Int = null) {
    getSuburbByCity(id: $id) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        cityId
        # createdBy
        # createdDate
        isActive
        # modifiedBy
        # modifiedDate
        suburbId
        suburbName
      }
    }
  }
`

export const GET_MAIN_CATEGORY = gql`
  query GetMainCategory {
    getMstCategoryMain {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        categoryIcon
        categoryId
        categoryName
        categoryThumbNailIcon
        # createdBy
        # createdDate
        isActive
        isCategory
        isMainCategory
        isMenuAllowed
        # modifiedBy
        # modifiedDate
        parentCategoryId
        timeDelayException
      }
    }
  }
`

export const GET_CATEGORY_BY_PARENTID = gql`
  query GetCategoryByParentId(
    $id: Int = null,
    $page: Int = null
    $size: Int = null
  ) {
    getMstCategoryByParentId(id: $id, page: $page, size: $size) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        categoryIcon
        categoryId
        categoryName
        categoryThumbNailIcon
        # createdBy
        # createdDate
        isActive
        isCategory
        isMainCategory
        isMenuAllowed
        # modifiedBy
        # modifiedDate
        parentCategoryId
        timeDelayException
      }
    }
  }
`

export const GET_PRD_CATEGORY = gql`
  query GetPrdCategory(
    $categoryId: Int = null
    $categoryIds: String = null
    $categoryName: String = null
    $domainId: Int = null
    $status: Boolean = null
    $includeCategoryIds: String = null
    $excludeCategoryIds: String = null
    $page: Int!
    $size: Int!
  ) {
    getPrdCategoryList(
      categoryId: $categoryId
      categoryIds: $categoryIds
      categoryName: $categoryName
      domainId: $domainId
      status: $status
      includeCategoryIds: $includeCategoryIds
      excludeCategoryIds: $excludeCategoryIds
      page: $page
      size: $size
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        activeText
        categoryId
        categoryName
        domainId
        domainID
        domainName
        isActive
      }
      success
      totalPages
    }
  }
`

export const POST_MST_ITEM_REQUEST = gql`
  mutation PostMstItemRequest(
    $mstItemRequest: MstItemRequestInputType!
    $files: [Upload] = null
  ) {
    postMstItemRequest(mstItemRequest: $mstItemRequest, files: $files) {
      count
      currentPage
      message
      nextPage
      prevPage
      # result
      success
      totalPages
    }
  }
`

export const GET_POST_LIST = gql`
  query GetPostList (
    $postId: Int = null
    $title: String = null
    $domainId: Int = null
    $categoryId: Int = null
    $companyId: Int = null
    $location: String = null
    $page: Int = null
    $size: Int = null
  ) {
    getPostList (
      postId: $postId
      title: $title
      domainId: $domainId
      categoryId: $categoryId
      companyId: $companyId
      location: $location
      page: $page
      size: $size
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        categoryID
        companyID
        companyName
        description
        descriptionSEO
        documentName
        domainID
        endDate
        filePath
        googleSchema
        keywordsSEO
        location
        name
        postID
        startDate
        thumbNailImagePath
        title
        titleSEO
      }
      success
      totalPages
    }
  }
`

export const POST_REPLY = gql`
  mutation PostReply(
    $post: PostReplyInputType!
  ) {
    postReply(post: $post) {
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
`
