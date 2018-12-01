<template>
  <div>
    <common-leftmenu></common-leftmenu>
    <common-topmenu id="topmenu" :headerName="''" :pageName="'รายการข้อมูลที่รอการอนุมัติ'"></common-topmenu>
    <div class="content-main">

      <list-content-management></list-content-management>

    </div>
    <common-footer id="footer"></common-footer>
  </div>
</template>

<script>
var TAG = "[/page/Content/ManagementContent.vue] => ";

import apiUtil from "../../common/apiUtil/index";
import uiUtil from "../../common/uiUtil/index";
import constantUtil from "../../common/constantUtil/index";
import globalUtil from "../../common/globalUtil/index";
import dataUtil from "../../common/dataUtil/index";
import storageUtil from "../../common/storageUtil/index";
import validateUtil from "../../common/validateUtil/index";

import ManagementListContent from "./ManagementListContent/ManagementListContent.vue";


export default {
  props: {},
  components: {
    "list-content-management": ManagementListContent
  },
  data() {
    return {
      listAdapterBOT: []
    };
  },
  methods: {
    // ********** methods call service **********//
    requestListContent() {
      console.log(
        TAG + "requestListContent start",
        globalUtil.SERVICES.CONTENT.URL_FIND_CONTENT_IN_ACTIVE
      );

      let that = this;

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);
      const bodyParams = {
        idMember: this.$store.getters.getMemberData.idMember
      };
      const call = apiUtil.callService.doPost(
        globalUtil.SERVICES.CONTENT.URL_FIND_CONTENT_IN_ACTIVE,
        bodyParams
      );

      apiUtil.callService.validateResponse(call, function(response) {
        console.log(TAG + "requestListContent success");
        // process after validateResponse
        uiUtil.bus.post(
          constantUtil.EVENT.MANAGEMENT_CONTENT.SET_ITEMS_LIST_CONTENT_MANAGEMENT,
          response.resultData
        );
        // end process after validateResponse
      });
    }
  },
  computed: {},
  beforeCreate() {
    // let dataMember = storageUtil.sessionStorage.getSession("dataMember");
    // console.log(dataMember);
    // if (dataMember == "" || dataMember == undefined) {
    //   this.$router.push("./");
    // }else{
    // this.requestListContent();
    // }
  },
  created() {
    let memberData = this.$store.getters.getMemberData;
    console.log(
      TAG + "created() => this.$store.getters.getMemberData => ",
      memberData
    );
    if (memberData == null || memberData.roleMember != "admin") {
      this.$router.push("/");
    } else {
      this.requestListContent();
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
#topmenu {
  /* margin-left: 90px; */
}
#footer {
  font-weight: 500;
  padding-left: 90px;
  color: #000;
}
.content-main {
  padding-top: 80px;
  padding-left: 60px;
}
</style>
