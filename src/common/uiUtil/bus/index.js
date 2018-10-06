import { bus } from "../../../main"
/**
 * 
 * 
 * @param {string} eventName 
 * @param {value} value 
 */
function post(eventName, value) {
  const args = Array.from(arguments);
  args.shift();
  bus.$emit(eventName,...args);
}

/**
 * 
 * 
 * @param {string} eventName 
 * @param {func} func 
 */
function on(eventName, func) {
  // bus.$off(eventName);
  bus.$on(eventName, func);
}
/**
 * 
 * @param {string} eventName 
 */
function off(eventName){
  bus.$off(eventName);
}
export default {
  post: post,
  on: on,
  off: off
}
