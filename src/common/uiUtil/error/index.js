import bus from "../bus/index"

var TAG = "[/common/uiUtil/error/index.js]"

function readError(err, extUrl) {
  console.log(TAG + " [error] ", err);
  const baseUrl = window.location.protocol + '//' + window.location.hostname;
  let url = baseUrl + "/botManager/process/";
  if (extUrl != undefined) {
    url = baseUrl + extUrl;
  }
  const response = err.response;
  console.log(TAG + " Error = ", err);
  if (response.status == 401) {
    bus.post("showDefaultAlertDialog", "Session Expired !!!", "Message", url);
  } else {
    bus.post("showDefaultAlertDialog", response.statusText);
  }
}

function serviceExpired(responseCode, responseDescription) {
  console.log(TAG + " [responseCode] ", responseCode);
  console.log(TAG + " [responseDescription] ", responseDescription);
  const baseUrl = window.location.protocol + '//' + window.location.hostname;
  let url = baseUrl + "/botManager/process/";
  bus.post("showDefaultAlertDialog", responseDescription, "Message", url);
}


export default {
  readError: readError,
  serviceExpired: serviceExpired
}
