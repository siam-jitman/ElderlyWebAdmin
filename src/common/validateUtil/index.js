import REGEX from "./regex/index"

var TAG = "[common/validateUtil/index.js] ";

var dotCount = 0;

function validate(regex, event) {
  console.log(" === ", regex.test(event.key))
  if (regex.test(event.key) && !(event.keyCode >= 8 && event.keyCode <= 46)) {
    console.log(TAG + "validate(regex, event) => return =>", true);
    return true;
  } else {
    console.log(TAG + "validate(regex, event) => return =>", false);
    event.preventDefault();
    return false;
  }
}

function validateAll(regex, event) {


  console.log("ValidateAll => ", regex.test(event.key));
  if (regex.test(event.key)) {
    return true;
  } else {
    if (event.key == '.' && dotCount == 0) {
      dotCount++;
    } else {
      event.preventDefault();
    }
    return false;
  }
}

/**
 *
 * @param {Object} form => is config of form
 * @param {Object} value => is data model
 */

function validateForm(form) {
  console.log(TAG + "validateForm => ", form);
  let formIsInvalid = false;

  for (var key in form) {
    let vType = form[key].validateType != undefined && form[key].validateType != null ? new RegExp(JSON.parse(form[key].validateType)) : undefined;
    let dataValue = form[key].value;

    console.log(TAG + "validateForm() => dataValue => ", dataValue);

    let stateAllowBlank = null;
    let stateVType = null;

    if (!form[key].allowBlank && !form[key].disabled && form[key].type != "file") {
      if (_.isEmpty(dataValue)) {
        stateAllowBlank = false;
      } else {
        stateAllowBlank = null;
      }
    } else {
      if (_.isEmpty(dataValue)) {
        vType = undefined;
      }
    }

    if (vType != undefined) {
      if (vType.test(dataValue)) {
        stateVType = null;
      } else {
        stateVType = false;
      }
    } else {
      stateVType = null;
    }

    if (stateAllowBlank != null || stateVType != null) {
      console.log(TAG + "form[key]", form[key]);
      form[key].state = false;
      formIsInvalid = true;
    } else {
      form[key].state = null;
    }

  }

  if (formIsInvalid) {
    return false;
  } else {
    return true;
  }
}

export default {
  validateForm: validateForm,
  validate: validate,
  validateAll: validateAll,
  REGEX: REGEX
}
