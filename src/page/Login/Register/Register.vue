<template>
  <div v-show="showModel">
    <div
      role="dialog"
      class="modal d-block"
      style="background:rgba(0,0,0,0.3);padding:0px 40px;z-index:999998; "
    >
      <div class="modal-dialog modal-md modal-dialog-centered modal-register">
        <div
          tabindex="-1"
          role="document"
          class="modal-content"
        >
          <header class="modal-header">
            <h5 class="modal-title">
              <b>{{ headerDialog }}</b>
            </h5>
            <button
              type="button"
              aria-label="Close"
              class="close"
              @click.stop.prevent="closeDialog"
            >×</button>
          </header>
          <b-form @submit.stop.prevent="onSubmitRegister">
            <div
              class="modal-body modal-body-register"
              style="text-align:left;"
            >

              <b-form-group
                label="อีเมล์"
                v-show="true"
              >
                <b-form-input
                  v-model="formRegis.emailMember"
                  type="email"
                  placeholder="อีเมล์"
                  :state="formRegis.state.emailMember"
                  required
                />
              </b-form-group>

              <b-form-group
                label="รหัสผ่าน"
                v-show="true"
              >
                <b-form-input
                  v-model="formRegis.passwordMember"
                  type="password"
                  placeholder="รหัสผ่าน"
                  :state="formRegis.state.passwordMember"
                  required
                />
              </b-form-group>

              <b-form-group
                label="ยืนยันรหัสผ่าน"
                v-show="true"
              >
                <b-form-input
                  v-model="formRegis.confirmPasswordMember"
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  :state="formRegis.state.confirmPasswordMember"
                  required
                />
              </b-form-group>

              <b-form-group
                label="ชื่อ - นามสกุล"
                v-show="true"
              >
                <b-form-input
                  v-model="formRegis.nameMember"
                  type="text"
                  placeholder="ชื่อ - นามสกุล"
                  :state="formRegis.state.nameMember"
                  required
                />
              </b-form-group>

              <b-form-group
                label="เพศ"
                v-show="true"
              >
                <b-form-select
                  v-model="formRegis.genderMember"
                  :options="optionsGenderMember"
                  :state="formRegis.state.genderMember"
                  required
                />
              </b-form-group>

              <b-form-group
                label="ที่อยู่"
                v-show="true"
              >
                <b-form-input
                  v-model="formRegis.addressMember"
                  type="text"
                  placeholder="ที่อยู่"
                  :state="formRegis.state.addressMember"
                />
              </b-form-group>

              <b-form-group
                label="วัน/เดิอน/ปี เกิด"
                v-show="true"
              >
                <b-form-input
                  v-model="formRegis.birthdayMember"
                  type="date"
                  placeholder="วัน/เดิอน/ปี เกิด"
                  :state="formRegis.state.birthdayMember"
                />
              </b-form-group>

              <b-form-group
                label="โทรศัพท์"
                v-show="true"
              >
                <b-form-input
                  v-model="formRegis.telMember"
                  type="text"
                  placeholder="โทรศัพท์"
                  :state="formRegis.state.telMember"
                />
              </b-form-group>

            </div>
            <div class="modal-footer">
              <b-button
                class="blue"
                type="submit"
              >ยืนยันสมัครสมาชิก</b-button>
              <b-button
                class="gray"
                @click.stop.prevent="closeDialog"
              >ยกเลิก</b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var TAG = "[/common/Login/Register/Register.vue] => ";

import apiUtil from "../../../common/apiUtil/index";
import uiUtil from "../../../common/uiUtil/index";
import constantUtil from "../../../common/constantUtil/index";
import globalUtil from "../../../common/globalUtil/index";
import dataUtil from "../../../common/dataUtil/index";
import storageUtil from "../../../common/storageUtil/index";
import validateUtil from "../../../common/validateUtil/index";

export default {
  props: {
    requestLogin: Function
  },
  components: {},
  data() {
    return {
      optionsGenderMember: globalUtil.VARIABLES.GENDER_MEMBER,
      formRegis: {
        emailMember: "",
        passwordMember: "",
        confirmPasswordMember: "",
        nameMember: "",
        genderMember: null,
        addressMember: "",
        birthdayMember: "",
        telMember: "",
        state: {
          emailMember: null,
          passwordMember: null,
          confirmPasswordMember: null,
          nameMember: null,
          genderMember: null,
          addressMember: null,
          birthdayMember: null,
          telMember: null
        }
      },
      showModel: false,
      headerDialog: "สมัครสมาชิก"
    };
  },
  methods: {
    onSubmitRegister() {
      this.$nextTick(() => {
        if (
          this.formRegis.passwordMember != this.formRegis.confirmPasswordMember
        ) {
          uiUtil.bus.post(
            constantUtil.EVENT.SHOW_ALERT_DIALOG,
            globalUtil.VARIABLES.MSG_ERROR.REGISTER.MSG_PASSWORD_NOT_MATCH
          );
        } else {

          let param = {
            emailMember: this.formRegis.emailMember,
            usernameMember: this.formRegis.emailMember,
            passwordMember: this.formRegis.passwordMember,
            nameMember: this.formRegis.nameMember,
            genderMember: this.formRegis.genderMember,
            addressMember: this.formRegis.addressMember,
            birthdayMember: this.formRegis.birthdayMember,
            telMember: this.formRegis.telMember
          };

          this.requestRegisterMember(param);
        }
      });
    },
    closeDialog() {
      this.formRegis = {
        emailMember: "",
        passwordMember: "",
        confirmPasswordMember: "",
        nameMember: "",
        genderMember: null,
        addressMember: "",
        birthdayMember: "",
        telMember: "",
        state: {
          emailMember: null,
          passwordMember: null,
          confirmPasswordMember: null,
          nameMember: null,
          genderMember: null,
          addressMember: null,
          birthdayMember: null,
          telMember: null
        }
      };
      this.showModel = !this.showModel;
    },
    // ********** methods call service **********//
    requestRegisterMember(bodyParams) {
      console.log(
        TAG + "requestRegisterMember start",
        globalUtil.SERVICES.REGISTER_MEMBER.URL_REGISTER_MEMBER
      );

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      const call = apiUtil.callService.doPost(
        globalUtil.SERVICES.REGISTER_MEMBER.URL_REGISTER_MEMBER,
        bodyParams
      );

      apiUtil.callService.validateResponse(
        call,
        function(response) {
          console.log(TAG + "requestRegisterMember success");
          // process after validateResponse

          this.closeDialog();
          this.requestLogin(bodyParams.emailMember, bodyParams.passwordMember);

          // end process after validateResponse
        }.bind(this)
      );
    }
  },
  created() {},
  mounted() {
    uiUtil.bus.on(constantUtil.EVENT.REGISTER.SET_SHOW_WINDOW_REGISTER, obj => {
      this.showModel = true;
    });
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
.modal-register {
  width: 80%;
  max-width: 1000px;

  /* max-height: 70vh;
  overflow-x: none;
  overflow-y: auto; */
}
.modal-body-register {
  max-height: 70vh;
  overflow-x: none;
  overflow-y: auto;
}
</style>
