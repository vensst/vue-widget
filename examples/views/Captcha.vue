<template>
  <div class="">
    <VenCaptcha type="ordinary" @change="onChange"></VenCaptcha>
    <VenCaptcha type="slide" @change="onChange"></VenCaptcha>
  </div>
</template>
<script>
export default {
  name: "Captcha",
  title: "验证码",
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
    onChange(e) {
      console.log(e);
    },
  },
};
</script>
