<!--
 * @Name: index.vue
 * @Description: 空状态
 * @Date: 2024/3/27 14:24
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2024/3/27 14:24
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
    // 空内容文案
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
}
</style>
