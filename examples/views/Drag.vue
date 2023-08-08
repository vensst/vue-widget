<template>
  <div class="">
    <VenDrag class="avatar" style="left: 25%"> 拖拽(有边界) </VenDrag>
    <VenDrag class="avatar" :isDrag="false" style="left: 50%">
      禁止拖拽
    </VenDrag>
    <VenDrag class="avatar" :isRange="false" style="left: 75%">
      拖拽(无边界)
    </VenDrag>

    <div class="avatar" v-drag="{ isRange: true }">v-drag指令</div>
  </div>
</template>
<script>
export default {
  name: "Drag",
  title: "拖拽",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    clickEvent(e) {
      console.log(e);
    },
  },
};
</script>
<style scoped>
.avatar {
  width: 60px;
  height: 60px;
  text-align: center;
  border-radius: 50%;
  background: #ddd;
}
</style>
