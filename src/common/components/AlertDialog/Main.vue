<template>
  <div v-show="showAlert">
    <div role="dialog" class="modal showAlert d-block" style="background:rgba(0,0,0,0.3);padding:0px 40px;z-index:999999;">
      <div class="modal-dialog modal-md modal-dialog-centered" style="width:400px;">
        <div tabindex="-1" role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">{{ header }}</h5>
            <button type="button" aria-label="Close" class="close" @click.stop.prevent="closeDialog">×</button>
          </header>
          <div class="modal-body" style="text-align:center;">
            <span class="modal-title" :style="{ color: 'red' }">{{ message }}</span>
            <br><br>
            <b-btn class="blue" @click.stop.prevent="closeDialog" style="display: block; margin: 0 auto;width:80px;">OK</b-btn>
            <!-- <button class="blue" @click.stop.prevent="closeDialog" style="display: block; margin: 0 auto;width:80px;">OK</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./custom.main.js";
import uiUtil from "../../uiUtil/index";
import constantUtil from "../../constantUtil/index";

var TAG = "[AlertDialog]";
export default {
  data() {
    return {
      showAlert: false,
      message: "",
      header: "",
      redirect: null,
      styleMessage: null
    };
  },
  methods: {
    closeDialog() {
      this.showAlert = !this.showAlert;
      if (!_.isEmpty(this.redirect) && this.redirect != null) {
        window.parent.location.href = this.redirect;
      }
    },
    setMessageColor() {
      if (_.isEmpty(this.styleMessage) || this.styleMessage == null) {
        return { color: "red" };
      } else {
        return this.styleMessage;
      }
    }
  },
  created() {
    console.log(this.showAlert);
  },
  mounted() {
    uiUtil.bus.on(
      constantUtil.EVENT.SHOW_ALERT_DIALOG,
      (message, header, redirect, styleMessage) => {
        this.showAlert = true;
        this.message = message;
        this.header = !_.isEmpty(header) ? header : "Message";
        this.redirect = redirect;
        this.styleMessage = styleMessage;
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
