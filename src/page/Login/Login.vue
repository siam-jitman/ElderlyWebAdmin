<template>
  <div class="body-login">

    <div
      class="d-flex justify-content-center"
      style="height: 100vh"
    >
      <div
        class="align-self-center"
        align="center"
      >
        <img src="https://via.placeholder.com/200x200?text=Logo">
        <br>
        <br>
        <span class="txt-main-login">Elderly Web Admin</span>
        <br><br>
        <b-form @submit="btnSubmitLogin">
          <b-form-group id="groupUsername">
            <b-form-input
              id="txt-username"
              maxlength="255"
              v-model="username"
              type="text"
              placeholder="ชื่อผู้ใช้"
              v-bind:class="{ 'is-invalid': txtUsernameIsInvalid}"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="groupPassword">
            <b-form-input
              id="txt-password"
              maxlength="255"
              v-model="password"
              type="password"
              placeholder="รหัสผ่าน"
              v-bind:class="{ 'is-invalid': txtPasswordIsInvalid}"
            >
            </b-form-input>
          </b-form-group>
          <b-button
            size="lg"
            class="blue-big"
            type="submit"
          >เข้าสู่ระบบ</b-button>
        </b-form>
        <br>
        <span
          class="span-register"
          @click.stop.prevent="clickRegisterSpan"
        >สมัครเป็นสมาชิก</span>
        <register :requestLogin="requestLogin"></register>
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

import Register from "./Register/Register";

export default {
  props: {},
  components: {
    register: Register
  },
  data() {
    return {
      username: "",
      password: "",
      txtUsernameIsInvalid: false,
      txtPasswordIsInvalid: false
    };
  },
  methods: {
    clickRegisterSpan() {
      uiUtil.bus.post(constantUtil.EVENT.REGISTER.SET_SHOW_WINDOW_REGISTER, {});
    },
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

        this.requestLogin();

        console.log(TAG + "btnSubmitLogin => ", "end btnSubmitLogin");
      }
    },
    // function call service
    requestLogin(username, password) {
      console.log(TAG + "requestLogin start");

      let that = this;

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);
      const bodyParams = {
        username: username == undefined ? this.username : username,
        password: password == undefined ? this.password : password
      };
      const call = apiUtil.callService.doPost(
        globalUtil.SERVICES.URL_LOGIN,
        bodyParams
      );

      apiUtil.callService.validateResponse(
        call,
        function(response) {
          let responseContent = response;
          console.log(
            TAG + "response => " + globalUtil.SERVICES.URL_LOGIN + " => ",
            responseContent
          );
          // process after validateResponse

          this.$store.dispatch("saveMemberData", responseContent.resultData);
          storageUtil.sessionStorage.setSession(
            "memberData",
            responseContent.resultData
          );
          // sessionStorage.setItem("memberData", responseContent.resultData);

          if (responseContent.resultData.roleMember == "member") {
            this.$router.push("./Content");
          } else if (responseContent.resultData.roleMember == "admin") {
            this.$router.push("./ManagementContent");
          }

          // end process after validateResponse
          console.log(TAG + "requestLogin success");
        }.bind(this)
      );
    }
  },
  computed: {},
  beforeCreate() {
    this.$store.dispatch("removeMemberData");
  },
  created() {}
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
  color: #000d46;
}

.span-register {
  color: #000d46;
}

.span-register:hover {
  color: #000d46;
  opacity: 0.8;
  text-decoration: underline;
  cursor: pointer;
}
/* #footer {
  width: 100%;
  position: fixed;
  text-align: center;
  background-color: #ebebeb;
} */
</style>
