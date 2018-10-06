<template>
    <div>
<div class="box-content">
            <span class="welcome-text">Welcome</span>
            <img src="../../assets/images/logoDMA.png" class="dma-icon"> 
             <br> <br>
            <span class="big-text">Dynamic Mobile Application Manager</span>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.box-content {
  color: #000;
  padding: 20px;
  font-weight: 800;
}
.welcome-text {
  font-size: 40px;
  width: 100vh;
  padding-left : 200px;
}
.big-text {
  font-size: 55px;
}
.dma-icon {
  width: 70px;
  padding-top : -20px;
}
</style>