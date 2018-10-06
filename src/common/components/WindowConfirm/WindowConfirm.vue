<template>
    <div v-show="showWindow">
        <div role="dialog" class="modal d-block" style="background:rgba(0,0,0,0.3);padding:0px 40px;z-index:999999;">
          <div class="modal-dialog modal-md modal-dialog-centered" style="width:400px;">
              <div tabindex="-1" role="document" class="modal-content">
                  <header class="modal-header">
                    <h5 class="modal-title">{{ header }}</h5>
                    <button type="button" aria-label="Close" class="close" @click.stop.prevent="closeDialog">×</button>
                  </header>
                  <div class="modal-body" style="text-align:center;">
                    <span class="modal-title" :style="styleMessage">{{ message }}</span>
                    <b-row style="margin-top: 15px;">
                      <b-col align="right">

                    <b-btn class="gray" @click.stop.prevent="onClickCancel">Cancel</b-btn>
                      </b-col>
                      <b-col align="left">
                    <b-btn class="blue" @click.stop.prevent="onClickConfirm">Confirm</b-btn></b-col>
                    <!-- <button class="blue" @click.stop.prevent="closeDialog" style="display: block; margin: 0 auto;width:80px;">OK</button> -->
                    </b-row>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
var TAG = "[/common/WindowConfirm/WindowConfirm.vue] => ";

import apiUtil from "../../apiUtil/index";
import uiUtil from "../../uiUtil/index";
import constantUtil from "../../constantUtil/index";
import globalUtil from "../../globalUtil/index";
import dataUtil from "../../dataUtil/index";
import storageUtil from "../../storageUtil/index";
import validateUtil from "../../validateUtil/index";

export default {
  props: {
    // propShowWindow: Boolean,
    // propMessage: String,
    // propHeader: String,
    // onConfirm: Function,
    // onCancel: Function
  },
  data() {
    return {
      showWindow: false,
      message: "",
      header: "",
      onConfirm: function() {},
      onCancel: function() {},
      styleMessage: {
        color: "#dc3545"
      }
    };
  },
  methods: {
    closeDialog() {
      this.showWindow = !this.showWindow;
    },
    onClickCancel() {
      this.closeDialog();
      this.onCancel();
    },
    onClickConfirm() {
      this.closeDialog();
      this.onConfirm();
    }
  },
  created() {
    // if (_.isEmpty(this.propHeader)) {
    //   this.header = "Message";
    // } else {
    //   this.header = this.propHeader;
    // }
    // if (_.isEmpty(this.propMessage)) {
    //   this.message = "Confirm to do it?";
    // } else {
    //   this.message = this.propMessage;
    // }
    // this.showWindow = this.propShowWindow;
  },
  mounted() {
    uiUtil.bus.on(
      constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
      (onConfirm, onCancel, message, header, styleMessage) => {
        this.showWindow = true;
        this.message = !_.isEmpty(message) ? message : "Confirm to do it?";
        this.header = !_.isEmpty(header) ? header : "Confirmation";
        this.onConfirm = onConfirm;
        this.onCancel = onCancel;
        this.styleMessage = !_.isEmpty(styleMessage)
          ? styleMessage
          : {
              color: "#dc3545"
            };
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
  font-family: "Roboto",sans-serif;
  font-size: 14px;
  font-weight: 600;
}
</style>
