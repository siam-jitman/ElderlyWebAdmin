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
                    <span class="modal-title" style="color:red;">{{ message }}</span>
                    <b-form inline="" style="margin-top: 15px;">
                    <b-btn class="gray" @click.stop.prevent="closeDialog" style="display: block; margin: 0 auto;width:80px;">Cancel</b-btn>
                    <b-btn class="blue" @click.stop.prevent="closeDialog" style="display: block; margin: 0 auto;width:80px;">Confirm</b-btn>
                    <!-- <button class="blue" @click.stop.prevent="closeDialog" style="display: block; margin: 0 auto;width:80px;">OK</button> -->
                    </b-form>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
var TAG = "[/common/WindowConfirm/WindowConfirm.vue] => ";

// import apiUtil from "../../apiUtil/index";
// import uiUtil from "../../uiUtil/index";
// import constantUtil from "../../constantUtil/index";
// import globalUtil from "../../globalUtil/index";
// import dataUtil from "../../dataUtil/index";
// import storageUtil from "../../storageUtil/index";
// import validateUtil from "../../validateUtil/index";

export default {
  data() {
    return {
      showWindow: true,
      message: "You want to Delete ? ",
      header: "?????"
    };
  },
  methods: {
    closeDialog() {
      this.showWindow = !this.showWindow;
    }
  },
  created() {
    console.log(this.showWindow);
  },
  mounted() {}
};
</script>

<style scoped>
.modal-header {
  padding: 10px 20px;
}
* {
  font-family: "Cordia New Regular";
  font-size: 20px;
  font-weight: 600;
}
</style>
