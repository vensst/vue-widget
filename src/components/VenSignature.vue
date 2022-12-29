<!--
 * @Name: VenSignature
 * @Description: VenSignature.vue
 * @Date: 2022/12/27 13:21
 * @Author: yf_hu
 * @LastEditors: yf_hu
 * @LastEditTime: 2022/12/27 13:21
-->
<template>
  <div class="ven-signature">
    <div class="canvas-box" ref="canvasBoxRef">
      <canvas ref="signatureCanvasRef"></canvas>
    </div>
    <div class="button-group">
      <button class="button" @click="cancel">重签</button>
      <button class="button" @click="save">保存</button>
    </div>
  </div>
</template>
<script>
import { isFunction } from "@vensst/js-toolkit";

const config = {
  lineWidth: 4, // 线宽
  strokeStyle: "#000000", // 线条颜色
  lineCap: "round", // 设置线条两端圆角
  lineJoin: "round" // 线条交汇处圆角
};
export default {
  name: "VenSignature",
  components: {},
  mixins: [],
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mobileStatus: false,
      canvas: null,
      client: {
        offsetX: 0, // 偏移量
        offsetY: 0,
        endX: 0, // 坐标
        endY: 0
      },
      ctx: null
    };
  },
  computed: {
    config() {
      return {
        ...config,
        ...this.options
      };
    }
  },
  watch: {},
  created() {
    // 判断是否为移动端
    this.mobileStatus = /Mobile|Android|iPhone/i.test(navigator.userAgent);
  },
  mounted() {
    this.init();
  },
  //销毁之前
  beforeDestroy() {
    window.removeEventListener(
      this.mobileStatus ? "touchstart" : "mousedown",
      this.initCanvas
    );
    // 创建鼠标/手势 弹起/离开 监听器
    window.removeEventListener(
      this.mobileStatus ? "touchend" : "mouseup",
      this.cloaseDraw
    );
  },
  methods: {
    init() {
      // 获取canvas 实例
      this.canvas = this.$refs.signatureCanvasRef;
      // 设置宽高
      this.canvas.width = this.$refs.canvasBoxRef.clientWidth - 2;
      this.canvas.height = this.$refs.canvasBoxRef.clientHeight - 2;
      // 设置一个边框
      this.canvas.style.border = "1px solid #000";
      // 创建上下文
      this.ctx = this.canvas.getContext("2d");

      // 设置填充背景色
      this.ctx.fillStyle = "transparent";
      // 绘制填充矩形
      this.ctx.fillRect(
        0, // x 轴起始绘制位置
        0, // y 轴起始绘制位置
        this.config.width, // 宽度
        this.config.height // 高度
      );

      // 创建鼠标/手势按下监听器
      window.addEventListener(
        this.mobileStatus ? "touchstart" : "mousedown",
        this.initCanvas
      );
      // 创建鼠标/手势 弹起/离开 监听器
      window.addEventListener(
        this.mobileStatus ? "touchend" : "mouseup",
        this.cloaseDraw
      );
    },
    //初始化
    initCanvas(event) {
      // 获取偏移量及坐标
      const { offsetX, offsetY, pageX, pageY } = this.mobileStatus
        ? event.changedTouches[0]
        : event;

      // 修改上次的偏移量及坐标
      this.client.offsetX = offsetX;
      this.client.offsetY = offsetY;
      this.client.endX = pageX;
      this.client.endY = pageY;

      // 清除以上一次 beginPath 之后的所有路径，进行绘制
      this.ctx.beginPath();
      // 根据配置文件设置相应配置
      this.ctx.lineWidth = this.config.lineWidth;
      this.ctx.strokeStyle = this.config.strokeStyle;
      this.ctx.lineCap = this.config.lineCap;
      this.ctx.lineJoin = this.config.lineJoin;
      // 设置画线起始点位
      this.ctx.moveTo(this.client.endX, this.client.endY);
      // 监听 鼠标移动或手势移动
      window.addEventListener(
        this.mobileStatus ? "touchmove" : "mousemove",
        this.draw
      );
    },
    // 绘制
    draw(event) {
      // 获取当前坐标点位
      const { pageX, pageY } = this.mobileStatus
        ? event.changedTouches[0]
        : event;
      // 修改最后一次绘制的坐标点
      this.client.endX = pageX;
      this.client.endY = pageY;

      // 根据坐标点位移动添加线条
      this.ctx.lineTo(pageX, pageY);

      // 绘制
      this.ctx.stroke();
    },
    // 结束绘制
    cloaseDraw() {
      // 结束绘制
      this.ctx.closePath();
      // 移除鼠标移动或手势移动监听器
      window.removeEventListener("mousemove", this.draw);
    },

    // 取消-清空画布
    cancel() {
      // 清空当前画布上的所有绘制内容
      this.ctx.clearRect(
        0,
        0,
        this.$refs.canvasBoxRef.clientWidth - 2,
        this.$refs.canvasBoxRef.clientHeight - 2
      );
    },
    // 保存-将画布内容保存为图片
    save() {
      if (isFunction(this.options.saveCallback)) {
        this.canvas.toBlob((blob) => {
          this.options.saveCallback({ blob, canvas: this.canvas });
        });
      } else {
        // 将canvas上的内容转成blob流
        this.canvas.toBlob((blob) => {
          // 获取当前时间并转成字符串，用来当做文件名
          const date = Date.now().toString();
          // 创建一个 a 标签
          const a = document.createElement("a");
          // 设置 a 标签的下载文件名
          a.download = `${date}.png`;
          // 设置 a 标签的跳转路径为 文件流地址
          a.href = URL.createObjectURL(blob);
          // 手动触发 a 标签的点击事件
          a.click();
          // 移除 a 标签
          a.remove();
        });
      }
    }
  }
};
</script>
<style scoped>
.ven-signature {
  width: 100%;
  height: 100%;
}

.canvas-box {
  height: calc(100% - 42px);
}

.button-group {
  text-align: right;
  height: 42px;
  line-height: 42px;
}

.button-group button {
  margin-left: 8px;
  cursor: pointer;
}
</style>
