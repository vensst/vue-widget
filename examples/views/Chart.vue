<!--
 * @Name: Speech.vue
 * @Description: 语音播报
 * @Date: 2023/12/14 16:28
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/12/14 16:28
-->
<template>
  <div>
    <button @click="changeData(1)">切换数据1</button>
    <button @click="changeData(2)">切换数据2</button>
    <button @click="noData">没有数据</button>
    <VenChart
      :option="option"
      :emptyOption="{
        text: '亲，没有数据哦！',
        style: {
          fontSize: '24px',
          fontWeight: 800,
        },
      }"
    ></VenChart>
    <VenChart :option="option">
      <template v-slot:empty> 自定义空内容</template>
    </VenChart>
  </div>
</template>

<script>
export default {
  name: "",
  title: "echarts图表",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      option: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeData(type) {
      this.option.series[0].data =
        type === 1 ? [20, 16, 26, 18, 3, 15] : [8, 10, 13, 20, 22, 16];
    },
    noData() {
      this.option.series[0].data = [];
    },
  },
};
</script>

<style scoped></style>
