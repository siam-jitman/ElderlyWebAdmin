/*-- Url Call Server --*/

var PORT = window.location.port == '' ? '' : ':' + window.location.port;
var BASE_URL = window.location.hostname == "localhost" || "127.0.0.1" ? window.location.protocol + '//' + window.location.hostname + ":3000" : window.location.protocol + '//' + window.location.hostname + '' + PORT;
// var URI_SYS = BASE_URL + '/botManager/apis/';
var URI_SERVICE = BASE_URL + '/service/';
var URI_IMAGE = BASE_URL + '/public/image/';
var URI_EBOOK = BASE_URL + '/public/ebook/';
var URI_VIDEO = BASE_URL + '/public/video/';
var URI_SYSTEM = URI_SERVICE + 'system/';

// URI Authen
var URL_AUTH = URI_SYSTEM + 'auth/';

// URI Authen
var URL_CENTENT = URI_SERVICE + "content/";
var URL_MEMBER = URI_SERVICE + "member/";

// Login page
var URL_LOGIN = URL_AUTH + 'login';
var URL_LOGOUT = URL_AUTH + 'logout';

//Regis Member
var URL_REGISTER_MEMBER = URL_AUTH + "register";
var URL_UPLOAD_IMAGE_PROFILE = URL_AUTH + "uploadImageProfile";

//member
var URL_FIND_MEMBER_BY_ID = URL_MEMBER + "findMemberById";

//Content page
var URL_FIND_CONTENT_BI_ID_MEMBER = URL_CENTENT + "findContentByIdMember";
var URL_FIND_CONTENT_IN_ACTIVE = URL_CENTENT + "findContentInActive";
var URL_UPLOAD_IMAGE_DETAIL = URL_CENTENT + "uploadImageDetail";
var URL_ADD_CONTENT_BY_ID_MEMBER = URL_CENTENT + "addContentByIdMember";
var URL_EDIT_CONTENT_BY_ID_MEMBER = URL_CENTENT + "editContentByIdContent";
var URL_UPLOAD_EBOOK_CONTENT = URL_CENTENT + "uploadEBookContent";
var URL_UPLOAD_VIDEO_CONTENT = URL_CENTENT + "uploadVideoContent";
var URL_UPDATE_STATUS_CONTENT = URL_CENTENT + "updateStatusContent";


export default {
  BASE_URL: BASE_URL,
  URI_IMAGE: URI_IMAGE,
  URI_EBOOK: URI_EBOOK,
  URI_VIDEO: URI_VIDEO,
  URL_LOGIN: URL_LOGIN,
  URL_LOGOUT: URL_LOGOUT,
  CONTENT: {
    URL_FIND_CONTENT_BI_ID_MEMBER: URL_FIND_CONTENT_BI_ID_MEMBER,
    URL_FIND_CONTENT_IN_ACTIVE: URL_FIND_CONTENT_IN_ACTIVE,
    URL_UPLOAD_IMAGE_DETAIL: URL_UPLOAD_IMAGE_DETAIL,
    URL_ADD_CONTENT_BY_ID_MEMBER: URL_ADD_CONTENT_BY_ID_MEMBER,
    URL_EDIT_CONTENT_BY_ID_MEMBER: URL_EDIT_CONTENT_BY_ID_MEMBER,
    URL_UPLOAD_EBOOK_CONTENT : URL_UPLOAD_EBOOK_CONTENT,
    URL_UPLOAD_VIDEO_CONTENT : URL_UPLOAD_VIDEO_CONTENT,
    URL_UPDATE_STATUS_CONTENT : URL_UPDATE_STATUS_CONTENT
  },
  REGISTER_MEMBER : {
    URL_REGISTER_MEMBER : URL_REGISTER_MEMBER,
    URL_UPLOAD_IMAGE_PROFILE : URL_UPLOAD_IMAGE_PROFILE
  },
  MEMBER:{
    URL_FIND_MEMBER_BY_ID : URL_FIND_MEMBER_BY_ID
  }
}
