import storageUtil from "../common/storageUtil/sessionStorage/index.js";

export default {

  getMemberData: state => {
    return state.memberData == undefined || state.memberData == null ?
      JSON.parse(sessionStorage.getItem("memberData")) == undefined || JSON.parse(sessionStorage.getItem("memberData")) == null ?
      null :
      JSON.parse(sessionStorage.getItem("memberData")) :
      state.memberData;
  }
}
