<template>
  <div>
  </div>
</template>

<script>
var TAG = "[/page/Logout/Logout.vue] => ";

import apiUtil from "../../common/apiUtil/index";
import uiUtil from "../../common/uiUtil/index";
import constantUtil from "../../common/constantUtil/index";
import globalUtil from "../../common/globalUtil/index";
import dataUtil from "../../common/dataUtil/index";
import storageUtil from "../../common/storageUtil/index";
import validateUtil from "../../common/validateUtil/index";

export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    // function call service
    requestLogout() {
      this.$store.dispatch("removeMemberData");
      this.$router.push("/");

      // console.log(TAG + "requestLogout start");

      // let that = this;

      // uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);
      // const bodyParams = {};
      // const call = apiUtil.callService.doPost(
      //   globalUtil.SERVICES.URL_LOGOUT,
      //   bodyParams
      // );

      // apiUtil.callService.validateResponse(call, function(response) {
      //   let responseContent = response.data;
      //   console.log(
      //     TAG + "response => " + globalUtil.SERVICES.URL_LOGOUT + " => ",
      //     responseContent
      //   );
      //   // process after validateResponse
      //   // that.$router.push("./");
      //   // end process after validateResponse
      //   console.log(TAG + "requestLogout success");
      // });
    }
  },
  computed: {},
  created() {
    this.requestLogout();
  }
};
</script>

<style scoped>
</style>
