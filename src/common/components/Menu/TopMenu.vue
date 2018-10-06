<template>
  <div class="top-menu">
    <div class="menu-title">
      <div class="menu-top">
        {{header}}
      </div>
      <div class="menu-bottom">
        {{pageName}}
      </div>
    </div>
    <div class="right-text text-welcome">
      Welcome {{user}} &nbsp; | &nbsp; Version {{version}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageName: String,
    headerName: String
  },
  data() {
    return {
      user: "",
      version: "",
      header: "BOT Manager"
    };
  },
  created() {
    this.user = _.isEmpty(sessionStorage.getItem("bm_uidKey"))
      ? "admin"
      : JSON.parse(sessionStorage.getItem("bm_uidKey"));
    this.version = _.isEmpty(sessionStorage.getItem("bm_ui_versionId"))
      ? "0.0.0.1"
      : JSON.parse(sessionStorage.getItem("bm_ui_versionId"));
    this.header = this.headerName;
  }
};
</script>

<style scoped>
* {
  font-family: 'Roboto' , sans-serif;
  font-size: 14px;
}
.text-welcome{
  font-size: 14px !important;
}
.top-menu {
  z-index: 2;
  position: fixed;
  width: 100%;
  height: 70px;
  padding: 0px 20px;
  right: auto;
  left: 0px;
  top: 0px;
  margin: 0px;
  background: #7d7d7d;
  /* font-weight: 600; */
  color: #001577;
}
.right-text {
  position: absolute;
  bottom: 5px;
  right: 20px;
  font-weight: 500;
  font-size: 17px;
  color: #fff;
}
.menu-title {
  margin-left: 90px;
  /* padding-left: 90px; */
}
.menu-top {
  font-weight: bold;
  color: #001577;
  font-size: 25px;
  height: 35px;
}
.menu-bottom {
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}
</style>
