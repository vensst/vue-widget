<!--
 * @Name: TablePlus.vue
 * @Description: 表格
 * @Date: 2023/8/9 16:46
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/8/9 16:46
-->
<template>
  <div>
    <VenTable
      :tableDataApi="listApi"
      :formData="formData"
      :tableColumn="tableColumn"
      :pageFieldOptions="{
        dataPath: 'data',
        data: 'records',
      }"
      @row-click="cellClickEvent"
    >
      <template #operation="scope" >
        <vxe-button @click.native.stop="getRow(scope)">按钮</vxe-button>
        <vxe-button @click.native.stop="getRow(scope)">按钮</vxe-button>
      </template>
    </VenTable>
  </div>
</template>

<script>
// 模拟分页请求
const listApi = function ({ size = 10, current = 1 }) {
  return new Promise((resolve) => {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push({ id: i, name: "zs" + i });
    }
    setTimeout(() => {
      resolve({
        data: {
          records: arr.slice((current - 1) * size, (current - 1) * size + size),
          total: arr.length,
          size: size,
          current: current,
          pages:
            arr.length % size === 0 ? arr.length / size : arr.length / size + 1,
        },
        // data: {
        //   records: [],
        //   total: arr.length,
        //   size: size,
        //   current: current,
        //   pages: arr.length % size === 0 ? arr.length / size : arr.length / size + 1,
        // },
      });
    }, Math.floor(Math.random() * 1000));
  });
};

export default {
  name: "Table",
  title: "表格",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      formData: {
        cjmc: "",
        cjbs: "",
        dateTime: [],
      },
      listApi,
      tableData: [],
      tableColumn: [
        { key: 1, type: "seq", title: "序号", width: 60 },
        { key: 2, field: "name", title: "名称1", minWidth: 160 },
        {
          key: 3,
          title: "操作",
          width: 160,
          fixed: "right",
          slot: "operation",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    cellClickEvent(e) {
      console.log(e);
    },
    getRow(scope) {
      console.log(scope);
    },
  },
};
</script>

<style scoped></style>
