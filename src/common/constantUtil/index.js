import EVENT from "./event/index"

var TAG = "[common/constantUtil/index.js] ";

function getDeserialize(response){
  return response.data.responseData;
}

export default {
  EVENT: EVENT,
  getDeserialize : getDeserialize
}
