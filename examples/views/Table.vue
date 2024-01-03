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
      :rowConfig="{ isCurrent: false, isHover: true }"
      :stripe="true"
      :edit-config="{ trigger: 'click', mode: 'cell' }"
      :pageFieldOptions="{
        dataPath: 'data',
        data: 'records',
      }"
      :mergeRowFields="['age']"
      @row-click="cellClickEvent"
    >
      <template #age_edit="{ row }">
        <vxe-input v-model="row.age"></vxe-input>
      </template>
      <template #operation="scope">
        <vxe-button @click="getRow(scope)">按钮</vxe-button>
        <vxe-button @click="getRow(scope)">按钮</vxe-button>
      </template>
    </VenTable>
    <VenTable
      :tableData="tableData"
      :tableColumn="tableColumn"
      ref="tableRef"
      :tree-config="{
        transform: true,
        rowField: 'id',
        parentField: 'parentId',
      }"
      :edit-config="{ trigger: 'click', mode: 'cell' }"
      :isPage="false"
    >
      <template #age_edit="{ row }">
        <vxe-input v-model="row.age"></vxe-input>
      </template>
      <template #operation="scope">
        <vxe-button @click="getRow(scope)">按钮</vxe-button>
        <vxe-button @click="getRow(scope)">按钮</vxe-button>
      </template>
    </VenTable>
  </div>
</template>

<script>
import { random } from "@vensst/js-toolkit";
// 模拟分页请求
const listApi = function ({ size = 10, current = 1 }) {
  return new Promise((resolve) => {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push({
        id: i,
        name: "会飞的鱼" + i,
        name2: "会飞的鱼" + i,
        name3: "会飞的鱼" + i,
        age: random(28, 30, false),
        contact1: "会跑的鱼" + random(0, 5, false),
        contact2: "会跳的鱼" + random(0, 5, false),
      });
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
      tableColumn: [
        {
          type: "checkbox",
          width: 60,
        },
        {
          type: "seq",
          title: "序号",
          width: 60,
        },
        {
          field: "name",
          title: "姓名",
          minWidth: 160,
          "show-overflow": "ellipsis",
          "tree-node": true,
        },
        {
          field: "name2",
          title: "姓名2",
          minWidth: 160,
          formatter: function ({ cellValue }) {
            return cellValue + 66;
          },
        },
        {
          field: "name3",
          title: "姓名3",
          minWidth: 160,
          "show-overflow": "title",
        },
        {
          field: "age",
          title: "年龄",
          minWidth: 100,
          sortable: true,
          slots: {
            edit: "age_edit",
          },
          "edit-render": {},
        },
        {
          title: "紧急联系人",

          children: [
            {
              field: "contact1",
              title: "名称3",
              minWidth: 120,
            },
            {
              field: "contact2",
              title: "名称4",
              minWidth: 120,
            },
          ],
        },
        {
          title: "操作",
          width: 160,
          fixed: "right",
          slots: {
            default: "operation",
          },
        },
      ],
      tableData: [
        {
          id: "1",
          parentId: null,
          name: "张**",
          name2: "张**",
          name3: "张**",
          age: 26,
          contact1: "王**",
          contact2: "李**",
        },
        {
          id: "11",
          parentId: "1",
          name: "张**",
          name2: "张**",
          name3: "张**",
          age: 26,
          contact1: "王**",
          contact2: "李**",
        },
        {
          id: "12",
          parentId: "1",
          name: "张**",
          name2: "张**",
          name3: "张**",
          age: 26,
          contact1: "王**",
          contact2: "李**",
        },
        {
          id: "2",
          parentId: null,
          name: "李**",
          name2: "李**",
          name3: "李**",
          age: 24,
          contact1: "王**",
          contact2: "李**",
        },
        {
          id: "21",
          parentId: "2",
          name: "李**",
          name2: "李**",
          name3: "李**",
          age: 24,
          contact1: "王**",
          contact2: "李**",
        },
        {
          id: "5",
          parentId: null,
          name: "溢出省略，李**李**李**李**李**李**李**李**李**李**李**李**李**",
          name2: "换行，李**李**李**李**李**李**李**李**李**李**李**李**李**",
          name3:
            "溢出省略，鼠标悬浮显示tooltip，李**李**李**李**李**李**李**李**李**李**李**李**李**",
          age: 24,
          contact1: "王**",
          contact2: "李**",
        },
        {
          id: "3",
          parentId: null,
          name: "王**",
          name2: "王**",
          name3: "王**",
          age: 28,
          contact1: "王**",
          contact2: "李**",
        },
        {
          id: "4",
          parentId: null,
          name: "赵**",
          name2: "赵**",
          name3: "赵**",
          age: 28,
          contact1: "王**",
          contact2: "李**",
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
      console.log("点击行", e);
    },
    getRow(scope) {
      console.log("点击操作按钮：", scope);
    },
  },
};
</script>

<style scoped></style>
