<template>
  <div class="ven-signature">
    <canvas ref="canvas" :width="_widthUnit" :height="_heightUnit"></canvas>
    <div class="signature-buttons" v-if="isButtonGroup">
      <button class="clear-button" @click="clear">清除</button>
      <button class="undo-button" @click="undo">撤回</button>
      <button class="save-button" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import { isMobile } from "@vensst/js-toolkit";
import { hasUnit } from "~/utils";

const defaultOptions = {
  strokeStyle: "#000", // 线条颜色
  lineWidth: 4, // 线条粗细
  backgroundColor: "#fff", // 画布背景色
  lineCap: "round", // 线条末端形状
};
export default {
  name: "Signature",
  props: {
    width: {
      type: [Number, String],
      default: 375,
    },
    height: {
      type: [Number, String],
      default: 200,
    },
    isButtonGroup: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      canvas: null,
      context: null,
      drawing: false,
      strokes: [],
      recordStroke: [],
      canvasLeft: 0,
      canvasTop: 0,
    };
  },
  computed: {
    newOptions() {
      return { ...defaultOptions, ...this.options };
    },
    _widthUnit() {
      if (hasUnit(this.width)) {
        return this.width;
      } else {
        return this.width + "px";
      }
    },
    _heightUnit() {
      if (hasUnit(this.height)) {
        return this.height;
      } else {
        return this.height + "px";
      }
    },
  },
  created() {},
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");
    this.context.strokeStyle = this.newOptions.strokeStyle;
    this.context.lineWidth = this.newOptions.lineWidth;
    this.context.fillStyle = this.newOptions.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // 获取canvas在页面中的位置
    const { left, top } = this.canvas.getBoundingClientRect();
    this.canvasLeft = left;
    this.canvasTop = top;

    this.init();
  },
  methods: {
    init() {
      const el = this.canvas;
      let start, move, end, cel;
      //判断当前是移动端还是PC，移动端touch，PC端mouse
      if (isMobile()) {
        start = "ontouchstart"; //手指按下
        move = "ontouchmove"; //手指移动
        end = "ontouchend"; //手指放开
        cel = "ontouchcancel"; //系统取消touch事件的时候触发
      } else {
        start = "onmousedown"; //鼠标按下
        move = "onmousemove"; //鼠标移动
        end = "onmouseup"; //鼠标松开
        cel = "onmouseleave"; //鼠标离开
      }
      el[start] = this.startDrawing;
      el[move] = this.draw;
      el[end] = this.stopDrawing;
      el[cel] = this.stopDrawing;
    },
    /**
     * 开始绘制
     * @param event
     */
    startDrawing(event) {
      event.preventDefault();
      if (event.touches) {
        event = event.touches[0];
      }
      this.drawing = true;

      // 计算出鼠标在画布上的坐标
      let left = event.clientX - this.canvasLeft;
      let top = event.clientY - this.canvasTop;

      const { offsetX, offsetY } = { offsetX: left, offsetY: top };

      this.strokes.push({ x: offsetX, y: offsetY });

      this.context.beginPath();
      this.context.moveTo(offsetX, offsetY);
      this.context.lineCap = this.newOptions.lineCap;
      this.context.lineJoin = this.newOptions.lineCap;
    },
    /**
     * 绘制
     * @param event
     */
    draw(event) {
      if (event.touches) {
        event = event.touches[0];
      }
      if (!this.drawing) return;

      // 计算出鼠标在画布上的坐标
      let left = event.clientX - this.canvasLeft;
      let top = event.clientY - this.canvasTop;

      const { offsetX, offsetY } = { offsetX: left, offsetY: top };

      this.strokes.push({ x: offsetX, y: offsetY });
      this.context.lineTo(offsetX, offsetY);
      this.context.stroke();
    },
    /**
     * 停止绘制
     */
    stopDrawing() {
      if (this.drawing) {
        this.recordStroke.push(this.strokes);
        this.strokes = [];
        this.drawing = false;
      }
    },
    /**
     * 清除画布
     */
    clear() {
      this.recordStroke = [];
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.fillStyle = this.newOptions.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    /**
     * 撤回
     */
    undo() {
      this.recordStroke.pop();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.fillStyle = this.newOptions.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.redraw();
    },
    /**
     * 重绘
     */
    redraw() {
      for (let i = 0; i < this.recordStroke.length; i++) {
        const strokes = this.recordStroke[i];
        this.context.beginPath();
        this.context.moveTo(strokes[0].x, strokes[1].y);
        for (let j = 0; j < strokes.length; j++) {
          this.context.lineTo(strokes[j].x, strokes[j].y);
          this.context.stroke();
        }
      }
    },
    /**
     * 保存图片
     */
    save() {
      if (this.$listeners["save-click"]) {
        this.$emit("save-click", this.canvas.toDataURL());
      } else {
        const link = document.createElement("a");
        link.href = this.canvas.toDataURL();
        link.download = new Date().getTime() + "_signature.png";
        link.click();
      }
    },
    /**
     * 获取数据
     */
    getDataURL() {
      return this.canvas.toDataURL();
    },
  },
};
</script>

<style scoped>
.ven-signature {
  box-sizing: border-box;
  display: inline-block;
}

canvas {
  border: 1px solid #ccc;
  cursor: crosshair;
}

.signature-buttons {
  margin-top: 15px;
  text-align: center;
}

button {
  padding: 8px 20px;
  margin-right: 10px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.save-message {
  margin-top: 15px;
  font-size: 14px;
  color: #007bff;
}
</style>
