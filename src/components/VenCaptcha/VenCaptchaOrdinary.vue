<template>
  <canvas
    id="ven-captcha-ordinary"
    class="ven-captcha-ordinary"
    :width="newOptions.contentWidth?newOptions.contentWidth + 'px':''"
    :height="newOptions.contentHeight?newOptions.contentHeight  + 'px':''"
    @click="init"
  >
  </canvas>
</template>
<script>
/**
 * @name: VenIdentifyCode
 * @author: yfhu
 * @date: 2021/8/24 10:49
 * @description：VenIdentifyCode.vue
 * @update: 2021/8/24 10:49
 */
const defaultOptions = {
  codeStr:
    "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9",
  //验证码位数
  codeNum: 4,
  //宽高
  contentWidth: 112,
  contentHeight: 38,
  //字体 大小范围
  fontSizeMin: 18,
  fontSizeMax: 40,
  //字体颜色取值范围
  colorMin: 50,
  colorMax: 160,
  //背景颜色取值范围
  backgroundColorMin: 180,
  backgroundColorMax: 240,
  //干扰点 数量、颜色范围
  dotNum: 30,
  dotColorMin: 0,
  dotColorMax: 255,
  //干扰线 数量、颜色范围
  lineNum: 10,
  lineColorMin: 40,
  lineColorMax: 180,
};
export default {
  name: "VenCaptchaOrdinary",
  mixins: [],
  components: {},
  props: {
    //配置
    options: {
      type: Object,
      default: function () {
        return defaultOptions;
      },
    },
  },
  directives: {},
  data() {
    return {
      selectCode: "",
      selectCodeArr: [],
    };
  },
  computed: {
    newOptions() {
      let options = JSON.parse(JSON.stringify(defaultOptions));
      return Object.assign(options, this.options);
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getRandomCode();
    },
    drawPic() {
      let canvas = document.getElementById("ven-captcha-ordinary");
      let ctx = canvas.getContext("2d");
      //文本基线
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = this.randomColor(
        this.newOptions.backgroundColorMin,
        this.newOptions.backgroundColorMax
      );
      //绘制“被填充”的矩形
      ctx.fillRect(
        0,
        0,
        this.newOptions.contentWidth,
        this.newOptions.contentHeight
      );
      // 绘制文字
      for (let i = 0; i < this.selectCodeArr.length; i++) {
        this.drawText(ctx, this.selectCodeArr[i], i);
      }
      this.drawLine(ctx);
      this.drawDot(ctx);
    },
    /**
     * 画文案
     */
    drawText(ctx, txt, i) {
      //字体发小
      let fontSize =
        "bold " +
        this.randomNum(
          this.newOptions.fontSizeMin,
          this.newOptions.fontSizeMax
        ) +
        "px SimHei";
      // 文字坐标
      let x =
        (i + 1) *
        (this.newOptions.contentWidth / (this.selectCodeArr.length + 1));
      let y = this.randomNum(
        this.newOptions.fontSizeMax,
        this.newOptions.contentHeight - 5
      );
      let deg = (this.randomNum(-30, 30) * Math.PI) / 180;
      // let x = 10 + i * 20;
      // let y = 20 + Math.random() * 8;
      // let deg = Math.random() - 0.5;
      ctx.fillStyle = this.randomColor(
        this.newOptions.colorMin,
        this.newOptions.colorMax
      );
      ctx.font = fontSize;
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      //计算角度 Math.PI=3.14=180°
      ctx.rotate(deg);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg);
      ctx.translate(-x, -y);
    },
    /**
     * 画干扰线
     */
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < this.newOptions.lineNum; i++) {
        ctx.strokeStyle = this.randomColor(
          this.newOptions.lineColorMin,
          this.newOptions.lineColorMax
        );
        ctx.beginPath();
        ctx.moveTo(
          this.randomNum(0, this.newOptions.contentWidth),
          this.randomNum(0, this.newOptions.contentHeight)
        );
        ctx.lineTo(
          this.randomNum(0, this.newOptions.contentWidth),
          this.randomNum(0, this.newOptions.contentHeight)
        );
        ctx.stroke();
      }
    },
    /**
     * 画干扰点
     */
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < this.newOptions.dotNum; i++) {
        ctx.fillStyle = this.randomColor(
          this.newOptions.dotColorMin,
          this.newOptions.dotColorMax
        );
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, this.newOptions.contentWidth),
          this.randomNum(0, this.newOptions.contentHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    },
    /**
     * 获取随机码
     */
    getRandomCode() {
      let codeArr = this.newOptions.codeStr.split(",");
      let selectCodeArr = [];
      for (let i = 0; i < this.newOptions.codeNum; i++) {
        let codeIndex = this.randomNum(0, codeArr.length);
        selectCodeArr.push(codeArr[codeIndex]);
      }
      this.selectCodeArr = selectCodeArr;
      this.selectCode = selectCodeArr.join("");
      this.$emit('getCode',this.selectCode)
      this.drawPic();
    },
    /**
     * 随机数
     * @param min
     * @param max
     * @returns {number}
     */
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**
     * 随机颜色
     * @param min
     * @param max
     * @returns {string}
     */
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
  },
};
</script>
<style scoped>
.ven-captcha-ordinary {
  cursor: pointer;
}
</style>
