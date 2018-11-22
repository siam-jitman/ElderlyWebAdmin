var TAG = "[common/storageUtil/sessionStorage/index.js]";
/**
 * Function Set Session
 * @param {string} key
 * @param {object} value
 */
function setSession(key, value) {
  console.log(TAG + " key = ", key);
  console.log(TAG + " value = ", value);

  sessionStorage.setItem(key, JSON.stringify(value));
}
/**
 * Function Get Session
 * @param {string} key
 * @param {string} defaultValue
 */
function getSession(key, defaultValue) {
  console.log(TAG + " key = ", key);
  console.log(TAG + " defaultValue = ", defaultValue);

  var storage = sessionStorage.getItem(key);
  if (_.isEmpty(storage)) {
    return _.isEmpty(defaultValue) ? "" : defaultValue;
  } else {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

function removeSession(key) {
  sessionStorage.removeItem(key);
}

function clearSession() {
  sessionStorage.clear();
}

/**
 *
 * @param {string} key
 * @returns {string}
 *
 */
function dd(key) {
  return "";
}
export default {
  setSession: setSession,
  getSession: getSession,
  removeSession:removeSession,
  clearSession:clearSession
}
