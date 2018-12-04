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
          <div
            style="width: 100%;"
            align="center"
          >
            <span
              v-show="status == 'update' && activeStatus != '1'"
              class="span-wait-confirm"
            >
              เนื้อหานี้ยังไม่ได้รับการอนุมัติจากผู้ดูแลระบบ <br />ต้องได้รับอนุมัติการเพิ่มข้อมูล จากผู้ดูแลระบบก่อน จึงจะสามารถแก้ไขข้อมูลได้
            </span>
          </div>
          <div align="right">
            <b-btn
              v-show="status == 'create'"
              class="blue"
              @click="clickBtnAdd()"
            >
              <font-awesome-icon :icon="['fas','plus-circle']" />
              เพิ่ม
            </b-btn>
            <b-btn
              v-show="status == 'update' && activeStatus == '1'"
              class="blue"
              @click="clickBtnUpdate()"
            >
              <font-awesome-icon :icon="['fas','pencil-alt']" />
              แก้ไข
            </b-btn>
            <router-link :to="'/Content/'">
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
              @change="onChangeCbbIdCategory()"
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
            <br>
            <b-form-file
              v-model="formContent.imageContent.value"
              :placeholder="formContent.imageContent.placeholder"
              :accept="formContent.imageContent.accept"
              :state="formContent.imageContent.state"
            />
          </b-form-group>

          <!-- <b-form-group :label="formContent.urlContent.label" v-show="formContent.urlContent.show">
            <b-form-input v-model="formContent.urlContent.value" :type="formContent.urlContent.type" :placeholder="formContent.urlContent.placeholder" @keypress.native="validateText($event,formContent.urlContent.validateType)" />
            <table style="width: 100%" v-if="formContent.urlContent.status == 'update'">
              <tr>
                <td class="td-in-form">
                  <b-form-input v-model="formContent.urlContent.value" :type="formContent.urlContent.type" :placeholder="formContent.urlContent.placeholder" :disabled="formContent.urlContent.disabled" :state="formContent.urlContent.state" />
                </td>
                <td style="width: 30px;" align="right">
                  <font-awesome-icon :icon="['fas','eye']" class="font-icon" />
                </td>
              </tr>
            </table>

            <b-form-input v-else v-model="formContent.urlContent.value" :type="formContent.urlContent.type" :placeholder="formContent.urlContent.placeholder" :disabled="formContent.urlContent.disabled" :state="formContent.urlContent.state" @blur="validateUrl($event ,formContent.urlContent)" />

          </b-form-group> -->

          <b-form-group
            :label="formContent.urlContent.label"
            v-show="formContent.urlContent.show"
          >
            <a
              v-if="status == 'update' && (formContent.idCategory.value == '1' || formContent.idCategory.value == '7' || formContent.idCategory.value == '8') "
              target="_blank"
              :href="setShowFileVideoContent(formContent.urlContent.fileName)"
            >ดาวน์โหลด {{formContent.urlContent.label}} ที่เคยบันทึกไว้</a>

            <b-form-file
              ref="urlContent"
              v-model="formContent.urlContent.value"
              :placeholder="formContent.urlContent.placeholder"
              :state="formContent.urlContent.state"
              :disabled="formContent.urlContent.disabled"
            />

          </b-form-group>

          <b-form-group
            :label="formContent.fileEbookContent.label"
            v-show="formContent.fileEbookContent.show"
          >

            <a
              v-if="status == 'update' && formContent.idCategory.value == '4'"
              target="_blank"
              :href="setShowFileEbookContent(formContent.fileEbookContent.fileName)"
            >ดาวน์โหลด {{formContent.fileEbookContent.label}} ที่เคยบันทึกไว้</a>

            <b-form-file
              ref="fileEbookContent"
              v-model="formContent.fileEbookContent.value"
              :placeholder="formContent.fileEbookContent.placeholder"
              :state="formContent.fileEbookContent.state"
              :disabled="formContent.fileEbookContent.disabled"
            />

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
              :readonly="setReadOlnyCkeditor"
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
      idContent: NaN,
      activeStatus: 0,
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
          label: "ไฟล์ E-Book",
          placeholder: "เลือกไฟล์ E-Book",
          allowBlank: true,
          disabled: true,
          readOnly: false,
          show: true,
          state: null,
          fileName: ""
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
      pageName: "จัดการเนื้อหา / เพิ่มข้อมูลเนื้อหา",
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
  computed: {
    setReadOlnyCkeditor() {
      if (this.status == "create") {
        return false;
      } else {
        if (this.status == "update" && this.activeStatus == "1") {
          return false;
        } else {
          return true;
        }
      }
    }
  },
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
    clickBtnUpdate() {
      var valueForm = dataUtil.getValuesForm(this.formContent);

      var validateForm = validateUtil.validateForm(this.formContent);
      if (validateForm) {
        var callBackFn = function() {
          if (
            valueForm.idCategory == "4" &&
            this.$refs.fileEbookContent.selectedFile != null
          ) {
            this.requestUploadEBook();
          } else if (
            (valueForm.idCategory == "1" ||
              valueForm.idCategory == "7" ||
              valueForm.idCategory == "8") &&
            this.$refs.urlContent.selectedFile != null
          ) {
            this.requestUploadVideo();
          } else {
            this.requestEditContentByIdMember();
          }
        }.bind(this);
        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
          callBackFn,
          function() {},
          globalUtil.VARIABLES.MSG_CONFIRM.MSG_CONFIRM_EDIT_CONTENT,
          globalUtil.VARIABLES.MSG_CONFIRM_HEADER.MSG_CONFIRM_ADD_CONTENT
        );
      } else {
        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_ALERT_DIALOG,
          globalUtil.VARIABLES.MSG_ERROR.COMMON.MSG_REQUIRED
        );
      }
    },
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

      var checkVideo = true;
      if (this.formContent.urlContent.value == null) {
        if (this.formContent.urlContent.disabled) {
          checkVideo = true;
          this.formContent.urlContent.state = null;
        } else {
          checkVideo = false;
          this.formContent.urlContent.state = false;
        }
      } else {
        checkVideo = true;
        this.formContent.urlContent.state = null;
      }

      if (validateForm && checkImageContent && checkEbook && checkVideo) {
        var callBackFn = function() {
          if (this.formContent.idCategory.value == "4") {
            this.requestUploadEBook();
          } else if (
            this.formContent.idCategory.value == "1" ||
            this.formContent.idCategory.value == "7" ||
            this.formContent.idCategory.value == "8"
          ) {
            this.requestUploadVideo();
          } else {
            this.requestAddContentByIdMember();
          }
        }.bind(this);
        uiUtil.bus.post(
          constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
          callBackFn,
          function() {},
          globalUtil.VARIABLES.MSG_CONFIRM.MSG_CONFIRM_ADD_CONTENT,
          globalUtil.VARIABLES.MSG_CONFIRM_HEADER.MSG_CONFIRM_ADD_CONTENT
        );
      } else {
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
    requestEditContentByIdMember(file) {
      if (file == undefined || file == null) {
        file = "";
      }
      console.log(
        TAG + "requestEditContentByIdMember start",
        globalUtil.SERVICES.CONTENT.URL_EDIT_CONTENT_BY_ID_MEMBER
      );

      let valueformContent = dataUtil.getValuesForm(this.formContent);

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      const body = new FormData();
      body.append(
        "imageContent",
        typeof this.formContent.imageContent.value == "string" ||
          this.formContent.imageContent.value == null ||
          this.formContent.imageContent.value == undefined
          ? this.$route.params.DataForViewContent.imageContent
          : this.formContent.imageContent.value
      );

      if (this.formContent.idCategory.value == "4") {
        body.append(
          "requestBody",
          JSON.stringify({
            ...valueformContent,
            idContent: this.idContent,
            idMember: this.$store.getters.getMemberData.idMember,
            urlContent: "",
            fileEbookContent:
              file == ""
                ? this.$route.params.DataForViewContent.fileEBookContent
                : file
          })
        );
      } else {
        body.append(
          "requestBody",
          JSON.stringify({
            ...valueformContent,
            idContent: this.idContent,
            idMember: this.$store.getters.getMemberData.idMember,
            urlContent:
              file == ""
                ? this.$route.params.DataForViewContent.urlContent
                : file,
            fileEbookContent: ""
          })
        );
      }

      const call = apiUtil.callService.doPostFormData(
        globalUtil.SERVICES.CONTENT.URL_EDIT_CONTENT_BY_ID_MEMBER,
        body
      );

      apiUtil.callService.validateResponse(
        call,
        function(response) {
          console.log(TAG + "requestEditContentByIdMember success");
          // process after validateResponse
          this.$router.push("/Content");
          // end process after validateResponse
        }.bind(this)
      );
    },
    requestAddContentByIdMember(file) {
      if (file == undefined || file == null) {
        file = "";
      }
      console.log(
        TAG + "requestAddContentByIdMember start",
        globalUtil.SERVICES.CONTENT.URL_ADD_CONTENT_BY_ID_MEMBER
      );

      let valueformContent = dataUtil.getValuesForm(this.formContent);

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      const body = new FormData();
      body.append("imageContent", this.formContent.imageContent.value);

      if (this.formContent.idCategory.value == "4") {
        body.append(
          "requestBody",
          JSON.stringify({
            ...valueformContent,
            idMember: this.$store.getters.getMemberData.idMember,
            urlContent: "",
            fileEbookContent: file
          })
        );
      } else {
        body.append(
          "requestBody",
          JSON.stringify({
            ...valueformContent,
            idMember: this.$store.getters.getMemberData.idMember,
            urlContent: file,
            fileEbookContent: ""
          })
        );
      }

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

      // let valueformContent = dataUtil.getValuesForm(this.formContent);

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
          if (this.status == "create") {
            this.requestAddContentByIdMember(response.resultData);
          } else {
            this.requestEditContentByIdMember(response.resultData);
          }
          // end process after validateResponse
        }.bind(this)
      );
    },
    requestUploadVideo() {
      console.log(
        TAG + "requestUploadVideo start",
        globalUtil.SERVICES.CONTENT.URL_UPLOAD_VIDEO_CONTENT
      );

      // let valueformContent = dataUtil.getValuesForm(this.formContent);

      uiUtil.bus.post(constantUtil.EVENT.COMMMON.GLOBALLOADING);

      const body = new FormData();
      console.log("urlContent => ", this.$refs.urlContent);
      body.append("urlContent", this.$refs.urlContent.selectedFile);

      const call = apiUtil.callService.doPostFormData(
        globalUtil.SERVICES.CONTENT.URL_UPLOAD_VIDEO_CONTENT,
        body
      );

      apiUtil.callService.validateResponse(
        call,
        function(response) {
          console.log(TAG + "requestUploadVideo success");
          // process after validateResponse
          if (this.status == "create") {
            this.requestAddContentByIdMember(response.resultData);
          } else {
            this.requestEditContentByIdMember(response.resultData);
          }
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
    if (memberData == null || memberData.roleMember != "member") {
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
        this.formContent.urlContent.fileName = DataForViewContent.urlContent;
        this.formContent.fileEbookContent.value =
          DataForViewContent.fileEBookContent;
        this.formContent.fileEbookContent.fileName =
          DataForViewContent.fileEBookContent;
        this.formContent.scriptContent.value = DataForViewContent.scriptContent;
        this.formContent.detailContent.value = DataForViewContent.detailContent;

        this.activeStatus = DataForViewContent.activeStatus;

        this.idContent = DataForViewContent.idContent;

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
.content-main {
  padding-top: 80px;
  padding-left: 60px;
}
.span-wait-confirm {
  font-size: 20px;
  color: red;
  text-align: center;
  width: 100%;
}
</style>
