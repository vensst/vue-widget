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
    <hr>
    <img src="../assets/images/test.jpeg" width="200px;" height="200px" />
    <img src="../assets/images/error.jpg" width="200px;" height="200px" />
    <img src="../assets/images/loading.gif" width="200px;" height="200px" />
  </div>
</template>
<script>
/**
 * @name: Lazy
 * @author: yfhu
 * @date: 2021/9/2 14:48
 * @description：Lazy.vue
 * @update: 2021/9/2 14:48
 */
export default {
  name: "Lazy",
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
