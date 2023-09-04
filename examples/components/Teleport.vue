<!--
 * @Name: Teleport.vue
 * @Description: vue2自定义Teleport组件
 * @Date: 2023/9/1 13:10
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/9/1 13:10
-->
<script>
export default {
  name: "Teleport",
  props: {
    /* 移动至哪个标签内，最好使用id */
    to: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      targetEl: null,
    };
  },

  mounted() {
    if (!this.disabled) {
      document.querySelector(this.to)?.appendChild(this.$el);
    }
  },

  beforeDestroy() {
    if (!this.disabled) {
      this.$el.parentNode?.removeChild(this.$el);
    }
  },

  render(createElement) {
    return createElement("div", { class: ["teleport"] }, this.$slots.default);
  },
};
</script>
