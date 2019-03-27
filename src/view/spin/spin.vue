<template>
  <div>
    <Spin fix v-if="toggleSpin">
      <Icon type="ios-loading" size="30" class="demo-spin-icon-load"></Icon>
    </Spin>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggleSpin: false
    };
  }
};
</script>


<style scoped>
.ivu-spin-fix {
  z-index: 999999;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
  z-index: 999999;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>