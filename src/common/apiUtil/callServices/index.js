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
    // requestBody: Object.assign({
    //   tokenKey: storageUtil.sessionStorage.getSession('bm_tokenKey'),
    //   uidKey: storageUtil.sessionStorage.getSession('bm_uidKey'),
    //   deviceKey: storageUtil.sessionStorage.getSession('bm_deviceKey')
    // }, body)
    requestBody: body
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
function doPostFormData(url, body) {
  let setHeaders = {};
  return bus.axios.post(url, body, {'Content-Type': 'multipart/form-data' });
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

        const success = response.data.resultSuccess;
        const resultMessage = response.data.resultMessage;
        if (success) {
          console.log(TAG + "doSuccess response.data => ", response.data);
          doSuccess(response.data);
        } else {
          if (doFailed != undefined) {
            doFailed(response);
          } else {
            console.log(TAG + "doFailed", resultMessage);
            uiUtil.bus.post(
              constantUtil.EVENT.SHOW_ALERT_DIALOG,
              resultMessage
            );
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
  doPost_DefaultBody: doPost_DefaultBody,
  doPostFormData: doPostFormData
}
