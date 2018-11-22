import UUID from './uuid/index.js'

var TAG = "[common/dataUtil/index.js] ";

function getValuesForm(form) {
  let value = {};
  for (var key in form) {
    value[key] = form[key].value != undefined && form[key].value != null ? form[key].value : "";
  }
  return value;
}

export default {
  UUID: UUID,
  getValuesForm: getValuesForm
}
