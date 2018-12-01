<template>
  <div class="left-menu">
    <!-- <div class="menu-icon">
      <img src="../../../assets/images/menu/logo_botManager.png" class="image-icon" style="width: 50px;">
      <span class="menu-string">Menu</span>
    </div> -->
    <div
      v-if="memberData.roleMember == 'admin'"
      class="menu-list"
      style="margin-top: 5px;"
    >

      <router-link
        :to="'/ManagementContent'"
        v-b-tooltip.hover
        title="รายการข้อมูลที่รอการอนุมัติ"
      >
        <div :class="setMenuActive(['ManagementContent' , 'ViewContent'])">
          <font-awesome-icon
            :icon="['fas','clipboard-list']"
            class="font-icon"
          />
        </div>
      </router-link>

      <router-link
        :to="'/ManagementContentAll'"
        v-b-tooltip.hover
        title="รายการข้อมูลที่รอการอนุมัติ"
      >
        <div :class="setMenuActive(['ManagementContentAll'])">
          <font-awesome-icon
            :icon="['fas','database']"
            class="font-icon"
          />
        </div>
      </router-link>

    </div>

    <div
      v-if="memberData.roleMember == 'member'"
      class="menu-list"
      style="margin-top: 5px;"
    >

      <router-link
        :to="'/ManagementContent'"
        v-b-tooltip.hover
        title="รายการข้อมูลที่รอการอนุมัติ"
      >
        <div :class="setMenuActive(['Content'])">
          <font-awesome-icon
            :icon="['fas','file-alt']"
            class="font-icon"
          />
        </div>
      </router-link>


    </div>

    <div class="menu-list menu-bottom">
      <router-link
        :to="'./ChangePassword'"
        v-b-tooltip.hover
        title="จัดการโปรไฟล์"
      >
        <div class="menu-link">
          <font-awesome-icon
            :icon="['fas','user']"
            class="font-icon"
          />
        </div>
      </router-link>

      <div
        class="menu-link"
        @click.stop.prevent="onClickBtnLogout"
        v-b-tooltip.hover
        title="ออกจากระบบ"
      >
        <font-awesome-icon
          :icon="['fas','sign-out-alt']"
          class="font-icon"
        />
      </div>
    </div>

  </div>
</template>

<script>
import apiUtil from "../../apiUtil/index";
import uiUtil from "../../uiUtil/index";
import constantUtil from "../../constantUtil/index";
import globalUtil from "../../globalUtil/index";
import dataUtil from "../../dataUtil/index";
import storageUtil from "../../storageUtil/index";
import validateUtil from "../../validateUtil/index";

import "./custom.scss";

export default {
  data() {
    return {
      menuList: []
    };
  },
  computed:{
    memberData(){
      return this.$store.getters.getMemberData;
    }
  },
  methods: {
    setMenuActive(menuName) {
      for (let i = 0; i < menuName.length; i++) {
        if (window.location.href.indexOf(menuName[i]) >= 0) {
          return "menu-list-active";
        }
      }
      return "menu-link";
    },
    showMessage() {
      alert("Hello");
    },
    onClickBtnLogout() {
      // uiUtil.bus.post(
      //   constantUtil.EVENT.SHOW_WINDOW_CONFIRM,
      //   function() {
      //     this.$router.push("./Logout");
      //   },
      //   function() {},
      //   "Do you want to Logout ?",
      //   null,
      //   { color: "#000" }
      // );

      this.$router.push("./Logout");
    }
  },
  created() {
    // sessionStorage.setItem(
    //   "BM_menuLists",
    //   JSON.stringify(this.mockupMenuList)
    // );
    this.menuList = JSON.parse(sessionStorage.getItem("bm_menuLists"));
    // const list = JSON.parse(sessionStorage.getItem("DMA_menuLists"));
    // list.forEach(el => {
    //   let arr = el.menuImage.split("/");
    //   let imageName = arr.pop();
    //   let newObj = _.cloneDeep(el);
    //   newObj.menuImage = imageName;
    //   newObj.menuPath = arr.join("/");
    //   this.menuList.push(newObj);
    // });
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
.font-icon {
  color: #ffffff;
}

.menu-icon {
  padding-top: 10px;
  height: 70px;
  background: #404040;
  vertical-align: middle;
  text-align: center;
}
.image-icon {
  display: block;
  margin: auto;
}
/* span {
  font-size: 20px;
  font-weight: bold;
  font-family: "Cordia New Regular";
} */
.menu-list {
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
}
a {
  text-decoration: none;
}
.left-link {
  color: #ffffff;
}
.menu-link:hover {
  -webkit-transition: 0.25s;
  background: #979797;
}
.menu-list-icon {
  margin-bottom: 10px;
}
.menu-bottom {
  position: absolute;
  bottom: 5px;
  text-align: center;
  width: 100%;
}
.menu-link {
  padding: 10px 5px;
  cursor: pointer;
  transition: 0.25s;
}

.menu-list-active {
  text-align: left;
  padding: 10px 13px;
  cursor: pointer;
  -webkit-transition: 0.25s;
  transition: 0.25s;
  background: #000d46;
  width: 60px;
  border-radius: 0px 20px 20px 0px;
}
</style>
