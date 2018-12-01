<template>
  <div class="top-menu">
    <div class="menu-title">
      <!-- <div class="menu-top">
        <div class="right-text text-welcome">
          <router-link :to="'./ChangePassword'" v-b-tooltip.hover title="จัดการโปรไฟล์">
            <font-awesome-icon :icon="['fas','user']" class="font-icon" /> name lastname
          </router-link>

          <router-link :to="'./ChangePassword'" v-b-tooltip.hover title="ออกจากระบบ">
            <font-awesome-icon :icon="['fas','sign-out-alt']" class="font-icon" @click.stop.prevent="onClickBtnLogout" /> ออกจากระบบ
          </router-link>

        </div>
      </div> -->
      <table style="width: 100%; height:100%;">
        <tr style="width: 100%; height:100%;">
          <td style="width: 40px;" align="left">
            <img
              src="https://via.placeholder.com/120x120?text=Logo"
              style="width: 40px;"
            >
          </td>
          <td
            class="menu-bottom"
          >
            {{pageName}}
          </td>
          <td
            style="width: 30%; text-align: right;"
            class="text-welcome"
          >
              <font-awesome-icon
                :icon="['fas','user']"
                class="font-icon"
              />
              <span class="text-link">{{user}}</span>
            <router-link :to="'/Logout'">
              <font-awesome-icon
                :icon="['fas','sign-out-alt']"
                class="font-icon"
                @click.stop.prevent="onClickBtnLogout"
              />
              <span>ออกจากระบบ</span>
            </router-link>
          </td>
        </tr>
      </table>

    </div>
    <!-- <div class="right-text text-welcome">
      Welcome {{user}} &nbsp; | &nbsp; Version {{version}}
    </div> -->
  </div>
</template>

<script>

import "./custom.scss";

export default {
  props: {
    pageName: String,
    headerName: String
  },
  data() {
    return {
      user: "",
      version: "",
      header: ""
    };
  },
  created() {
    let memberData = this.$store.getters.getMemberData;
    this.user = memberData.nameMember;
    this.header = this.headerName;
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
.text-welcome a {
  text-decoration: none !important;
  color: white;
}

span.text-link {
  text-decoration: none !important;
  color: #ffffff;
}
.font-icon {
  margin-left: 10px;
  font-size: 20px !important;
  color: white;
  text-decoration: none !important;
}
.text-welcome {
  font-size: 14px !important;
}
.top-menu {
  z-index: 66;
  position: fixed;
  width: 100%;
  height: 70px;
  padding: 0px 5px;
  right: auto;
  left: 0px;
  top: 0px;
  margin: 0px;
  background: #000d46;
  /* font-weight: 600; */
  color: #000d46;
}
.right-text {
  position: absolute;
  bottom: 5px;
  right: 0px;
  font-weight: 500;
  font-size: 17px;
  color: #fff;
}
.menu-title {
  margin-left: 0px;
  height: 100%;
  /* padding-left: 90px; */
}
.menu-top {
  font-weight: bold;
  color: #000d46;
  font-size: 25px;
  height: 35px;
}
.menu-bottom {
  padding-left: 15px;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}
</style>
