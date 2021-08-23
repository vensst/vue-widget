<template>
  <div class="home">
    <VenDrag
      width="100px"
      height="100px"
      right="20px"
      bottom="20px"
      @click="clickEvent"
    ></VenDrag>
  </div>
</template>

<script>
// @ is an alias to /examples

export default {
  name: "Home",
  components: {},
  directives: {
    drag: function (el) {
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
    return {
      positionX: 0,
      positionY: 0,
    };
  },
  mounted() {},
  methods: {
    clickEvent(e) {
      console.log(e);
    },
  },
};
</script>
<style scoped>
.VenDrag {
  width: 60px;
  height: 60px;
  background: burlywood;
  cursor: pointer;
  position: absolute;
}
</style>
