<template>
  <div class="">
    <VenDrag
      width="100px"
      height="100px"
      right="20px"
      bottom="20px"
      @click="clickEvent"
    >111</VenDrag>
    <VDrag>移动端</VDrag>
    <div
      v-dragPc
      style="
        width: 100px;
        height: 100px;
        display: inline-block;
        cursor: pointer;
        background: #ddd;
        position: absolute;
      "
    >
      pc端局部指令
    </div>
    <div
      v-drag="{ isRange: false }"
      style="
        width: 100px;
        height: 100px;
        display: inline-block;
        cursor: pointer;
        background: #ddd;
        left: 200px;
      "
    >
      pc/移动端全局指令
    </div>
  </div>
</template>
<script>
/**
 * @name: Drag
 * @author: yfhu
 * @date: 2021/8/24 10:25
 * @description：Drag.vue
 * @update: 2021/8/24 10:25
 */
import Drag from "../components/Drag";
export default {
  name: "Drag",
  mixins: [],
  components: {
    VDrag: Drag,
  },
  props: {},
  directives: {
    dragPc: function (el) {
      let dragBox = el;
      dragBox.onmousedown = (e) => {
        //算出鼠标相对元素的位置
        let disX = e.clientX - dragBox.offsetLeft;
        let disY = e.clientY - dragBox.offsetTop;
        document.onmousemove = (e) => {
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;
          let top = e.clientY - disY;
          //移动当前元素
          dragBox.style.left = left + "px";
          dragBox.style.top = top + "px";
        };
        document.onmouseup = (e) => {
          console.log(e);
          //鼠标弹起来的时候不再移动
          document.onmousemove = null;
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null;
        };
      };
    },
  },
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
<style scoped></style>
