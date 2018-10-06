/*-- Url Call Server --*/

var PORT = window.location.port == '' ? '' : ':' + window.location.port;
var BASE_URL = window.location.hostname == "localhost" ? window.location.protocol + '//' + window.location.hostname + ":3002" : window.location.protocol + '//' + window.location.hostname + '' + PORT;
// var URI_SYS = BASE_URL + '/botManager/apis/';
var URI_ROOT_SYS = BASE_URL + '/apis/';
var URL_SYS_BOT_MANAGER = BASE_URL + '/botManager/apis/';
var URI_SYS_BOT_ENGINE = BASE_URL + '/botEngine/apis/';
var URI_IMS = BASE_URL + '/ims/apis/file/';


var URL_AUTH = URI_SYS_BOT_ENGINE + 'authen/';
var URL_HOME = URI_SYS_BOT_ENGINE + 'json/home/';
var URL_MANAGET_HOME = URL_SYS_BOT_MANAGER + 'json/home/';
var URL_BOT_CONFIG = URI_SYS_BOT_ENGINE + 'json/botConfig/';
var URL_ADAPTER_BOT = URI_SYS_BOT_ENGINE + 'json/adapterBot/';
var URL_CHANGE_PASSWORD = URI_SYS_BOT_ENGINE + 'json/changePassword/';
var URL_CONFIG = URI_SYS_BOT_ENGINE + 'json/config/';
var URL_SERVICE_GATEWAY = URI_SYS_BOT_ENGINE + 'json/serviceGateway/';
// Login page
var URL_LOGIN = URL_AUTH + 'login';
var URL_LOGOUT = URL_AUTH + 'logout';

// Home page
var URL_GET_WELCOME = URL_HOME + 'getWelcomeInfo';
var URL_GET_MENU = URL_HOME + 'getMenuInfo';
var URL_GET_UI_VERSION = URL_MANAGET_HOME + 'getUIVersionInfo';
var URL_GET_ENGINE_VERSION = URL_HOME + 'getEngineVersionInfo';

//BOT Config
var URL_LIST_BOT = URL_BOT_CONFIG + "listBot";
var URL_CREATE_BOT = URL_BOT_CONFIG + "createBot";
var URL_UPDATE_BOT = URL_BOT_CONFIG + "updateBot";
var URL_CHANGE_ACTIVE_STATUS_BOT_CONFIG = URL_BOT_CONFIG + "changeActiveStatus";
var URL_DELETE_BOT = URL_BOT_CONFIG + "deleteBot";

//Adapter Bot
var URL_LIST_ADAPTER_BOT = URL_ADAPTER_BOT + 'listAdapterBot';
var URL_DELETE_ADAPTER_BOT = URL_ADAPTER_BOT + 'deleteAdapterBot';
var URL_CREATE_ADAPTER_BOT = URL_ADAPTER_BOT + 'createAdapterBot';
var URL_UPDATE_ADAPTER_BOT = URL_ADAPTER_BOT + 'updateAdapterBot';
var URL_CHANGE_ACTIVE_STATUS = URL_ADAPTER_BOT + "changeActiveStatus";

//change password
var URL_UPDATE_DATA = URL_CHANGE_PASSWORD + 'updateData';

// out service (config)
var URL_LIST_USER_BOT = URL_CONFIG + 'listUserBot';
var URL_UPDATE_PROFILE_USER_BOT = URL_CONFIG + 'updateProfileUserBot';

//from serviceGateway
var URL_LIST_API = URL_SERVICE_GATEWAY + 'listApi';

//from IMS
var URL_UPLOAD_PERMANENT = URI_IMS + 'UploadPermanent';

export default {
  BASE_URL: BASE_URL,
  URL_LOGIN: URL_LOGIN,
  URL_LOGOUT: URL_LOGOUT,
  HOME: {
    URL_GET_MENU: URL_GET_MENU,
    URL_GET_WELCOME: URL_GET_WELCOME,
    URL_GET_UI_VERSION: URL_GET_UI_VERSION,
    URL_GET_ENGINE_VERSION: URL_GET_ENGINE_VERSION
  },
  BOT_CONFIG: {
    URL_LIST_BOT: URL_LIST_BOT,
    URL_CREATE_BOT: URL_CREATE_BOT,
    URL_UPDATE_BOT: URL_UPDATE_BOT,
    URL_CHANGE_ACTIVE_STATUS_BOT_CONFIG: URL_CHANGE_ACTIVE_STATUS_BOT_CONFIG,
    URL_DELETE_BOT: URL_DELETE_BOT
  },
  ADAPTER_BOT: {
    URL_LIST_ADAPTER_BOT: URL_LIST_ADAPTER_BOT,
    URL_DELETE_ADAPTER_BOT: URL_DELETE_ADAPTER_BOT,
    URL_CHANGE_ACTIVE_STATUS: URL_CHANGE_ACTIVE_STATUS,
    URL_CREATE_ADAPTER_BOT: URL_CREATE_ADAPTER_BOT,
    URL_UPDATE_ADAPTER_BOT: URL_UPDATE_ADAPTER_BOT
  },
  CHANGE_PASSWORD: {
    URL_UPDATE_DATA: URL_UPDATE_DATA
  },
  CONFIG: {
    URL_LIST_USER_BOT: URL_LIST_USER_BOT,
    URL_LIST_ADAPTER_BOT: URL_LIST_ADAPTER_BOT,
    URL_UPDATE_PROFILE_USER_BOT:URL_UPDATE_PROFILE_USER_BOT
  },
  SERVICE_GATEWAY: {
    URL_LIST_API: URL_LIST_API
  },
  IMS: {
    URL_UPLOAD_PERMANENT: URL_UPLOAD_PERMANENT
  }
}
