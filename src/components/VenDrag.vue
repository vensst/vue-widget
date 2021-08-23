<template>
  <div
    id="ven-drag"
    class="ven-drag"
    :style="{
      left,
      top,
      bottom,
      right,
      width,
      height,
      borderRadius,
    }"
    @click="$emit('click', $event)"
  >
    <slot>
      <span>{{ title }}</span>
    </slot>
  </div>
</template>
<script>
/**
 * @name: VenDrag
 * @author: yfhu
 * @date: 2021/8/19 14:41
 * @description：VenDrag.vue
 * @update: 2021/8/19 14:41
 */
export default {
  name: "VenDrag",
  mixins: [],
  components: {},
  props: {
    //内容
    title: {
      type: String,
      default: "Ven",
    },
    //是否拖拽
    isDrag: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "60px",
    },
    height: {
      type: String,
      default: "60px",
    },
    left: {
      type: String,
      default: null,
    },
    top: {
      type: String,
      default: null,
    },
    right: {
      type: String,
      default: null,
    },
    bottom: {
      type: String,
      default: null,
    },
    borderRadius: {
      type: String,
      default: null,
    },
    isRange: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (this.isDrag) {
      this.initEvent();
    }
  },
  methods: {
    initEvent() {
      let el = document.getElementById("ven-drag");
      //元素宽高
      const { offsetWidth, offsetHeight } = el;
      const { clientWidth, clientHeight } = document.body;
      let maxClientWidth = clientWidth - offsetWidth; //最大可移动宽度
      let maxClientHeight = clientHeight - offsetHeight; //最大可移动高度
      const mobile = [
        "android",
        "iphone",
        "symbianos",
        "windows phone",
        "ipad",
        "ipod",
      ];
      let agent = window.navigator.userAgent.toLowerCase(),
        start,
        move,
        end;
      //判断当前是移动端还是PC，移动端touch，PC端mouse
      if (mobile.some((i) => agent.indexOf(i) > 0)) {
        start = "ontouchstart"; //手指按下
        move = "ontouchmove"; //手指移动
        end = "ontouchend"; //手指放开
      } else {
        start = "onmousedown"; //鼠标按下
        move = "onmousemove"; //鼠标移动
        end = "onmouseup"; //鼠标松开
      }
      //鼠标点位到元素左上角点位距离
      let mouseToELDistanceX, mouseToELDistanceY;
      el[start] = (e) => {
        let touch;
        if (e.touches) {
          touch = e.touches[0];
        } else {
          touch = e;
        }
        //计算出鼠标到元素左上角距离
        mouseToELDistanceX = touch.clientX - el.offsetLeft;
        mouseToELDistanceY = touch.clientY - el.offsetTop;
        document[move] = (e) => {
          let touch;
          if (e.touches) {
            touch = e.touches[0];
          } else {
            touch = e;
          }
          //鼠标的位置-鼠标到元素左上角距离=元素的左上角位置
          let left = touch.clientX - mouseToELDistanceX;
          let top = touch.clientY - mouseToELDistanceY;
          //判断是否有边界限制
          if (this.isRange) {
            if (left < 0) {
              left = 0;
            } else if (left > maxClientWidth) {
              left = maxClientWidth;
            }
            if (top < 0) {
              top = 0;
            } else if (top > maxClientHeight) {
              top = maxClientHeight;
            }
          }

          el.style.left = left + "px";
          el.style.top = top + "px";
        };
        document[end] = () => {
          document[start] = null;
          document[move] = null;
          document[end] = null;
        };
      };
    },
  },
};
</script>
<style scoped>
.ven-drag {
  position: fixed;
  cursor: pointer;
  background: burlywood;
}
.ven-drag span {
  display: inline-block;
  background: cadetblue;
}
</style>
