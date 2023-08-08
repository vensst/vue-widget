<template>
  <div class="">
    <img
      v-lazy="
        'http://bpic.588ku.com/element_origin_min_pic/16/10/29/2ac8e99273bc079e40a8dc079ca11b1f.jpg'
      "
      width="200px;"
      height="200px"
    />
    <img v-lazy="'../assets/images/test.jpeg'" width="200px;" height="200px" />
    <img src="../assets/images/test.jpeg" width="200px;" height="200px" />
    <img src="../assets/images/error.jpg" width="200px;" height="200px" />
    <img src="../assets/images/loading.gif" width="200px;" height="200px" />
  </div>
</template>
<script>
export default {
  name: "Lazy",
  title: "图片懒加载",
  mixins: [],
  components: {},
  props: {},
  directives: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},

  mounted() {},

  methods: {},
};
</script>
<style scoped></style>
