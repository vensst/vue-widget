<template>
  <div
    class="ven-captcha-slide"
    :style="{
      width: width + 'px',
      height: height + 'px',
      lineHeight: height + 'px',
    }"
  >
    <div
      class="ven-captcha-slide__bg"
      :style="{ background: '#7ac23c', width: 0, height: height + 'px' }"
    ></div>
    <div class="ven-captcha-slide__text">{{ text }}</div>
    <div
      :class="[
        'ven-captcha-slide__btn',
        isOk ? 'ven-captcha-slide__btn--success' : '',
      ]"
      :style="{ width: btnWidth + 'px', height: height + 'px' }"
    ></div>
  </div>
</template>
<script>
/**
 * @name: VenCaptchaSlide
 * @author: yfhu
 * @date: 2021/8/26 13:12
 * @description：VenCaptchaSlide.vue
 * @update: 2021/8/26 13:12
 */
export default {
  name: "VenCaptchaSlide",
  mixins: [],
  components: {},
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 32,
    },
    btnWidth: {
      type: Number,
      default: 34,
    },
  },
  directives: {},
  data() {
    return {
      text: "拖动滑块验证",
      isOk: false,
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.initEvent();
  },
  methods: {
    initEvent() {
      let el = document.querySelector(".ven-captcha-slide__btn");
      let boxEl = document.querySelector(".ven-captcha-slide");
      let bgEl = document.querySelector(".ven-captcha-slide__bg");
      //元素宽高
      const { offsetWidth } = el;
      const { clientWidth } = boxEl;
      let maxClientWidth = clientWidth - offsetWidth; //最大可移动宽度
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
      let mouseToELDistanceX;
      el[start] = (e) => {
        if (this.isOk) return;
        let touch;
        if (e.touches) {
          touch = e.touches[0];
        } else {
          touch = e;
        }
        //计算出鼠标到元素左上角距离
        mouseToELDistanceX = touch.clientX - el.offsetLeft;
        document[move] = (e) => {
          let touch;
          if (e.touches) {
            touch = e.touches[0];
          } else {
            touch = e;
          }
          //鼠标的位置-鼠标到元素左上角距离=元素的左上角位置
          let left = touch.clientX - mouseToELDistanceX;
          //判断是否到边界
          if (left < 0) {
            left = 0;
          } else if (left > maxClientWidth) {
            left = maxClientWidth;
          }

          bgEl.style.width = left + "px";
          el.style.left = left + "px";
          //滑动背景宽度+元素宽度=容器宽度说明滑到底了
          if (left + offsetWidth >= this.width) {
            this.isOk = true;
            this.text = "验证通过";
            this.$emit("getVal", this.isOk);
          }
        };
        document[end] = () => {
          if (!this.isOk) {
            bgEl.style.width = 0;
            el.style.left = 0;
            this.$emit("getVal", this.isOk);
          }
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
.ven-captcha-slide {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  background: #ddd;
}
.ven-captcha-slide__bg {
  position: absolute;
}
.ven-captcha-slide__text {
  position: absolute;
  width: 100%;
  font-size: 16px;
  user-select: none;
}
.ven-captcha-slide__btn {
  cursor: move;
  position: absolute;
  border: 1px solid #ddd;
  left: 0;
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==")
    no-repeat center;
}
.ven-captcha-slide__btn--success {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==")
    no-repeat center;
}
</style>
