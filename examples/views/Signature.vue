<!--
 * @Name: SignaturePad.vue
 * @Description: 电子签名
 * @Date: 2023/8/5 22:22
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/8/5 22:22
-->
<template>
  <div>
    <VenSignature @save-click="saveImage"></VenSignature>
  </div>
</template>

<script>
export default {
  name: "Signature",
  title: "电子签名",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    saveImage(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped></style>
