<template>
  <div>
    <common-leftmenu></common-leftmenu>
    <common-topmenu
      id="topmenu"
      :headerName="''"
      :pageName="pageName"
    ></common-topmenu>
    <div class="content-main">
      <div class="container">
        <b-form>

          <div align="right">
            <b-btn
              class="blue"
              @click="clickApprove()"
            >
              <font-awesome-icon :icon="['fas','check-circle']" />
              อนุมัติให้แสดงข้อมูล
            </b-btn>
            <b-btn
              class="red"
              @click="clickReject()"
            >
              <font-awesome-icon :icon="['fas','times-circle']" />
              ไม่อนุมัติให้แสดงข้อมูล
            </b-btn>
            <router-link :to="'/ManagementContent/'">
              <b-btn class="gray">
                กลับ
              </b-btn>
            </router-link>
          </div>

          <b-form-group
            :label="formContent.nameContent.label"
            v-show="formContent.nameContent.show"
          >
            <b-form-input
              v-model="formContent.nameContent.value"
              :type="formContent.nameContent.type"
              :placeholder="formContent.nameContent.placeholder"
              @keypress.native="validateText($event,formContent.nameContent.validateType)"
              :state="formContent.nameContent.state"
              :disabled="formContent.nameContent.disabled"
            />
            <!-- {{formContent.nameContent.validateType}} -->
          </b-form-group>

          <b-form-group
            :label="formContent.idCategory.label"
            v-show="formContent.idCategory.show"
          >
            <b-form-select
              v-model="formContent.idCategory.value"
              :options="optionsCategory"
              :state="formContent.idCategory.state"
              :disabled="formContent.idCategory.disabled"
            />
          </b-form-group>

          <b-form-group
            :label="formContent.imageContent.label"
            v-show="formContent.imageContent.show"
          >
            <div
              v-show="status == 'update'"
              style="width: 100%;"
              align="center"
            >
              <img
                :src="setShowImageContent(formContent.imageContent.value)"
                alt=""
                style="max-height: 400px;"
              >
            </div>

          </b-form-group>

          <b-form-group
            :label="formContent.urlContent.label"
            v-show="formContent.urlContent.show"
          >
            <a
              target="_blank"
              :href="setShowFileVideoContent(formContent.urlContent.value)"
            >ดาวน์โหลด {{formContent.urlContent.label}}</a>
          </b-form-group>

          <b-form-group
            :label="formContent.fileEbookContent.label"
            v-show="formContent.fileEbookContent.show"
          >
            <a
              target="_blank"
              :href="setShowFileEbookContent(formContent.fileEbookContent.value)"
            >ดาวน์โหลด {{formContent.fileEbookContent.label}}</a>
          </b-form-group>

          <b-form-group
            :label="formContent.scriptContent.label"
            v-show="formContent.scriptContent.show"
          >
            <b-form-input
              v-model="formContent.scriptContent.value"
              :type="formContent.scriptContent.type"
              :placeholder="formContent.scriptContent.placeholder"
              @keypress.native="validateText($event,formContent.scriptContent.validateType)"
              :state="formContent.scriptContent.state"
              :disabled="formContent.scriptContent.disabled"
            />
          </b-form-group>

          <b-form-group
            :label="formContent.detailContent.label"
            v-show="formContent.detailContent.show"
          >
            <ckeditor
              type="classic"
              v-model="formContent.detailContent.value"
              :upload-adapter="UploadAdapter"
              id="ck-create-update-content"
              :state="formContent.detailContent.state"
              :readonly="true"
            ></ckeditor>
          </b-form-group>

        </b-form>
      </div>

      <!-- Data :: {{value1}}
      <ckeditor type="classic" v-model="value1" :upload-adapter="UploadAdapter" :readonly="true" id="ck-readonly"></ckeditor> -->
    </div>
    <common-footer id="footer"></common-footer>
  </div>
</template>

<script>
var TAG = "[/page/Content/ViewContent/ViewContent.vue] => ";

const rs = require("regex-stringify");

import apiUtil from "../../../common/apiUtil/index";
import uiUtil from "../../../common/uiUtil/index";
import constantUtil from "../../../common/constantUtil/index";
import globalUtil from "../../../common/globalUtil/index";
import dataUtil from "../../../common/dataUtil/index";
import storageUtil from "../../../common/storageUtil/index";
import validateUtil from "../../../common/validateUtil/index";

import "./custom.scss";

export default {
  props: {},
  data() {
    return {
      idContent: NaN,
      activeStatus: NaN,
      status: "update",
      formContent: {
        nameContent: {
          id: "txtNameContent",
          value: "",
          type: "text",
          label: "ชื่อเนื้อหา",
          placeholder: "ชื่อของเนื้อหา",
          allowBlank: false,
          disabled: true,
          readOnly: false,
          validateType: rs(validateUtil.REGEX.TEXT_NOT_SPECIAL_HAVE_SPEC_UNDER),
          show: true,
          state: null
        },
        idCategory: {
          id: "cbbIdCategory",
          value: null,
          type: "combo",
          label: "หมวดหมู่ของเนื้อหา",
          allowBlank: false,
          disabled: true,
          readOnly: false,
          options: this.optionsCategory,
          show: true,
          state: null
        },
        imageContent: {
          id: "fileImageContent",
          value: null,
          type: "file",
          accept: "image/jpeg, image/png",
          label: "รูปภาพหลักของเนื้อหา",
          placeholder: "เลือกรูปภาพหลักของเนื้อหา",
          allowBlank: true,
          disabled: true,
          readOnly: false,
          show: true,
          state: null
        },
        urlContent: {
          id: "urlContent",
          value: null,
          type: "file",
          label: "ไฟล์วิดีโอ",
          placeholder: "เลือกไฟล์วิดีโอ",
          allowBlank: true,
          disabled: true,
          readOnly: false,
          show: true,
          state: null,
          fileName: ""
        },
        fileEbookContent: {
          id: "fileEbookContent",
          value: null,
          type: "file",
          accept: "application/epub+zip",
          label: "ไฟล์ e-Book",
          placeholder: "เลือกไฟล์ e-Book",
          allowBlank: true,
          disabled: true,
          readOnly: false,
          show: true,
          state: null
        },
        scriptContent: {
          id: "txtScriptContent",
          value: null,
          type: "text",
          label: "รายละเอียดโดยย่อ",
          placeholder: "รายละเอียดโดยย่อของเนื้อหา",
          allowBlank: false,
          disabled: true,
          readOnly: false,
          show: true,
          validateType: rs(validateUtil.REGEX.TEXT_NOT_SPECIAL_HAVE_SPEC_UNDER),
          state: null
        },
        detailContent: {
          id: "txtDetailContent",
          value: "",
          type: "textarea",
          label: "รายละเอียดเนื้อหา",
          allowBlank: false,
          disabled: true,
          readOnly: false,
          show: true,
          state: null
        }
      },
      optionsCategory: globalUtil.VARIABLES.CATEGORY,
      pageName: "รายการข้อมูลที่รอการอนุมัติ",
      UploadAdapter: function(loader) {
        this.loader = loader;
        this.upload = () => {
          const body = new FormData();
          body.append("uploadImage", this.loader.file);

          const call = apiUtil.callService.doPostFormData(
            globalUtil.SERVICES.CONTENT.URL_UPLOAD_IMAGE_DETAIL,
            body
          );

          // console.log(call.then(response => response))

          return call.then(response => {
            console.log(
              globalUtil.SERVICES.URI_IMAGE + response.data.resultData
            );
            return {
              default: globalUtil.SERVICES.URI_IMAGE + response.data.resultData
            };
          });
        };
        this.abort = () => {
          console.log("Abort upload.");
        };
      }
    };
  },
  computed: {},
  methods: {
    setShowFileVideoContent(urlVideo) {
      return globalUtil.SERVICES.URI_VIDEO + urlVideo;
    },
    setShowFileEbookContent(urlEbook) {
      return globalUtil.SERVICES.URI_EBOOK + urlEbook;
    },
    setShowImageContent(urlImage) {
      return globalUtil.SERVICES.URI_IMAGE + "profile/content/" + urlImage;
    },
    validateUrl(event, obj) {
      event.preventDefault();
      if (new RegExp(JSON.parse(obj.validateType)).test(obj.value)) {
        obj.state = null;
      } else {
        obj.state = false;

        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_ALERT_DIALOG,
          globalUtil.VARIABLES.MSG_ERROR.COMMON.MSG_REQUIRED_URL
        );
      }
    },
    clickBtnUpdate() {},
    clickReject() {
      this.activeStatus = 2;
      // this.$nextTick(() => {
      uiUtil.bus.post(
        constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
        this.requestUpdateStatusContent,
        function() {},
        globalUtil.VARIABLES.MSG_CONFIRM.MSG_CONFIRM_APPROVE_CONTENT,
        globalUtil.VARIABLES.MSG_CONFIRM_HEADER.MSG_CONFIRM_APPROVE_CONTENT
      );
      // });
    },
    clickApprove() {
      this.activeStatus = 1;
      // this.$nextTick(() => {
      uiUtil.bus.post(
        constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
        this.requestUpdateStatusContent,
        function() {},
        globalUtil.VARIABLES.MSG_CONFIRM.MSG_CONFIRM_APPROVE_CONTENT,
        globalUtil.VARIABLES.MSG_CONFIRM_HEADER.MSG_CONFIRM_APPROVE_CONTENT
      );
      // });
    },
    validateText: function(event, validateType) {
      console.log(TAG + "validateText() => validateType ", validateType);
      validateUtil.validateAll(new RegExp(JSON.parse(validateType)), event);
    },
    onChangeCbbIdCategory: function() {
      this.$nextTick(() => {
        this.formContent.urlContent.disabled =
          this.formContent.idCategory.value == "1" ||
          this.formContent.idCategory.value == "7" ||
          this.formContent.idCategory.value == "8"
            ? false
            : true;

        this.formContent.urlContent.value = "";

        this.formContent.urlContent.allowBlank =
          this.formContent.idCategory.value == "1" ||
          this.formContent.idCategory.value == "7" ||
          this.formContent.idCategory.value == "8"
            ? false
            : true;

        this.formContent.fileEbookContent.disabled =
          this.formContent.idCategory.value == "4" ? false : true;

        this.formContent.fileEbookContent.value = null;
        this.$refs.fileEbookContent.reset();

        this.formContent.fileEbookContent.allowBlank =
          this.formContent.idCategory.value == "4" ? false : true;
      });
    },
    remaveMediaDropdownInCkEditor() {
      setTimeout(function() {
        window.document
          .getElementsByClassName("ck ck-dropdown")[2]
          .setAttribute("style", "display: none");

        uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADED);
      }, 0);
    },
    // ********** methods call service **********//
    requestUpdateStatusContent() {
      console.log(
        TAG + "requestUpdateStatusContent start",
        globalUtil.SERVICES.CONTENT.URL_UPDATE_STATUS_CONTENT
      );

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);
      const bodyParams = {
        idContent: this.idContent,
        activeStatus: this.activeStatus
      };
      const call = apiUtil.callService.doPost(
        globalUtil.SERVICES.CONTENT.URL_UPDATE_STATUS_CONTENT,
        bodyParams
      );

      apiUtil.callService.validateResponse(
        call,
        function(response) {
          console.log(TAG + "requestUpdateStatusContent success");
          // process after validateResponse
          this.$router.push("/ManagementContent");
          // end process after validateResponse
        }.bind(this)
      );
    }
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
      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      if (this.$route.params.DataForViewContent) {
        this.status = "update";

        console.log(
          TAG + "CREATE() => , this.$route.params.DataForViewContent => ",
          this.$route.params.DataForViewContent
        );
        if (this.$route.params.DataForViewContent.idCategory == "4") {
          this.formContent.urlContent.show = false;
        }
        if (
          this.$route.params.DataForViewContent.idCategory == "1" ||
          this.$route.params.DataForViewContent.idCategory == "7" ||
          this.$route.params.DataForViewContent.idCategory == "8"
        ) {
          this.formContent.fileEbookContent.show = false;
        }

        this.formContent.idCategory.disabled = true;

        let DataForViewContent = this.$route.params.DataForViewContent;
        this.formContent.nameContent.value = DataForViewContent.nameContent;
        this.formContent.idCategory.value = DataForViewContent.idCategory;
        this.formContent.imageContent.value = DataForViewContent.imageContent;
        this.formContent.urlContent.value = DataForViewContent.urlContent;
        this.formContent.fileEbookContent.value =
          DataForViewContent.fileEBookContent;
        this.formContent.scriptContent.value = DataForViewContent.scriptContent;
        this.formContent.detailContent.value = DataForViewContent.detailContent;
        this.idContent = DataForViewContent.idContent;

        // this.onChangeCbbIdCategory();
      } else {
          this.$router.push("/ManagementContent");
      }
    }
  },
  mounted() {
    this.remaveMediaDropdownInCkEditor();
  },
  watch: {}
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  /* font-size: 14px; */
}
</style>
