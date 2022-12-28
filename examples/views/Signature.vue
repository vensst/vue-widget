<!--
 * @Name: Signature
 * @Description: Signature.vue
 * @Date: 2022/12/27 15:33
 * @Author: yf_hu
 * @LastEditors: yf_hu
 * @LastEditTime: 2022/12/27 15:33
-->
<template>
  <div class="">
    <VenSignature
      :options="{
        saveCallback: saveSignature,
      }"
    ></VenSignature>
  </div>
</template>
<script>
import VenSignature from "../../src/components/VenSignature.vue";
export default {
  name: "Signature",
  components: { VenSignature },
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
    saveSignature(data) {
      console.log(data);
    },
  },
};
</script>
<style scoped></style>
