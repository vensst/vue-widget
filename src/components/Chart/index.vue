<!--
 * @Name: index.vue
 * @Description: echarts图表
 * @Date: 2024/3/27 14:20
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2024/3/27 14:20
-->
<template>
  <div class="chart-box" :style="{ width, height }">
    <div v-show="!isEmpty" class="chart" ref="chartRef"></div>
    <Empty v-show="isEmpty" v-bind="emptyOption">
      <slot name="empty"></slot>
    </Empty>
  </div>
</template>

<script>
import Empty from "../Empty";

export default {
  name: "Chart",
  components: { Empty },
  props: {
    option: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "320px",
    },
    emptyOption: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    isEmpty() {
      return (
        !this.option ||
        !this.option.series ||
        !this.option.series.length ||
        !this.option.series[0].data.length
      );
    },
  },
  mounted() {
    if (this.$echarts && !this.isEmpty) {
      this.chartInstance = this.$echarts.init(this.$refs.chartRef);
      this.updateChart();
      console.log(this.chartInstance);
      window.addEventListener("resize", this.autoResize);
    }
  },
  beforeDestroy() {
    this.chartInstance && this.chartInstance.dispose();
  },
  watch: {
    option: {
      deep: true,
      handler() {
        if (this.chartInstance) {
          this.updateChart();
        }
      },
    },
    isEmpty() {
      this.$nextTick(() => {
        this.autoResize();
      });
    },
  },
  methods: {
    updateChart() {
      const { option } = this;
      if (option && this.chartInstance) {
        this.chartInstance.setOption(option);
      }
    },
    autoResize() {
      this.chartInstance && this.chartInstance.resize();
    },
  },
};
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
