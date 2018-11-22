export default {

  saveMemberData: (state, memberData) => {
    state.memberData = memberData;
  },

  removeMemberData: (state, memberData) => {
    sessionStorage.removeItem("memberData");
    state.memberData = null;
  }
}
