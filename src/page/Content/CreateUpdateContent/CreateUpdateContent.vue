<template>
  <div>
    <common-topmenu id="topmenu" :headerName="''" :pageName="pageName"></common-topmenu>
    <div class="content-main">
      <div class="container">
        <b-form>

          <div align="right">
            <b-btn v-show="status == 'create'" class="blue" @click="clickBtnAdd()">
              <font-awesome-icon :icon="['fas','plus-circle']" />
              เพิ่ม
            </b-btn>
            <b-btn v-show="status == 'update'" class="blue" @click="clickBtnUpdate()">
              <font-awesome-icon :icon="['fas','plus-circle']" />
              แก้ไข
            </b-btn>
            <router-link :to="'/Content/'">
              <b-btn class="gray">
                ยกเลิก
              </b-btn>
            </router-link>
          </div>

          <b-form-group :label="formContent.nameContent.label" v-show="formContent.nameContent.show">
            <b-form-input v-model="formContent.nameContent.value" :type="formContent.nameContent.type" :placeholder="formContent.nameContent.placeholder" @keypress.native="validateText($event,formContent.nameContent.validateType)" :state="formContent.nameContent.state" />
            <!-- {{formContent.nameContent.validateType}} -->
          </b-form-group>

          <b-form-group :label="formContent.idCategory.label" v-show="formContent.idCategory.show">
            <b-form-select v-model="formContent.idCategory.value" :options="optionsCategory" @change="onChangeCbbIdCategory()" :state="formContent.idCategory.state" :disabled="formContent.idCategory.disabled" />
          </b-form-group>

          <b-form-group :label="formContent.imageContent.label" v-show="formContent.imageContent.show">
            <div v-show="status == 'update'" style="width: 100%;" align="center">
              <img :src="setShowImageContent(formContent.imageContent.value)" alt="" style="max-height: 400px;">
            </div>
            <br>
            <b-form-file v-model="formContent.imageContent.value" :placeholder="formContent.imageContent.placeholder" :accept="formContent.imageContent.accept" :state="formContent.imageContent.state" />
          </b-form-group>

          <b-form-group :label="formContent.urlContent.label" v-show="formContent.urlContent.show">
            <!-- <b-form-input v-model="formContent.urlContent.value" :type="formContent.urlContent.type" :placeholder="formContent.urlContent.placeholder" @keypress.native="validateText($event,formContent.urlContent.validateType)" /> -->
            <table style="width: 100%" v-if="formContent.urlContent.status == 'update'">
              <tr>
                <td class="td-in-form">
                  <b-form-input v-model="formContent.urlContent.value" :type="formContent.urlContent.type" :placeholder="formContent.urlContent.placeholder" :disabled="formContent.urlContent.disabled" :state="formContent.urlContent.state" @blur="validateUrl($event ,formContent.urlContent)" />
                </td>
                <td style="width: 30px;" align="right">
                  <font-awesome-icon :icon="['fas','eye']" class="font-icon" />
                </td>
              </tr>
            </table>

            <b-form-input v-else v-model="formContent.urlContent.value" :type="formContent.urlContent.type" :placeholder="formContent.urlContent.placeholder" :disabled="formContent.urlContent.disabled" :state="formContent.urlContent.state" @blur="validateUrl($event ,formContent.urlContent)" />

          </b-form-group>

          <b-form-group :label="formContent.fileEbookContent.label" v-show="formContent.fileEbookContent.show">
            <b-form-file ref="fileEbookContent" v-model="formContent.fileEbookContent.value" :placeholder="formContent.fileEbookContent.placeholder" :state="formContent.fileEbookContent.state" :disabled="formContent.fileEbookContent.disabled" />
          </b-form-group>

          <b-form-group :label="formContent.scriptContent.label" v-show="formContent.scriptContent.show">
            <b-form-input v-model="formContent.scriptContent.value" :type="formContent.scriptContent.type" :placeholder="formContent.scriptContent.placeholder" @keypress.native="validateText($event,formContent.scriptContent.validateType)" :state="formContent.scriptContent.state" />
          </b-form-group>

          <b-form-group :label="formContent.detailContent.label" v-show="formContent.detailContent.show">
            <ckeditor type="classic" v-model="formContent.detailContent.value" :upload-adapter="UploadAdapter" id="ck-create-update-content" :state="formContent.detailContent.state"></ckeditor>
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
var TAG = "[/page/Content/CreateUpdateContent/CreateUpdateContent.vue] => ";

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
      status: "create",
      formContent: {
        nameContent: {
          id: "txtNameContent",
          value: "",
          type: "text",
          label: "ชื่อเนื้อหา",
          placeholder: "ชื่อของเนื้อหา",
          allowBlank: false,
          disabled: false,
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
          disabled: false,
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
          disabled: false,
          readOnly: false,
          show: true,
          state: null
        },
        urlContent: {
          id: "txtUrlContent",
          value: null,
          type: "text",
          label: "URL วิดีโอ",
          placeholder: "URL วิดีโอ",
          allowBlank: true,
          disabled: true,
          readOnly: false,
          show: true,
          validateType: rs(validateUtil.REGEX.TEXT_URL),
          state: null
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
          disabled: false,
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
          disabled: false,
          readOnly: false,
          show: true,
          state: null
        }
      },
      optionsCategory: globalUtil.VARIABLES.CATEGORY,
      pageName: "จัดการเนื้อหาของท่าน / เพิ่มข้อมูลเนื้อหา",
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
    clickBtnAdd() {
      // this.$nextTick(() => {
      var valueForm = dataUtil.getValuesForm(this.formContent);

      var validateForm = validateUtil.validateForm(this.formContent);

      var checkImageContent = true;
      if (this.formContent.imageContent.value == null) {
        checkImageContent = false;
        this.formContent.imageContent.state = false;
      } else {
        this.formContent.imageContent.state = null;
      }

      var checkEbook = true;

      if (this.formContent.fileEbookContent.value == null) {
        if (this.formContent.fileEbookContent.disabled) {
          checkEbook = true;
          this.formContent.fileEbookContent.state = null;
        } else {
          checkEbook = false;
          this.formContent.fileEbookContent.state = false;
        }
      } else {
        checkEbook = true;
        this.formContent.fileEbookContent.state = null;
      }

      if (validateForm && checkImageContent && checkEbook) {
        if (validateForm.idCategory == "4") {
          uiUtil.bus.post(
            constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
            this.requestUploadEBook,
            function() {},
            globalUtil.VARIABLES.MSG_CONFIRM.MSG_CONFIRM_ADD_CONTENT,
            globalUtil.VARIABLES.MSG_CONFIRM_HEADER.MSG_CONFIRM_ADD_CONTENT
          );
        } else {
          uiUtil.bus.post(
            constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
            this.requestAddContentByIdMember,
            function() {},
            globalUtil.VARIABLES.MSG_CONFIRM.MSG_CONFIRM_ADD_CONTENT,
            globalUtil.VARIABLES.MSG_CONFIRM_HEADER.MSG_CONFIRM_ADD_CONTENT
          );
        }
      } else {
        console.log(checkEbook);

        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_ALERT_DIALOG,
          globalUtil.VARIABLES.MSG_ERROR.COMMON.MSG_REQUIRED
        );
      }
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
    requestAddContentByIdMember(fileEbookContent) {
      if (fileEbookContent == undefined || fileEbookContent == null) {
        fileEbookContent = "";
      }
      console.log(
        TAG + "requestAddContentByIdMember start",
        globalUtil.SERVICES.CONTENT.URL_ADD_CONTENT_BY_ID_MEMBER
      );

      let valueformContent = dataUtil.getValuesForm(this.formContent);

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      const body = new FormData();
      body.append("imageContent", this.formContent.imageContent.value);

      body.append(
        "requestBody",
        JSON.stringify({
          ...valueformContent,
          idMember: this.$store.getters.getMemberData.idMember,
          fileEbookContent: fileEbookContent
        })
      );

      const call = apiUtil.callService.doPostFormData(
        globalUtil.SERVICES.CONTENT.URL_ADD_CONTENT_BY_ID_MEMBER,
        body
      );

      apiUtil.callService.validateResponse(
        call,
        function(response) {
          console.log(TAG + "requestAddContentByIdMember success");
          // process after validateResponse
          this.$router.push("/Content");
          // end process after validateResponse
        }.bind(this)
      );
    },
    requestUploadEBook() {
      console.log(
        TAG + "requestUploadEBook start",
        globalUtil.SERVICES.CONTENT.URL_UPLOAD_EBOOK_CONTENT
      );

      let valueformContent = dataUtil.getValuesForm(this.formContent);

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      const body = new FormData();
      console.log("fileEBookContent => ", this.$refs.fileEbookContent);
      body.append("fileEBookContent", this.$refs.fileEbookContent.selectedFile);

      const call = apiUtil.callService.doPostFormData(
        globalUtil.SERVICES.CONTENT.URL_UPLOAD_EBOOK_CONTENT,
        body
      );

      apiUtil.callService.validateResponse(
        call,
        function(response) {
          console.log(TAG + "requestAddContentByIdMember success");
          // process after validateResponse
          this.requestAddContentByIdMember(response.resultData);
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
    if (memberData == null && memberData.roleMember == "member") {
      this.$router.push("/");
    } else {
      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      if (this.$route.params.DataForViewContent) {
        this.status = "update";

        console.log(
          TAG + "CREATE() => , this.formContent.idCategory => ",
          this.formContent.idCategory
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
          DataForViewContent.fileEbookContent;
        this.formContent.scriptContent.value = DataForViewContent.scriptContent;
        this.formContent.detailContent.value = DataForViewContent.detailContent;

        this.onChangeCbbIdCategory();
      } else {
        this.status = "create";
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
