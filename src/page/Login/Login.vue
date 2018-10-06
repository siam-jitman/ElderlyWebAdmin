<template>
  <div class="body-login">

    <div class="d-flex justify-content-center" style="height: 100vh">
      <div class="align-self-center" align="center">
        <!-- <img src="../../assets/images/login/logoBotManager.png"> -->
        <br>
        <span class="txt-main-login">Elderly Web Admin</span>
        <br><br>
        <b-form @submit="btnSubmitLogin">
          <b-form-group id="groupUsername">
            <b-form-input id="txt-username" maxlength="255" v-model="username" type="text" placeholder="Username" v-bind:class="{ 'is-invalid': txtUsernameIsInvalid}">
            </b-form-input>
          </b-form-group>
          <b-form-group id="groupPassword">
            <b-form-input id="txt-password" maxlength="255" v-model="password" type="password" placeholder="Password" v-bind:class="{ 'is-invalid': txtPasswordIsInvalid}">
            </b-form-input>
          </b-form-group>
          <b-button size="lg" class="blue-big" type="submit">LOG IN</b-button>
        </b-form>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
var TAG = "[/page/Login/Login.vue] => ";

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
    return {
      username: "",
      password: "",
      txtUsernameIsInvalid: false,
      txtPasswordIsInvalid: false,
    };
  },
  methods: {
    btnSubmitLogin(e) {
      if (_.isEmpty(this.username) || _.isEmpty(this.password)) {
        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_ALERT_DIALOG,
          globalUtil.VARIABLES.MSG_ERROR.COMMON.MSG_REQUIRED
        );

        if (_.isEmpty(this.username)) {
          this.txtUsernameIsInvalid = true;
        } else {
          this.txtUsernameIsInvalid = false;
        }

        if (_.isEmpty(this.password)) {
          this.txtPasswordIsInvalid = true;
        } else {
          this.txtPasswordIsInvalid = false;
        }

        e.preventDefault();
      } else {
        this.txtUsernameIsInvalid = false;
        this.txtPasswordIsInvalid = false;
        e.preventDefault();
        console.log(TAG + "btnSubmitLogin => ", "start btnSubmitLogin");

        // this.requestLogin();

        console.log(TAG + "btnSubmitLogin => ", "end btnSubmitLogin");
      }
    }
  },
  computed: {},
  created() {
    sessionStorage.clear();
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
input[type="text"],
input[type="password"] {
  background: #fff;
  color: #000;
  font-size: 14px;
}

input[type="text"]::-webkit-input-placeholder {
  color: #979797 !important;
}

input[type="text"]:-moz-placeholder {
  /* Firefox 18- */
  color: #979797 !important;
}

input[type="text"]::-moz-placeholder {
  /* Firefox 19+ */
  color: #979797 !important;
}

input[type="text"]:-ms-input-placeholder {
  color: #979797 !important;
}

input[type="password"]::-webkit-input-placeholder {
  color: #979797 !important;
}

input[type="password"]:-moz-placeholder {
  /* Firefox 18- */
  color: #979797 !important;
}

input[type="password"]::-moz-placeholder {
  /* Firefox 19+ */
  color: #979797 !important;
}

input[type="password"]:-ms-input-placeholder {
  color: #979797 !important;
}

.body-login {
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  /* font-family: 'Source Sans Pro', sans-serif; */
  /* font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; */
  font-weight: 400;
  /* background-image: url("../../assets/images/bg/background.png"); */
  background-size: cover;
  background-repeat: none;

  background: #fff;
  background: -webkit-linear-gradient(#fff, #979797);
  background: -o-linear-gradient(#fff, #979797);
  background: -moz-linear-gradient(#fff, #979797);
  background: linear-gradient(#fff, #979797);
}
.txt-main-login {
  font-weight: 700;
  font-size: 25px;
  color: #001577;
}

/* #footer {
  width: 100%;
  position: fixed;
  text-align: center;
  background-color: #ebebeb;
} */
</style>
