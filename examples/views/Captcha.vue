<template>
  <div class="">
    <VenCaptchaOrdinary
      :options="{
        contentWidth: 120,
        contentHeight: 38,
      }"
      @getCode="getCode"
    ></VenCaptchaOrdinary>
    <VenCaptchaSlide @getVal="getVal"></VenCaptchaSlide>
  </div>
</template>
<script>
/**
 * @name: Captcha
 * @author: yfhu
 * @date: 2021/8/24 11:10
 * @description：Captcha.vue
 * @update: 2021/8/24 11:10
 */
export default {
  name: "Captcha",
  mixins: [],
  components: {},
  props: {},
  directives: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getCode(val){
      console.log(val)
    },
    getVal(val){
      console.log(val)
    }
  },
};
</script>
<style scoped></style>
