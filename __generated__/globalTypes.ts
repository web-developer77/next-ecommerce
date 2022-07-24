/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ContactUsDtoInputType {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  subject?: string | null;
  message?: string | null;
  id?: number | null;
}

export interface DevFormsInputType {
  formId: number;
  parentForm?: number | null;
  formName?: string | null;
  formUrl?: string | null;
  sortOrder?: any | null;
  isForm?: boolean | null;
  imagePath?: string | null;
  menuLevel?: number | null;
  isDeleted?: boolean | null;
  menuType?: number | null;
  parentFormNavigation?: DevFormsInputType | null;
  mapUserRoleRights?: (MapUserRoleRightsInputType | null)[] | null;
}

export interface MapCompanyAreaInputType {
  companyAreaId: number;
  compPackageId?: number | null;
  countryId?: number | null;
  provinceId?: number | null;
  cityId?: number | null;
  suburbId?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  city?: MstCityInputType | null;
  compPackage?: MapCompanyPackageInputType | null;
  country?: MstCountryInputType | null;
  province?: MstProvinceInputType | null;
  suburb?: MstSuburbInputType | null;
}

export interface MapCompanyAuditLogInputType {
  auditLogId: number;
  companyId?: number | null;
  auditLog?: string | null;
  auditDate?: any | null;
  userId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  company?: MstCompanyInputType | null;
}

export interface MapCompanyCategoryInputType {
  companyCategoryId: number;
  compPackageId?: number | null;
  categoryId?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  compPackage?: MapCompanyPackageInputType | null;
}

export interface MapCompanyDocumentInputType {
  compDocId: number;
  companyId?: number | null;
  documentPath?: string | null;
  documentName?: string | null;
  documentStatusId?: number | null;
  rejectReason?: string | null;
  documentTypeId?: number | null;
  aboutDocument?: string | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  company?: (MstCompanyInputType | null)[] | null;
  documentStatus?: (MstDocumentStatusInputType | null)[] | null;
  documentType?: (MstCompanyDocumentTypeInputType | null)[] | null;
}

export interface MapCompanyEmailInputType {
  compMailId: number;
  compPackageId?: number | null;
  email?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  compPackage?: MapCompanyPackageInputType | null;
}

export interface MapCompanyPackageInputType {
  compPackageId: number;
  companyId?: number | null;
  packageId?: number | null;
  fromDate?: any | null;
  toDate?: any | null;
  timeDelay: number;
  categoryNotExist?: boolean | null;
  addCategory?: boolean | null;
  categoryAllowedCount?: number | null;
  categoryUsedCount?: number | null;
  usersAllowedCount?: number | null;
  usersUsedCount?: number | null;
  emailAllowedCount?: number | null;
  emailUsedCount?: number | null;
  requestAllowedCount?: number | null;
  requestUsedCount?: number | null;
  specialAllowedCount?: number | null;
  specialUsedCount?: number | null;
  catalogueAllowedCount?: number | null;
  catalogueUsedCount?: number | null;
  salesLeadAllowedCount?: number | null;
  salesLeadUsedCount?: number | null;
  keywordAllowedCount?: number | null;
  keywordUsedCount?: number | null;
  followBusinessAllowedCount?: number | null;
  followBusinessUsedCount?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  package?: MstPackageInputType | null;
  mapCompanyArea?: (MapCompanyAreaInputType | null)[] | null;
  mapCompanyCategory?: (MapCompanyCategoryInputType | null)[] | null;
  mapCompanyEmail?: (MapCompanyEmailInputType | null)[] | null;
  mapCompanyPayment?: (MapCompanyPaymentInputType | null)[] | null;
  mapCompanyProvide?: (MapCompanyProvideInputType | null)[] | null;
  mapCompanySeek?: (MapCompanySeekInputType | null)[] | null;
}

export interface MapCompanyPaymentInputType {
  compPaymentId: number;
  compPackageId?: number | null;
  invoiceNumber?: string | null;
  invoiceDate?: any | null;
  paymentDate?: any | null;
  totalAmountUsd?: any | null;
  totalAmount?: any | null;
  paymentModeId?: number | null;
  paymentStatusId?: number | null;
  transactionId?: string | null;
  invoicePath?: string | null;
  payFastToken?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  compPackage?: MapCompanyPackageInputType | null;
  paymentMode?: MstPaymentModeInputType | null;
  paymentStatus?: MstPaymentStatusInputType | null;
}

export interface MapCompanyProvideInputType {
  provideKeywordId: number;
  compPackageId?: number | null;
  keywordId: number;
  periodValue?: number | null;
  periodTypeId?: number | null;
  quantityTypeId?: number | null;
  volumeTypeId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  compPackage?: MapCompanyPackageInputType | null;
  keyword?: MstKeywordsInputType | null;
  periodType?: MstPeriodTypeInputType | null;
  quantityType?: MstQuantityTypeInputType | null;
  volumeType?: MstVolumeTypeInputType | null;
}

export interface MapCompanySeekInputType {
  seekKeywordId: number;
  compPackageId?: number | null;
  keywordId?: number | null;
  periodValue?: number | null;
  periodTypeId?: number | null;
  quantityTypeId?: number | null;
  volumeTypeId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  compPackage?: MapCompanyPackageInputType | null;
  keyword?: MstKeywordsInputType | null;
  periodType?: MstPeriodTypeInputType | null;
  quantityType?: MstQuantityTypeInputType | null;
  volumeType?: MstVolumeTypeInputType | null;
}

export interface MapCompanyTaskInputType {
  compTaskId: number;
  taskId?: number | null;
  companyId?: number | null;
  completed?: boolean | null;
  completionDate?: any | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  company?: MstCompanyInputType | null;
  task?: MstCompanyTaskListInputType | null;
}

export interface MapCustomerEnquiryUploadInputType {
  ceUploadId: number;
  customerEnquiryId?: number | null;
  uploadPath?: string | null;
  thumbNailPath?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  customerEnquiry?: MstCustomerEnquiryInputType | null;
}

export interface MapEflyersUploadInputType {
  eflyerUploadId: number;
  efmid?: number | null;
  filePath?: string | null;
  documentName?: string | null;
  thumbNailImagePath?: string | null;
  documentType?: number | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  efm?: MstUsersInputType | null;
}

export interface MapItemResponseUploadInputType {
  irUploadId?: number | null;
  itemResponseId?: number | null;
  documentName?: string | null;
  uploadPath?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  itemResponse?: (MstItemResponseInputType | null)[] | null;
}

export interface MapPackageAttributesInputType {
  packageDetailId: number;
  packageId?: number | null;
  pattributeId?: number | null;
  value?: string | null;
  amount?: any | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  package?: MstPackageInputType | null;
  pattribute?: MstPackageAttributeInputType | null;
}

export interface MapProductDocumentInputType {
  documentId: number;
  productId?: number | null;
  documentName?: string | null;
  documentPath?: string | null;
  active?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
}

export interface MapProductImagesInputType {
  imageId: number;
  productId?: number | null;
  imageName?: string | null;
  imagePath?: string | null;
  active?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  product?: PrdProductsInputType | null;
}

export interface MapSettingsRoleInputType {
  srid: number;
  roleId?: number | null;
  settingId?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  role?: MstUsersInputType | null;
  setting?: MstUsersInputType | null;
}

export interface MapSpecialUploadInputType {
  specialUploadId: number;
  specialId?: number | null;
  uploadPath?: string | null;
  thumbNailPath?: string | null;
  label?: string | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  special?: MstSpecialsInputType | null;
}

export interface MapUserRoleRightsInputType {
  rightsId: number;
  roleId?: number | null;
  formId?: number | null;
  addRights?: boolean | null;
  modifyRights?: boolean | null;
  deleteRights?: boolean | null;
  viewRights?: boolean | null;
  form?: DevFormsInputType | null;
  role?: MstUserRoleInputType | null;
}

export interface MstBeestatusInputType {
  beestatusId: number;
  beestatusName?: string | null;
  scorePoint?: string | null;
  procurementRecognition?: any | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  beestatus?: MstBeestatusInputType | null;
  mstCompany?: (MstCompanyInputType | null)[] | null;
}

export interface MstCategoryInputType {
  categoryId: number;
  parentCategoryId?: number | null;
  isMainCategory?: boolean | null;
  isCategory?: boolean | null;
  categoryName?: string | null;
  categoryIcon?: string | null;
  categoryThumbNailIcon?: string | null;
  timeDelayException?: boolean | null;
  isMenuAllowed?: boolean | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
}

export interface MstCityInputType {
  cityId: number;
  provinceId?: number | null;
  cityName?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  province?: MstProvinceInputType | null;
  mapCompanyArea?: (MapCompanyAreaInputType | null)[] | null;
  mstSpecials?: (MstSpecialsInputType | null)[] | null;
  mstSuburb?: (MstSuburbInputType | null)[] | null;
  mstUsers?: (MstUsersInputType | null)[] | null;
}

export interface MstCompanyDocumentTypeInputType {
  documentTypeId: number;
  documentType?: string | null;
  active?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyDocument?: (MapCompanyDocumentInputType | null)[] | null;
}

export interface MstCompanyInputType {
  companyId: number;
  companyName?: string | null;
  logoPath?: string | null;
  description?: string | null;
  serviceTax?: any | null;
  vatnumber?: string | null;
  phone?: string | null;
  webSite?: string | null;
  email?: string | null;
  helpDeskNumber?: string | null;
  companyStatusId?: number | null;
  beestatusId?: number | null;
  directorsCount?: number | null;
  companyPercent?: any | null;
  payFastMerchantId?: string | null;
  payFastMerchantKey?: string | null;
  franchiseeId?: number | null;
  domainUrl?: string | null;
  mainBusinessUserId?: number | null;
  crmcolorCode?: string | null;
  crmQuoteHeader?: string | null;
  crmQuoteFooter?: string | null;
  crmInvoiceHeader?: string | null;
  crmInvoiceFooter?: string | null;
  featured?: boolean | null;
  payGateMerchantId?: string | null;
  payGateMerchantKey?: string | null;
  payPalMerchantId?: string | null;
  payPalMerchantKey?: string | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  beestatus?: MstBeestatusInputType | null;
  companyStatus?: MstCompanyStatusInputType | null;
  mapCompanyAuditLog?: (MapCompanyAuditLogInputType | null)[] | null;
  mapCompanyDocument?: (MapCompanyDocumentInputType | null)[] | null;
  mapCompanyTask?: (MapCompanyTaskInputType | null)[] | null;
  mstCrmInventory?: (MstCrmInventoryInputType | null)[] | null;
  mstCrmInvoice?: (MstCrmInvoiceInputType | null)[] | null;
  mstCrmQuote?: (MstCrmQuoteInputType | null)[] | null;
  mstCustomerEnquiry?: (MstCustomerEnquiryInputType | null)[] | null;
  mstCustomerEnquiryResponse?: (MstCustomerEnquiryResponseInputType | null)[] | null;
  mstItemResponse?: (MstItemResponseInputType | null)[] | null;
  mstRating?: (MstRatingInputType | null)[] | null;
}

export interface MstCompanyStatusInputType {
  companyStatusId: number;
  statusName?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mstCompany?: MstCompanyInputType | null;
}

export interface MstCompanyTaskListInputType {
  taskId: number;
  taskName?: string | null;
  taskDescription?: string | null;
  percentage?: any | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyTask?: (MapCompanyTaskInputType | null)[] | null;
}

export interface MstCountryInputType {
  countryId: number;
  countryName?: string | null;
  isActive?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mstProvinces?: (MstProvinceInputType | null)[] | null;
  mapCompanyAreas?: (MapCompanyAreaInputType | null)[] | null;
  mstFranchises?: (MstFranchiseeInputType | null)[] | null;
  mstSpecials?: (MstSpecialsInputType | null)[] | null;
  mstUsers?: (MstUsersInputType | null)[] | null;
}

export interface MstCrmCustomerCommentInputType {
  customerCommentId: number;
  customerId?: number | null;
  comment?: string | null;
  commentDate?: any | null;
  userId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  customer?: MstCrmCustomerInputType | null;
  user?: MstUsersInputType | null;
}

export interface MstCrmCustomerInputType {
  customerId: number;
  userId?: number | null;
  companyId?: number | null;
  companyName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  gender?: number | null;
  streetAddress?: string | null;
  countryId?: number | null;
  provinceId?: number | null;
  cityId?: number | null;
  suburbId?: number | null;
  zipCode?: string | null;
  contactNo?: string | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mstCrmCustomerComment?: (MstCrmCustomerCommentInputType | null)[] | null;
  mstCrmInvoice?: (MstCrmInvoiceInputType | null)[] | null;
  mstCrmQuote?: (MstCrmQuoteInputType | null)[] | null;
}

export interface MstCrmInventoryInputType {
  inventoryId: number;
  companyId?: number | null;
  inventoryTypeId?: number | null;
  inventoryName?: string | null;
  inventoryDescription?: string | null;
  officeDescription?: string | null;
  qunatityTypeName?: string | null;
  quantity?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  company?: MstCompanyInputType | null;
  inventoryType?: MstCrmInventoryTypeInputType | null;
  mstCrmInvoiceDetails?: (MstCrmInvoiceDetailsInputType | null)[] | null;
  mstCrmQuoteDetails?: (MstCrmQuoteDetailsInputType | null)[] | null;
}

export interface MstCrmInventoryTypeInputType {
  inventoryTypeId: number;
  inventoryTypeName?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mstCrmInventory?: (MstCrmInventoryInputType | null)[] | null;
}

export interface MstCrmInvoiceDetailsInputType {
  invoiceLineItemId: number;
  invoiceId?: number | null;
  inventoryId?: number | null;
  quantity?: number | null;
  price?: any | null;
  totalAmount?: any | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  inventory?: (MstCrmInventoryInputType | null)[] | null;
  invoice?: (MstCrmInvoiceInputType | null)[] | null;
}

export interface MstCrmInvoiceInputType {
  invoiceId: number;
  invoiceNo?: string | null;
  invoiceDescription?: string | null;
  invoiceFooter?: string | null;
  companyId?: number | null;
  invoiceDate?: any | null;
  customerId?: number | null;
  quoteId?: number | null;
  amount?: any | null;
  vatamount?: any | null;
  totalAmount?: any | null;
  paymentDate?: any | null;
  paymentModeId?: number | null;
  paymentStatusId?: number | null;
  transactionId?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  company?: MstCompanyInputType | null;
  customer?: MstCrmCustomerInputType | null;
  mstCrmInvoiceDetails?: (MstCrmInvoiceDetailsInputType | null)[] | null;
}

export interface MstCrmQuoteDetailsInputType {
  quoteLineItemId: number;
  quoteId?: number | null;
  inventoryId?: number | null;
  quantity?: number | null;
  price?: any | null;
  totalAmount?: any | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  inventory?: MstCrmInventoryInputType | null;
  quote?: MstCrmQuoteInputType | null;
}

export interface MstCrmQuoteInputType {
  quoteId: number;
  quoteNo?: string | null;
  quoteDescription?: string | null;
  quoteFooter?: string | null;
  companyId?: number | null;
  quoteDate?: any | null;
  customerId?: number | null;
  amount?: any | null;
  vatamount?: any | null;
  totalAmount?: any | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  company?: MstCompanyInputType | null;
  customer?: MstCrmCustomerInputType | null;
  mstCrmQuoteDetails?: (MstCrmQuoteDetailsInputType | null)[] | null;
}

export interface MstCustomerEnquiryInputType {
  customerEnquiryId?: number | null;
  userId?: number | null;
  enquiryTitle?: string | null;
  enquiryDescription?: string | null;
  enquiryDate?: any | null;
  enquiryStatusId?: number | null;
  companyId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCustomerEnquiryUpload?: (MapCustomerEnquiryUploadInputType | null)[] | null;
  mstCustomerEnquiryResponse?: (MstCustomerEnquiryResponseInputType | null)[] | null;
}

export interface MstCustomerEnquiryResponseInputType {
  ceresponseId: number;
  customerEnquiryId?: number | null;
  userId?: number | null;
  companyId?: number | null;
  comment?: string | null;
  responseDate?: any | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  company?: MstCompanyInputType | null;
  customerEnquiry?: MstCustomerEnquiryInputType | null;
  user?: MstUsersInputType | null;
}

export interface MstDocumentStatusInputType {
  documentStatusId: number;
  documentStatus?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyDocument?: (MapCompanyDocumentInputType | null)[] | null;
}

export interface MstDomainInputType {
  domainId: number;
  domainName?: string | null;
  active?: boolean | null;
  prdCategory?: (PrdCategoryInputType | null)[] | null;
  prdProducts?: (PrdProductsInputType | null)[] | null;
}

export interface MstEFlyersInputType {
  efmid: number;
  companyId?: number | null;
  title?: string | null;
  description?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  statusId?: number | null;
  isMenu?: boolean | null;
  categoryId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  category?: MstCategoryInputType | null;
  company?: MstCompanyInputType | null;
  status?: MstStatusInputType | null;
  mapEflyersUpload?: (MapEflyersUploadInputType | null)[] | null;
}

export interface MstFavouritesInputType {
  mstFavouriteId: number;
  companyId?: number | null;
  productId?: number | null;
  specialId?: number | null;
  eflyerId?: number | null;
  userId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
}

export interface MstFranchiseeInputType {
  franchiseId: number;
  franchiseName?: string | null;
  streetAddress?: string | null;
  countryId?: number | null;
  provinceId?: number | null;
  cityId?: number | null;
  suburbId?: number | null;
  zipCode?: string | null;
  phone?: string | null;
  emailId?: string | null;
  franchiseUserId?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  country?: MstCountryInputType | null;
  franchiseUser?: MstUsersInputType | null;
}

export interface MstItemRequestInputType {
  itemRequestId?: number | null;
  userId?: number | null;
  itemRequestTitle?: string | null;
  itemRequestDescription?: string | null;
  itemRequestDate?: any | null;
  itemRequestStatusId?: number | null;
  selectedCompany?: number | null;
  categoryId?: number | null;
  provinceId?: number | null;
  cityId?: number | null;
  suburbId?: number | null;
  requestApprovedMail?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
}

export interface MstItemResponseInputType {
  itemResponseId: number;
  itemRequestId?: number | null;
  userId?: number | null;
  companyId?: number | null;
  comment?: string | null;
  responseDate?: any | null;
  replyToId?: number | null;
  isAccepted?: boolean | null;
  isRejected?: boolean | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  replyTo?: MstItemResponseInputType | null;
  mapItemResponseUpload?: (MapItemResponseUploadInputType | null)[] | null;
}

export interface MstKeywordsInputType {
  keywordId: number;
  categoryId?: number | null;
  keyword?: string | null;
  statusId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  category?: MstCategoryInputType | null;
  status?: MstStatusInputType | null;
  mapCompanyProvide?: (MapCompanyProvideInputType | null)[] | null;
  mapCompanySeek?: (MapCompanySeekInputType | null)[] | null;
}

export interface MstPackageAttributeInputType {
  pattributeId: number;
  attributeName?: string | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapPackageAttributes?: (MapPackageAttributesInputType | null)[] | null;
}

export interface MstPackageInputType {
  packageId: number;
  packageName?: string | null;
  amount?: any | null;
  isRecommended?: boolean | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyPackage?: (MapCompanyPackageInputType | null)[] | null;
  mapPackageAttributes?: (MapPackageAttributesInputType | null)[] | null;
  mstPackageAttribute?: (MstPackageAttributeInputType | null)[] | null;
}

export interface MstPaymentModeInputType {
  paymentModeId: number;
  merchantKey?: string | null;
  paymentMode?: string | null;
  merchantID?: string | null;
  returnUrl?: string | null;
  notifyUrl?: string | null;
  cancelUrl?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyPayment?: (MapCompanyPaymentInputType | null)[] | null;
  mstProvinces?: (MstProvinceInputType | null)[] | null;
}

export interface MstPaymentStatusInputType {
  paymentStatusId: number;
  paymentStatus?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyPayment?: (MapCompanyPaymentInputType | null)[] | null;
}

export interface MstPeriodTypeInputType {
  periodTypeId: number;
  periodType?: string | null;
  active?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  parentFormNavigation?: DevFormsInputType | null;
  mapCompanyProvide?: (MapCompanyProvideInputType | null)[] | null;
  mapCompanySeek?: (MapCompanySeekInputType | null)[] | null;
}

export interface MstProvinceInputType {
  provinceId?: string | null;
  countryId?: number | null;
  provinceName?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  country?: MstCountryInputType | null;
  mstCity?: (MapCompanyAreaInputType | null)[] | null;
  mstSpecials?: (MstCityInputType | null)[] | null;
  mapCompanyArea?: (MstSpecialsInputType | null)[] | null;
  mstUsers?: (MstUsersInputType | null)[] | null;
}

export interface MstQuantityTypeInputType {
  quantityTypeId: number;
  quantityType?: string | null;
  active?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyProvide?: (MapCompanyProvideInputType | null)[] | null;
  mapCompanySeek?: (MapCompanySeekInputType | null)[] | null;
}

export interface MstRatingInputType {
  mstRatingId?: number | null;
  companyId?: number | null;
  specialId?: number | null;
  eflyerId?: number | null;
  userId?: number | null;
  name?: string | null;
  contactNo?: string | null;
  emaiId?: string | null;
  review?: string | null;
  ratingScore?: number | null;
  statusId?: number | null;
  productId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  company?: MstCompanyInputType | null;
  special?: MstSpecialsInputType | null;
  status?: MstStatusInputType | null;
  user?: MstUsersInputType | null;
}

export interface MstSpecialsInputType {
  specialId: number;
  companyId?: number | null;
  specialName?: string | null;
  description?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  amount?: any | null;
  statusId?: number | null;
  streetAddress?: string | null;
  categoryId?: number | null;
  countryId?: number | null;
  provinceId?: number | null;
  cityId?: number | null;
  suburbId?: number | null;
  zipCode?: string | null;
  phone?: string | null;
  longitude?: string | null;
  latitude?: string | null;
  imagePath?: string | null;
  featured?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  category?: MstCategoryInputType | null;
  city?: MstCityInputType | null;
  company?: MstCompanyInputType | null;
  country?: MstCountryInputType | null;
  province?: MstProvinceInputType | null;
  status?: MstStatusInputType | null;
  statusNavigation?: MstSuburbInputType | null;
  mapSpecialUpload?: (MapSpecialUploadInputType | null)[] | null;
  mstFavourites?: (MstFavouritesInputType | null)[] | null;
  mstRating?: (MstRatingInputType | null)[] | null;
}

export interface MstStatusInputType {
  statusId: number;
  statusName?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mstCustomerEnquiry?: (MstCustomerEnquiryInputType | null)[] | null;
  mstRating?: (MstRatingInputType | null)[] | null;
  mstSpecials?: (MstSpecialsInputType | null)[] | null;
  mstEFlyers?: (MstEFlyersInputType | null)[] | null;
  mstKeywords?: (MstKeywordsInputType | null)[] | null;
}

export interface MstSuburbInputType {
  suburbId: number;
  cityId?: number | null;
  suburbName?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  city?: MstCityInputType | null;
  mapCompanyArea?: (MapCompanyAreaInputType | null)[] | null;
  mstSpecials?: (MstSpecialsInputType | null)[] | null;
  mstUsers?: (MstUsersInputType | null)[] | null;
}

export interface MstUserDtoInputType {
  userID?: number | null;
  email?: string | null;
  contactNo?: string | null;
  userName?: string | null;
  facebookUserID?: string | null;
  googleUserID?: string | null;
  linkedInUserID?: string | null;
  forgetPasswordCode?: string | null;
  rId?: string | null;
  staId?: string | null;
  name?: string | null;
  password?: string | null;
  track?: number | null;
  compPackageID?: number | null;
  categoryID?: number | null;
  roleId?: number | null;
  roleName?: string | null;
  statusId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  dateofBirth?: any | null;
  gender?: number | null;
  vGender?: string | null;
  streetAddress?: string | null;
  countryId?: number | null;
  countryName?: string | null;
  provinceID?: number | null;
  provinceName?: string | null;
  cityID?: number | null;
  cityName?: string | null;
  suburbID?: number | null;
  suburbName?: string | null;
  zipCode?: string | null;
  longitude?: string | null;
  latitude?: string | null;
  statusName?: string | null;
  lastLogin?: any | null;
  companyId?: number | null;
  companyName?: string | null;
  compPercent?: any | null;
  packageID?: number | null;
  getRequests?: boolean | null;
  isLoggedIn?: boolean | null;
  isMobileLoggedIn?: boolean | null;
  userProfileImage?: string | null;
  userProfileThumbNailImage?: string | null;
  failedLoginCount?: number | null;
  postOnFB?: boolean | null;
  fBAccessCode?: string | null;
  postOnGP?: boolean | null;
  twitterUserId?: string | null;
  postOnTwitter?: boolean | null;
  instagramUserID?: string | null;
  postOnInstagram?: boolean | null;
  emailNotification?: boolean | null;
  sMSNotification?: boolean | null;
  joinDate?: any | null;
  postOnLI?: boolean | null;
  franchiseID?: number | null;
  deviceType?: number | null;
  deviceID?: string | null;
  token?: string | null;
  tokenExpired?: string | null;
  mobileActivationCode?: string | null;
  emailActivationCode?: string | null;
  domainUrl?: string | null;
  paymentUrl?: string | null;
  discount?: number | null;
}

export interface MstUserRoleInputType {
  roleId: number;
  deletedBy?: number | null;
  roleName?: string | null;
  deletedDate?: any | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapSettingsRole?: (MapSettingsRoleInputType | null)[] | null;
  mapUserRoleRights?: (MapUserRoleRightsInputType | null)[] | null;
  mstUsers?: (MstUsersInputType | null)[] | null;
}

export interface MstUsersInputType {
  userId: number;
  roleId?: number | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  userName?: string | null;
  dateofBirth?: any | null;
  gender?: number | null;
  streetAddress?: string | null;
  countryId?: number | null;
  provinceId?: number | null;
  cityId?: number | null;
  suburbId?: number | null;
  zipCode?: string | null;
  longitude?: string | null;
  latitude?: string | null;
  contactNo?: string | null;
  password?: string | null;
  statusId?: number | null;
  lastLogin?: any | null;
  companyId?: number | null;
  emailActivationCode?: string | null;
  mobileActivationCode?: string | null;
  forgetPasswordCode?: string | null;
  isLoggedIn?: boolean | null;
  isMobileLoggedIn?: boolean | null;
  userProfileImage?: string | null;
  userProfileThumbNailImage?: string | null;
  failedLoginCount?: number | null;
  logInCode?: string | null;
  adminPin?: number | null;
  franchiseId?: number | null;
  deviceType?: string | null;
  deviceId?: string | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mstCrmCustomerComment?: (MstCrmCustomerCommentInputType | null)[] | null;
  mstCustomerEnquiry?: (MstCustomerEnquiryInputType | null)[] | null;
  mstCustomerEnquiryResponse?: (MstCustomerEnquiryResponseInputType | null)[] | null;
  mstFranchisee?: (MstFranchiseeInputType | null)[] | null;
  mstItemResponse?: (MstItemResponseInputType | null)[] | null;
  mstRating?: (MstRatingInputType | null)[] | null;
  prdOrders?: (PrdOrdersInputType | null)[] | null;
}

export interface MstVolumeTypeInputType {
  volumeTypeId: number;
  active?: boolean | null;
  volumeType?: string | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mapCompanyProvide?: (MapCompanyProvideInputType | null)[] | null;
  mapCompanySeek?: (MapCompanySeekInputType | null)[] | null;
}

export interface PostReplyAttachmentInputType {
  postReplyAttachmentId: number;
  postReplyId?: number | null;
  filePath?: string | null;
  documentName?: string | null;
  thumbNailImagePath?: string | null;
  documentType?: number | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  postReply?: (PostReplyInputType | null)[] | null;
}

export interface PostReplyInputType {
  postReplyId?: number | null;
  userId?: number | null;
  title?: string | null;
  description?: string | null;
  status?: number | null;
  titleCategoryId?: number | null;
  postId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  postReplyAttachments?: (PostReplyAttachmentInputType | null)[] | null;
}

export interface PrdBidInputType {
  bidId: number;
  userId?: number | null;
  productId?: number | null;
  bidAmount?: any | null;
  bidApprovedMail?: boolean | null;
  isAccepted?: boolean | null;
  isActive?: boolean | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  mstProvinces?: (PrdProductsInputType | null)[] | null;
}

export interface PrdCategoryInputType {
  categoryId: number;
  categoryName?: string | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  category?: PrdCategoryInputType | null;
  domain?: MstDomainInputType | null;
  prdProducts?: (PrdProductsInputType | null)[] | null;
  prdSubCategory?: (PrdSubCategoryInputType | null)[] | null;
}

export interface PrdHireInputType {
  hireId: number;
  userId?: number | null;
  productId?: number | null;
  returned?: boolean | null;
  returnedDate?: any | null;
  isAccepted?: boolean | null;
  businessConfirmedReturned?: boolean | null;
  businessConfirmedReturnedDate?: any | null;
  clientConfirmedReturned?: number | null;
  clientConfirmedReturnedDate?: any | null;
  fromDate?: any | null;
  toDate?: any | null;
  mstProvinces?: (PrdProductsInputType | null)[] | null;
}

export interface PrdOrderDetailsInputType {
  orderDetailsId: number;
  orderId?: number | null;
  productId?: number | null;
  productPrice?: any | null;
  orderQuantity?: number | null;
  orderAmount?: any | null;
  downloadCount?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  order?: PrdOrdersInputType | null;
}

export interface PrdOrderStatusInputType {
  orderStatusId: number;
  orderId?: number | null;
  orderStatusTypeId?: number | null;
  orderStatusDate?: any | null;
  isCurrentStatus?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  order?: PrdOrdersInputType | null;
}

export interface PrdOrdersInputType {
  orderId: number;
  userId?: number | null;
  orderIdstring?: string | null;
  orderSessionId?: string | null;
  orderDate?: any | null;
  orderIpaddress?: string | null;
  orderAmount?: any | null;
  orderTotal?: any | null;
  transactionId?: string | null;
  orderStatusId?: number | null;
  paymentDate?: any | null;
  expiredDate?: any | null;
  productId?: number | null;
  downloadCount?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  user?: MstUsersInputType | null;
  prdOrderDetails?: (PrdOrderDetailsInputType | null)[] | null;
  prdOrderStatus?: (PrdOrderStatusInputType | null)[] | null;
}

export interface PrdProductsInputType {
  productId: number;
  categoryId?: number | null;
  productNumber?: string | null;
  productName?: string | null;
  productImage?: string | null;
  unitCost?: any | null;
  documentName?: string | null;
  documentPath?: string | null;
  domainId?: number | null;
  subCategoryId?: number | null;
  isActive?: boolean | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  category?: PrdCategoryInputType | null;
  domain?: MstDomainInputType | null;
  mapProductDocument?: (MapProductDocumentInputType | null)[] | null;
  mapProductImages?: (MapProductImagesInputType | null)[] | null;
  prdBid?: (PrdBidInputType | null)[] | null;
  prdShoppingCart?: (PrdShoppingCartInputType | null)[] | null;
}

export interface PrdShoppingCartInputType {
  recordId?: number | null;
  userId?: number | null;
  sessionId?: string | null;
  quantity?: number | null;
  productId?: number | null;
  dateCreated?: any | null;
  fromDate?: any | null;
  endDate?: any | null;
}

export interface PrdSubCategoryInputType {
  subCategoryId: number;
  categoryId?: number | null;
  subCategoryName?: string | null;
  active?: boolean | null;
  domainId?: number | null;
  createdBy?: number | null;
  createdDate?: any | null;
  modifiedBy?: number | null;
  modifiedDate?: any | null;
  category?: PrdCategoryInputType | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
