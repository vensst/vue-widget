<!--
 * @Name: index.vue
 * @Description: 登录验证码组件
 * @Date: 2023/8/7 10:35
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/8/7 10:35
-->
<template>
  <Fragment>
    <component
      :is="componentName"
      :options="options"
      @change="(e) => $emit('change', e)"
    ></component>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import CaptchaOrdinary from "./CaptchaOrdinary.vue";
import CaptchaSlide from "./CaptchaSlide.vue";

export default {
  name: "Captcha",
  components: { Fragment, CaptchaOrdinary, CaptchaSlide },
  mixins: [],
  props: {
    type: {
      type: String,
      default: "ordinary", // ordinary：普通、slide：滑动
    },
    options: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    componentName() {
      switch (this.type) {
        case "ordinary":
          return "CaptchaOrdinary";
        case "slide":
          return "CaptchaSlide";
        default:
          return "CaptchaOrdinary";
      }
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
