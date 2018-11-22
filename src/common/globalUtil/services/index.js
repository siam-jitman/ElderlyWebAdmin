/*-- Url Call Server --*/

var PORT = window.location.port == '' ? '' : ':' + window.location.port;
var BASE_URL = window.location.hostname == "localhost" || "127.0.0.1" ? window.location.protocol + '//' + window.location.hostname + ":3000" : window.location.protocol + '//' + window.location.hostname + '' + PORT;
// var URI_SYS = BASE_URL + '/botManager/apis/';
var URI_SERVICE = BASE_URL + '/service/';
var URI_IMAGE = BASE_URL + '/public/image/';
var URI_SYSTEM = URI_SERVICE + 'system/';

// URI Authen
var URL_AUTH = URI_SYSTEM + 'auth/';

// URI Authen
var URL_CENTENT = URI_SERVICE + "content/";

// Login page
var URL_LOGIN = URL_AUTH + 'login';
var URL_LOGOUT = URL_AUTH + 'logout';

//Content page
var URL_FIND_CONTENT_BI_ID_MEMBER = URL_CENTENT + "findContentByIdMember";
var URL_UPLOAD_IMAGE_DETAIL = URL_CENTENT + "uploadImageDetail";
var URL_ADD_CONTENT_BY_ID_MEMBER = URL_CENTENT + "addContentByIdMember";
var URL_UPLOAD_EBOOK_CONTENT = URL_CENTENT + "uploadEBookContent";


export default {
  BASE_URL: BASE_URL,
  URI_IMAGE: URI_IMAGE,
  URL_LOGIN: URL_LOGIN,
  URL_LOGOUT: URL_LOGOUT,
  CONTENT: {
    URL_FIND_CONTENT_BI_ID_MEMBER: URL_FIND_CONTENT_BI_ID_MEMBER,
    URL_UPLOAD_IMAGE_DETAIL: URL_UPLOAD_IMAGE_DETAIL,
    URL_ADD_CONTENT_BY_ID_MEMBER: URL_ADD_CONTENT_BY_ID_MEMBER,
    URL_UPLOAD_EBOOK_CONTENT : URL_UPLOAD_EBOOK_CONTENT
  }
}
