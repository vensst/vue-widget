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
    <!--<Empty></Empty>-->
    <VenEmpty style="height: 320px"></VenEmpty>
    <VenEmpty style="height: 320px"> 没有数据 </VenEmpty>
  </div>
</template>

<script>
import Empty from "@/components/Empty.vue";
export default {
  title: "空状态",
  // eslint-disable-next-line vue/no-unused-components
  components: { Empty },
  props: {},
};
</script>

<style scoped>
.empty {
  min-height: inherit;
}
</style>
