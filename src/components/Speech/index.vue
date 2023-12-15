<!--
 * @Name: index.vue
 * @Description: 语音
 * @Date: 2023/12/14 09:41
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/12/14 09:41
-->
<template>
  <a>
    <slot>
      <i
        :class="['iconfont', 'icon-shengyin', { active: isSpeak }]"
        @click="handleTrigger"
      ></i>
    </slot>
  </a>
</template>

<script>
if (!window.VUE_WIDGET_SPEECH) {
  window.VUE_WIDGET_SPEECH = {};
}
const defaultOptions = {
  // lang: "zh-CN", // 使用的语言: zh-CN、en-US ...
  volume: 1, // 声音的音量，范围是0到1，默认是1。
  rate: 1, // 设置播放语速，范围：0.1 - 10之间    正常为1倍播放
  pitch: 1, // 表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1。
};
export default {
  name: "Speech",
  components: {},
  props: {
    message: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      speechSynthesis: null,
      utterThis: null,
      isSpeak: false, // 是否在播放
    };
  },
  computed: {},
  created() {
    try {
      this.utterThis = new SpeechSynthesisUtterance();
    } catch (e) {
      console.error(e);
    }
    if (window.speechSynthesis) {
      this.speechSynthesis = window.speechSynthesis;
    } else {
      console.error("'window.speechSynthesis' is undefined");
    }
  },
  methods: {
    async handleTrigger() {
      if (this.isSpeak) {
        this.cancel();
      } else {
        window.VUE_WIDGET_SPEECH.currentInstance?.cancel();
        setTimeout(() => {
          this.speak();
        }, 50);
      }
    },
    /**
     * 播放
     */
    speak() {
      if (this.hasSpeakEnv() && this.message) {
        const options = { ...defaultOptions, ...this.options };
        this.utterThis.text = this.message; // 播放文案
        if (options.lang) this.utterThis.lang = options.lang;
        if (options.voice) this.utterThis.voice = options.voice;
        this.utterThis.volume = options.volume || 1;
        this.utterThis.rate = options.rate || 1;
        this.utterThis.pitch = options.rate || 1;

        this.utterThis.onend = () => {
          //语音合成结束时候的回调（语音读完后触发）
          this.isSpeak = false;
          window.VUE_WIDGET_SPEECH.currentSpeechSynthesis = null;
        };
        this.utterThis.onstart = (e) => {
          this.$emit("onstart", e);
        };
        this.utterThis.onerror = (e) => {
          this.$emit("onerror", e);
        };
        this.utterThis.onpause = (e) => {
          this.$emit("onpause", e);
        };
        this.utterThis.onresume = (e) => {
          this.$emit("onresume", e);
        };
        this.utterThis.onboundary = (e) => {
          this.$emit("onboundary", e);
        };
        this.speechSynthesis.speak(this.utterThis); // 播放
        this.isSpeak = true;
        window.VUE_WIDGET_SPEECH.currentInstance = this;
      }
    },
    /**
     * 取消
     */
    cancel() {
      if (this.hasSpeakEnv()) {
        this.isSpeak = false;
        this.speechSynthesis.cancel();
        window.VUE_WIDGET_SPEECH.currentInstance = null;
      }
    },
    /**
     * 暂停
     */
    pause() {
      if (this.hasSpeakEnv()) {
        this.speechSynthesis.pause();
      }
    },
    /**
     * 恢复
     */
    resume() {
      if (this.hasSpeakEnv()) {
        this.speechSynthesis.resume();
      }
    },
    /**
     * 判断是否有语音合成环境
     * @returns {boolean}
     */
    hasSpeakEnv() {
      return !!(this.utterThis && this.speechSynthesis);
    },
    /**
     * 获取所有声音
     * @returns {T[]}
     */
    getVoices() {
      if (this.hasSpeakEnv()) {
        return this.speechSynthesis.getVoices();
      }
    },
    /**
     * 获取当前语言的声音
     * @returns {T[]}
     */
    getCurrentLangVoices() {
      const voices = this.getVoices();
      return voices.filter((item) => item.lang === this.utterThis.lang);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/font/iconfont.css";

a {
  cursor: pointer;
}

a > i:hover,
a > i.active {
  color: #007bff;
}
</style>
