<template>
  <div>
    <!-- <common-leftmenu></common-leftmenu> -->
    <common-topmenu id="topmenu" :headerName="''" :pageName="'จัดการเนื้อหาของท่าน'"></common-topmenu>
    <div class="content-main">

      <list-content></list-content>

    </div>
    <common-footer id="footer"></common-footer>
  </div>
</template>

<script>
var TAG = "[/page/Content/Content.vue] => ";

import apiUtil from "../../common/apiUtil/index";
import uiUtil from "../../common/uiUtil/index";
import constantUtil from "../../common/constantUtil/index";
import globalUtil from "../../common/globalUtil/index";
import dataUtil from "../../common/dataUtil/index";
import storageUtil from "../../common/storageUtil/index";
import validateUtil from "../../common/validateUtil/index";

import ListContent from "./ListContent/ListContent.vue";

export default {
  props: {},
  components: {
    "list-content": ListContent
  },
  data() {
    return {
      listAdapterBOT: [],
    };
  },
  methods: {
    // ********** methods call service **********//
    requestListContent() {
      console.log(
        TAG + "requestListContent start",
        globalUtil.SERVICES.CONTENT.URL_FIND_CONTENT_BI_ID_MEMBER
      );

      let that = this;

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);
      const bodyParams = {
        idMember: sessionStorage.getItem("memberId")
      };
      const call = apiUtil.callService.doPost(
        globalUtil.SERVICES.CONTENT.URL_FIND_CONTENT_BI_ID_MEMBER,
        bodyParams
      );

      apiUtil.callService.validateResponse(call, function(response) {
        console.log(TAG + "requestListAdapterBot success");
        // process after validateResponse
        uiUtil.bus.post(
          constantUtil.EVENT.CONTENT.SET_ITEMS_LIST_CONTENT,
          response.resultData
        );
        // end process after validateResponse
      });
    }
  },
  computed: {},
  created() {
    this.requestListContent();
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
}
</style>
