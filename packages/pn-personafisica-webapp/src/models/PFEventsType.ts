export enum PFEventsType {
  SEND_VIEW_PROFILE = 'SEND_VIEW_PROFILE',
  SEND_PROFILE = 'SEND_PROFILE',
  SEND_VIEW_CONTACT_DETAILS = 'SEND_VIEW_CONTACT_DETAILS',
  SEND_NOTIFICATION_DETAIL = 'SEND_NOTIFICATION_DETAIL',
  SEND_YOUR_NOTIFICATIONS = 'SEND_YOUR_NOTIFICATIONS',
  SEND_NOTIFICATION_DELEGATED = 'SEND_NOTIFICATION_DELEGATED',
  SEND_DOWNLOAD_ATTACHMENT = 'SEND_DOWNLOAD_ATTACHMENT',
  SEND_DOWNLOAD_RECEIPT_NOTICE = 'SEND_DOWNLOAD_RECEIPT_NOTICE',
  SEND_DOWNLOAD_CERTIFICATE_OPPOSABLE_TO_THIRD_PARTIES = 'SEND_DOWNLOAD_CERTIFICATE_OPPOSABLE_TO_THIRD_PARTIES',
  SEND_START_PAYMENT = 'SEND_START_PAYMENT',
  SEND_PAYMENT_DETAIL_REFRESH = 'SEND_PAYMENT_DETAIL_REFRESH',
  SEND_NOTIFICATION_STATUS_DETAIL = 'SEND_NOTIFICATION_STATUS_DETAIL',
  SEND_YOUR_MANDATES = 'SEND_YOUR_MANDATES',
  SEND_ADD_MANDATE_START = 'SEND_ADD_MANDATE_START',
  SEND_ADD_MANDATE_BACK = 'SEND_ADD_MANDATE_BACK',
  SEND_ADD_MANDATE_DATA_INPUT = 'SEND_ADD_MANDATE_DATA_INPUT',
  SEND_ADD_MANDATE_UX_CONVERSION = 'SEND_ADD_MANDATE_UX_CONVERSION',
  SEND_ADD_MANDATE_UX_SUCCESS = 'SEND_ADD_MANDATE_UX_SUCCESS',
  SEND_SHOW_MANDATE_CODE = 'SEND_SHOW_MANDATE_CODE',
  SEND_MANDATE_REVOKED = 'SEND_MANDATE_REVOKED',
  SEND_MANDATE_REJECTED = 'SEND_MANDATE_REJECTED',
  SEND_MANDATE_ACCEPTED = 'SEND_MANDATE_ACCEPTED',
  SEND_MANDATE_ACCEPT_CODE_ERROR = 'SEND_MANDATE_ACCEPT_CODE_ERROR',
  SEND_YOUR_CONTACT_DETAILS = 'SEND_YOUR_CONTACT_DETAILS',
  SEND_ADD_PEC_START = 'SEND_ADD_PEC_START',
  SEND_ADD_SMS_START = 'SEND_ADD_SMS_START',
  SEND_ADD_EMAIL_START = 'SEND_ADD_EMAIL_START',
  SEND_ADD_PEC_UX_CONVERSION = 'SEND_ADD_PEC_UX_CONVERSION',
  SEND_ADD_PEC_CODE_ERROR = 'SEND_ADD_PEC_CODE_ERROR',
  SEND_ADD_PEC_UX_SUCCESS = 'SEND_ADD_PEC_UX_SUCCESS',
  SEND_ACTIVE_IO_START = 'SEND_ACTIVE_IO_START',
  SEND_DEACTIVE_IO_START = 'SEND_DEACTIVE_IO_START',
  SEND_ACTIVE_IO_UX_CONVERSION = 'SEND_ACTIVE_IO_UX_CONVERSION',
  SEND_ACTIVE_IO_UX_SUCCESS = 'SEND_ACTIVE_IO_UX_SUCCESS',
  SEND_DEACTIVE_IO_UX_CONVERSION = 'SEND_DEACTIVE_IO_UX_CONVERSION',
  SEND_DEACTIVE_IO_UX_SUCCESS = 'SEND_DEACTIVE_IO_UX_SUCCESS',
  SEND_ADD_SMS_UX_CONVERSION = 'SEND_ADD_SMS_UX_CONVERSION',
  SEND_ADD_SMS_CODE_ERROR = 'SEND_ADD_SMS_CODE_ERROR',
  SEND_ADD_SMS_UX_SUCCESS = 'SEND_ADD_SMS_UX_SUCCESS',
  SEND_ADD_EMAIL_UX_SUCCESS = 'SEND_ADD_EMAIL_UX_SUCCESS',
  SEND_ADD_EMAIL_UX_CONVERSION = 'SEND_ADD_EMAIL_UX_CONVERSION',
  SEND_ADD_EMAIL_CODE_ERROR = 'SEND_ADD_EMAIL_CODE_ERROR',
  SEND_SERVICE_STATUS = 'SEND_SERVICE_STATUS',
  SEND_REFRESH_PAGE = 'SEND_REFRESH_PAGE',
  SEND_TOAST_ERROR = 'SEND_TOAST_ERROR',
  SEND_GENERIC_ERROR = 'SEND_GENERIC_ERROR',
  SEND_PAYMENT_OUTCOME = 'SEND_PAYMENT_OUTCOME',
  SEND_NOTIFICATION_NOT_ALLOWED = 'SEND_NOTIFICATION_NOT_ALLOWED',
  SEND_RAPID_ACCESS = 'SEND_RAPID_ACCESS',
  SEND_REMOVE_PEC_SUCCESS = 'SEND_REMOVE_PEC_SUCCESS',
  SEND_REMOVE_SMS_SUCCESS = 'SEND_REMOVE_SMS_SUCCESS',
  SEND_REMOVE_EMAIL_SUCCESS = 'SEND_REMOVE_EMAIL_SUCCESS',
  SEND_AUTH_SUCCESS = 'SEND_AUTH_SUCCESS',
  SEND_DOWNLOAD_RESPONSE = 'SEND_DOWNLOAD_RESPONSE',
  SEND_PAYMENT_STATUS = 'SEND_PAYMENT_STATUS',
  SEND_PAYMENT_DETAIL_ERROR = 'SEND_PAYMENT_DETAIL_ERROR',
  SEND_CANCELLED_NOTIFICATION_REFOUND_INFO = 'SEND_CANCELLED_NOTIFICATION_REFOUND_INFO',
  SEND_MULTIPAYMENT_MORE_INFO = 'SEND_MULTIPAYMENT_MORE_INFO',
  SEND_PAYMENT_LIST_CHANGE_PAGE = 'SEND_PAYMENT_LIST_CHANGE_PAGE',
  SEND_F24_DOWNLOAD = 'SEND_F24_DOWNLOAD',
  SEND_F24_DOWNLOAD_SUCCESS = 'SEND_F24_DOWNLOAD_SUCCESS',
  SEND_DOWNLOAD_PAYMENT_NOTICE = 'SEND_DOWNLOAD_PAYMENT_NOTICE',
  SEND_F24_DOWNLOAD_TIMEOUT = 'SEND_F24_DOWNLOAD_TIMEOUT',

  // --- PROFILE_PROPERTY
  SEND_PAYMENTS_COUNT = 'SEND_PAYMENTS_COUNT',
  SEND_NOTIFICATIONS_COUNT = 'SEND_NOTIFICATIONS_COUNT',
  SEND_HAS_MANDATE = 'SEND_HAS_MANDATE',
  SEND_MANDATE_GIVEN = 'SEND_MANDATE_GIVEN',
  SEND_HAS_ADDRESSES = 'SEND_HAS_ADDRESSES',
  SEND_HAS_MANDATE_LOGIN = 'SEND_HAS_MANDATE_LOGIN',
  SEND_ENABLE_IO = 'SEND_ENABLE_IO',
  SEND_DISABLE_IO = 'SEND_DISABLE_IO',
  SEND_ACCEPT_DELEGATION = 'SEND_ACCEPT_DELEGATION',
  SEND_ADD_LEGAL_ADDRESS = 'SEND_ADD_LEGAL_ADDRESS',
  SEND_REMOVE_LEGAL_ADDRESS = 'SEND_REMOVE_LEGAL_ADDRESS',
  SEND_REMOVE_COURTESY_ADDRESS = 'SEND_REMOVE_COURTESY_ADDRESS',
  SEND_ADD_COURTESY_ADDRESS = 'SEND_ADD_COURTESY_ADDRESS',
}

export const eventsActionsMap: Record<string, PFEventsType> = {
  'getReceivedNotificationOtherDocument/fulfilled': PFEventsType.SEND_DOWNLOAD_RESPONSE,
  'getReceivedNotificationLegalfact/fulfilled': PFEventsType.SEND_DOWNLOAD_RESPONSE,
  'exchangeToken/fulfilled': PFEventsType.SEND_AUTH_SUCCESS,

  // --- PROFILE_PROPERTY
  'getDomicileInfo/fulfilled': PFEventsType.SEND_HAS_ADDRESSES,
  'getSidemenuInformation/fulfilled': PFEventsType.SEND_HAS_MANDATE_LOGIN,
  'getDelegates/fulfilled': PFEventsType.SEND_MANDATE_GIVEN,
  'enableIOAddress/fulfilled': PFEventsType.SEND_ENABLE_IO,
  'disableIOAddress/fulfilled': PFEventsType.SEND_DISABLE_IO,
  'acceptDelegation/fulfilled': PFEventsType.SEND_ACCEPT_DELEGATION,
  'createOrUpdateLegalAddress/fulfilled': PFEventsType.SEND_ADD_LEGAL_ADDRESS,
  'deleteLegalAddress/fulfilled': PFEventsType.SEND_REMOVE_LEGAL_ADDRESS,
  'deleteCourtesyAddress/fulfilled': PFEventsType.SEND_REMOVE_COURTESY_ADDRESS,
  'createOrUpdateCourtesyAddress/fulfilled': PFEventsType.SEND_ADD_COURTESY_ADDRESS,
};
