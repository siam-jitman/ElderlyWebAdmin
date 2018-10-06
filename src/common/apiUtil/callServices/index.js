import {
  bus
} from "../../../main";
import constantUtil from "../../constantUtil/index";
import storageUtil from "../../storageUtil/index";
import uiUtil from "../../uiUtil/index";
const Vue = bus;
const TAG = "[/common/apiUtil/callServices/index.js]";

function globalHeader() {
  return {
    'Content-type': 'application/json'
  };
}

function createBodyParams(body) {
  return {
    requestData: Object.assign({
      tokenKey: storageUtil.sessionStorage.getSession('bm_tokenKey'),
      uidKey: storageUtil.sessionStorage.getSession('bm_uidKey'),
      deviceKey: storageUtil.sessionStorage.getSession('bm_deviceKey')
    }, body)
  };
}
/**
 * Function doGet() Api
 * @param {string} url
 * @param {object} body
 * @param {object} headers
 *
 * @return Promise
 */
function doGet(url, body, headers) {
  let setHeaders = {};
  if (!_.isEmpty(headers)) {
    setHeaders = headers;
  }
  return bus.axios.get(url, createBodyParams(body), setHeaders);
}
/**
 * Function doPost() Api
 * @param {string} url
 * @param {object} body
 * @param {object} headers
 *
 * @return Promise
 */
function doPost(url, body, headers) {
  let setHeaders = {};
  if (!_.isEmpty(headers)) {
    setHeaders = headers;
  }
  return bus.axios.post(url, createBodyParams(body), setHeaders);
}


/**
 * Function doPost() Api
 * @param {string} url
 * @param {object} body
 * @param {object} headers
 *
 * @return Promise
 */
function doPostWithCatch(url, body, headers) {
  try {
    let setHeaders = {};
    if (!_.isEmpty(headers)) {
      setHeaders = headers;
    }
    return bus.axios.post(url, createBodyParams(body), setHeaders);
  } catch (err) {
    uiUtil.error.readError(err);
  }
}

function doPost_DefaultBody(url, body, headers) {
  let setHeaders = {};
  if (!_.isEmpty(headers)) {
    setHeaders = headers;
  }
  return bus.axios.post(url, body, setHeaders);
}
/**
 * Using check status from call services
 * @param {object} response
 */
function checkSuccessStatus(response) {
  console.log(TAG + "[checkSuccessStatus] = ", response.status);
  if (response.status == 200) {
    return true;
  }
  return false;
}
/**
 *
 * @param {Request} request
 * @param {Function} doSuccess
 * @param {Function} doFailed
 * @param {Function} doCatch
 */
function validateResponse(request, doSuccess, doFailed, doCatch) {
  request.then(response => {
      if (response.status == 200) {

        // uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADED);

        const success = response.data.responseData.resultSuccess;
        const responseHeader = response.data.responseHeader;
        if (responseHeader.responseCode == '0000I') {
          console.log(TAG + "doSuccess", response);
          doSuccess(response);
        } else {


          if (responseHeader.responseCode == '3004E' || responseHeader.responseCode == '3005E' || responseHeader.responseCode == '3003E') {
            console.log(TAG + "doExpired", responseHeader.responseDescription);
            uiUtil.error.serviceExpired(responseHeader.responseCode, responseHeader.responseDescription);
          } else if (responseHeader.responseCode == '6004E' || responseHeader.responseCode == '6005E' || responseHeader.responseCode == '6006E' || responseHeader.responseCode == '8006E' || responseHeader.responseCode == '6007E') {
            console.log(TAG + "doFailed", responseHeader.responseDescription);
            uiUtil.bus.post(
              constantUtil.EVENT.SHOW_ALERT_DIALOG,
              responseHeader.responseDescription
            );
          } else {
            if (doFailed != undefined && _.isFunction(doFailed)) {
              console.log(TAG + "doFailed", response);
              doFailed(response);
            } else {
              console.log(TAG + "doFailed auto function", response);
              var message;
              if (_.isEmpty(responseHeader.responseDescription)) {
                message = "Please contact admin.";
              } else {
                message = responseHeader.responseDescription;
              }
              uiUtil.bus.post(
                constantUtil.EVENT.SHOW_ALERT_DIALOG,
                message
              );
            }
          }
        }
      }
    }).then(() => {
      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADED);
    })
    .catch(err => {
      console.log(TAG + "validateResponse error => ", err);
      if (doCatch != undefined && _.isFunction(doCatch)) {
        uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADED);
        doCatch();
      } else {
        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_ALERT_DIALOG,
          "Please contact admin. (error) => " + err
        );
        uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADED);
        uiUtil.error.readError(err);
      }
    });
}
/**
 * Using for get body data from response
 * @param {object} response
 */
function getResponseData(response) {
  return response.data;
}
export default {
  doGet: doGet,
  doPost: doPost,
  doPostWithCatch: doPostWithCatch,
  checkSuccessStatus: checkSuccessStatus,
  validateResponse: validateResponse,
  getResponseData: getResponseData,
  doPost_DefaultBody: doPost_DefaultBody
}
