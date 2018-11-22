export default {

  saveMemberData({
    commit
  }, memberData) {
    commit('saveMemberData', memberData);
  },

  removeMemberData({
    commit
  }) {
    commit('removeMemberData');
  }

}
