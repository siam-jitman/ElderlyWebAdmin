<template>
  <div v-show="showModel">
    <div role="dialog" class="modal d-block" style="background:rgba(0,0,0,0.3);padding:0px 40px;z-index:999998;">
      <div class="modal-dialog modal-md modal-dialog-centered" style="width: 550px; max-width: 550px;">
        <div tabindex="-1" role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">
              <b>{{ headerDialog }}</b>
            </h5>
            <button type="button" aria-label="Close" class="close" @click.stop.prevent="closeDialog">×</button>
          </header>
          <div class="modal-body" style="text-align:left;">
            <p>
              <b>{{titleDialog}}</b>
            </p>
            <b-form inline="">
              <b-form-file v-model="file" ref="fileinput" :style="{'width' : widthInput}" :state="Boolean(file)" accept="image/jpeg, image/png"></b-form-file>
              <b-button size="lg" class="blue" type="button" :style="{'margin-left' : '10px' , 'height' : '37px'}" @click.stop.prevent="submitFile">
                <font-awesome-icon :icon="['fas','upload']" />
                <span class="span-in-button">&nbsp;Upload</span>
              </b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var TAG = "[/common/WindowUploadImage/WindowUploadImage.vue] => ";

import apiUtil from "../../apiUtil/index";
import uiUtil from "../../uiUtil/index";
import constantUtil from "../../constantUtil/index";
import globalUtil from "../../globalUtil/index";
import dataUtil from "../../dataUtil/index";
import storageUtil from "../../storageUtil/index";
import validateUtil from "../../validateUtil/index";

export default {
  props: {},
  components: {},
  data() {
    return {
      url: globalUtil.SERVICES.IMS.URL_UPLOAD_PERMANENT,
      titleDialog: "",
      widthInput: "400px",
      lableWidth: "160px",
      file: null,
      showModel: false,
      headerDialog: "Upload Image",

      doSuccess: function() {},
      doFailure: function() {},
      oldImage: "",
      myData: {}
    };
  },
  methods: {
    closeDialog() {
      this.file = null;
      this.$refs.fileinput.reset();
      this.showModel = !this.showModel;
    },
    submitFile() {
      if (this.file == null) {
        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_ALERT_DIALOG,
          globalUtil.VARIABLES.MSG_ERROR.COMMON.MSG_REQUIRED
        );
      } else if (
        this.file.type != "image/jpeg" &&
        this.file.type != "image/png"
      ) {
        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_ALERT_DIALOG,
          globalUtil.VARIABLES.MSG_ERROR.COMMON.MSG_ERROR_UPLOAD_IMAGE
        );
      } else {
        console.log(TAG + "submitFile", this.file);
        // Initialize the form data
        let formData = new FormData();

        // Add the form data we need to submit
        formData.append("files[]", this.file);

        console.log(TAG + "url oldImage", this.oldImage);
        if (!_.isEmpty(this.oldImage)) {
          let key = this.getKey(this.oldImage);
          if (!_.isEmpty(key)) {
            formData.append("key", key);
          }
        }

        // Make the request to the POST /single-file URL
        this.axios
          .post(this.url, formData, {
            headers: {}
          })
          .then(res => {
            this.file = null;
            this.$refs.fileinput.reset();

            var d = new Date();
            var time = d.getTime();
            this.closeDialog();
            this.doSuccess(
              res.data.resultData.url + "&_dma_internal=true&no_cache=" + time,
              this.myData
            );
          })
          .catch(err => {
            console.log(TAG + "on catch", err);
            this.doFailure(err);
          });
      }
    },
    getKey(path) {
      console.log(TAG + "path", path);
      var key = path.split("key=")[1];
      if (key != undefined && key.indexOf("_dma_internal") > 0) {
        key = key.split("&_dma_internal")[0];
      }
      console.log(TAG + "key", key);
      return key;
    }
  },
  created() {
    console.log(TAG + "created => ", this.showModel);
  },
  mounted() {
    uiUtil.bus.on(
      constantUtil.EVENT.BOT_CONFIG.CLICK_OPEN_UPLOAD_IMAGE,
      obj => {
        this.titleDialog = obj.titleDialog;
        this.doSuccess = obj.doSuccess;
        this.doFailure = obj.doFailure;
        this.oldImage = obj.oldImage;
        // show modal
        this.file = null;
        this.showModel = true;
      }
    );
  }
};
</script>

<style scoped>
.modal-header {
  padding: 10px 20px;
}
* {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
</style>
