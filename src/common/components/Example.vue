<template>
    <div class="context">
        <dma-leftmenu></dma-leftmenu>
        <dma-topmenu :pageName="'Restore Image'"></dma-topmenu>
        <div class="content">
                
        </div>
        <dma-footer></dma-footer>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.context {
  background: #ebebeb;
  padding-top: 90px;
  padding-left: 120px;
  min-height: 100vh;
  height: 100%;
  width: 100%;
}
div {
  font-size: 20px;
  font-weight: bold;
  font-family: "Cordia New Regular";
}
.content {
  min-height: 87vh;
  height: 100%;
}
@media screen and (max-height: 800px) {
  .content {
    min-height: 80vh;
    height: 100%;
  }
}
</style>