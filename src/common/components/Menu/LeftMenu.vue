<template>
  <div class="left-menu">
    <!-- <div class="menu-icon">
      <img src="../../../assets/images/menu/logo_botManager.png" class="image-icon" style="width: 50px;">
      <span class="menu-string">Menu</span>
    </div> -->
    <div class="menu-list" style="margin-top: 5px;">

      <!-- <router-link :to="'./Content'" v-b-tooltip.hover title="จัดการเนื้อหาของท่าน">
        <div :class="setMenuActive('Content')">
          <font-awesome-icon :icon="['fas','images']" class="font-icon" />
        </div>
      </router-link> -->

    </div>

    <div class="menu-list menu-bottom">
      <router-link :to="'./ChangePassword'" v-b-tooltip.hover title="จัดการโปรไฟล์">
        <div class="menu-link">
          <font-awesome-icon :icon="['fas','user']" class="font-icon" />
        </div>
      </router-link>

      <div class="menu-link" @click.stop.prevent="onClickBtnLogout" v-b-tooltip.hover title="ออกจากระบบ">
        <font-awesome-icon :icon="['fas','sign-out-alt']" class="font-icon" />
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

export default {
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    setMenuActive(menuName) {
      if (window.location.href.indexOf(menuName) >= 0) {
        return "menu-list-active";
      } else {
        return "menu-list";
      }
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
.left-menu {
  z-index: 3;
  position: fixed;
  width: 50px;
  height: 100vh;
  right: auto;
  left: 0px;
  top: 0px;
  margin: 0px;
  background: #404040;
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

.menu-list-active{
  padding: 10px 5px;
  cursor: pointer;
  transition: 0.25s;
  background: #c2c2c2;
}
</style>
