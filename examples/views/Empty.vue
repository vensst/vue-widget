<!--
 * @Name: Empty.vue
 * @Description:
 * @Date: 2023/11/20 17:06
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/11/20 17:06
-->
<template>
  <div style="height: 100vh">
    <Empty></Empty>
  </div>
</template>

<script>
import Empty from "@/components/Empty.vue";
export default {
  title: "空状态",
  components: { Empty },
  props: {},
};
</script>

<style scoped>
.empty {
  min-height: inherit;
}
</style>
