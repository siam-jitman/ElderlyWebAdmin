<template>
  <div>
    <div class="box-filter">
      <b-row style="padding: 5px;">
        <b-col md="4">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="กรองด้วยชื่อ หรือประเภทของเนื้อหา" class="filter" maxlength="255" />
            <b-input-group-append>
              <b-btn variant="default" :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col align="right">
          <router-link :to="'/Content/CreateUpdateContent'">
            <b-btn class="blue">
              <font-awesome-icon :icon="['fas','plus-circle']" />
              เพิ่ม
            </b-btn>
          </router-link>
          <b-btn class="gray">
            <font-awesome-icon :icon="['fas','minus-circle']" />
            ลบ
          </b-btn>
        </b-col>
      </b-row>
    </div>
    <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" @filtered="onFiltered" :no-sort-reset="true" class="table-ListAdapter table-striped">
      <!-- <template slot="HEAD_checkList" slot-scope="head">
        <input type="checkbox" @click.stop.prevent="clickSeletedAll(head)" v-model="allSelected">
      </template> -->

      <template slot="checkList" slot-scope="data">
        <input type="checkbox" v-show="data.item.activeStatus == 3" v-model="data.item.checkList" @change.stop.prevent="clickCbb(data.item.checkList)">
      </template>

      <template slot="btnViewContent" slot-scope="data">
        <font-awesome-icon :icon="['fas','edit']" class="pointer" @click.stop.prevent="onClickBtnViewContent(data.item)" />
      </template>

      <template slot="idCategory" slot-scope="data">
        <p v-b-tooltip.hover :title="setShowCategory(data.item.idCategory)">{{setShowCategory(data.item.idCategory)}}</p>
        <!-- {{setShowCategory(data.item.idCategory)}} -->
      </template>

      <template slot="activeStatus" slot-scope="data">
        <p v-b-tooltip.hover :title="setShowActiveStatus(data.item.activeStatus)">{{setShowActiveStatus(data.item.activeStatus)}}</p>
        <!-- {{setShowCategory(data.item.idCategory)}} -->
      </template>
      <template slot="createTime" slot-scope="data">
        <!-- <p v-b-tooltip.hover :title="setShowDate(data.item.createTime)">{{setShowDate(data.item.createTime)}}</p> -->
        {{setShowDate(data.item.createTime)}}
      </template>
      <template slot="updateTime" slot-scope="data">
        <!-- <p v-b-tooltip.hover :title="setShowDate(data.item.updateTime)">{{setShowDate(data.item.updateTime)}}</p> -->
        {{setShowDate(data.item.updateTime)}}
      </template>
    </b-table>

    <b-row v-if="totalRows > 0" style="padding: 5px; border: 1px solid #c2c2c2; margin: auto; margin-top: -1px;">
      <b-col cols="8">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col cols="4" align="right" style="font-weight: 600; font-size: 14px; padding-top: 5px;">
        Displaying {{showRowDetail()}} of {{totalRows}}
      </b-col>
    </b-row>

  </div>
</template>

<script>
var TAG = "[/page/Content/ListContent/ListContent.vue] => ";

import apiUtil from "../../../common/apiUtil/index";
import uiUtil from "../../../common/uiUtil/index";
import constantUtil from "../../../common/constantUtil/index";
import globalUtil from "../../../common/globalUtil/index";
import dataUtil from "../../../common/dataUtil/index";
import storageUtil from "../../../common/storageUtil/index";
import validateUtil from "../../../common/validateUtil/index";

import moment from "moment";
moment.locale("th");

import "./custom.scss";

export default {
  props: {},
  data() {
    return {
      category: globalUtil.VARIABLES.CATEGORY,
      activeStatus: globalUtil.VARIABLES.ACTIVE_STATUS,
      start: 0,
      end: 0,
      allSelected: false,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      totalRows: NaN,
      currentPage: 1,
      perPage: 25,
      fields: [
        {
          label: " ",
          key: "checkList",
          class: "td-3 td-center"
        },
        {
          label: " ",
          key: "btnViewContent",
          class: "td-3 td-center"
        },
        {
          label: "ชื่อเนื้อหา",
          key: "nameContent",
          class: "td-32",
          sortable: true
        },
        {
          label: "ประเภทของเนื้อหา",
          key: "idCategory",
          class: "td-20",
          sortable: true
        },
        ,
        {
          label: "วันที่สรา้งข้อมูล",
          key: "createTime",
          class: "td-12 td-center"
        },
        {
          label: "วันที่แก้ไขข้อมูลล่าสุด",
          key: "updateTime",
          class: "td-12 td-center"
        },
        {
          label: "สถานะการแสดงของมูล",
          key: "activeStatus",
          class: "td-13 td-center"
        }
      ],
      items: []
    };
  },
  methods: {
    onClickBtnViewContent(data) {
      this.$router.push({
        name: "CreateUpdateContent",
        params: { DataForViewContent: data }
      });
    },
    clickCbb(value) {
      console.log(TAG + "clickCbb", value);
      if (value == true) {
        value = false;
      } else {
        value = true;
      }
    },
    setShowActiveStatus(activeStatus) {
      for (let i = 0; i < this.activeStatus.length; i++) {
        if (activeStatus == this.activeStatus[i].value) {
          return this.activeStatus[i].text;
        }
      }
    },
    setShowCategory(idCategory) {
      for (let i = 0; i < this.category.length; i++) {
        if (idCategory == this.category[i].value) {
          return this.category[i].text;
        }
      }
    },
    setShowDate(date) {
      return moment(date).format("Do/MM/YYYY, HH:mm");
    },
    showRowDetail() {
      this.start = this.perPage * (this.currentPage - 1) + 1;
      this.end =
        this.perPage * this.currentPage > this.totalRows
          ? this.totalRows
          : this.perPage * this.currentPage;

      return this.start + " - " + this.end;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  created() {
    uiUtil.bus.on(
      constantUtil.EVENT.CONTENT.SET_ITEMS_LIST_CONTENT,
      dataTable => {
        this.items = dataTable;
        // for (let i = 0; i < dataTable.length; i++) {
        //   this.items.push({
        //     _id: dataTable[i].id,
        //     adapterBotName: dataTable[i].adapterBotName,
        //     _hookingApi: dataTable[i].hookingApi,
        //     activeStatus: dataTable[i].activeStatus,
        //     remark: dataTable[i].remark
        //   });
        // }
        this.totalRows = dataTable.length;
        this.sortBy = null;
      }
    );

    this.totalRows = this.items.length;
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
</style>
