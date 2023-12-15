<!--
 * @Name: Empty.vue
 * @Description: 空
 * @Date: 2023/11/20 17:02
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/11/20 17:02
-->
<template>
  <div class="empty" :style="{ height, minHeight }">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>

<script>
export default {
  name: "Empty",
  props: {
    text: {
      type: String,
      default: "暂无数据",
    },
    height: {
      type: String,
      default: "100%",
    },
    minHeight: {
      type: String,
      default: "320px",
    },
  },
};
</script>

<style scoped>
.empty {
  height: 100%;
  min-height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
}
</style>
