<!--
 * @Name: index.vue
 * @Description: 表格
 * @Date: 2023/8/9 16:45
 * @Author: huyafei
 * @LastEditors: yfhu
 * @LastEditTime: 2023-10-27 14:25:30
-->
<template>
  <Fragment>
    <vxe-table
      ref="vxeTableRef"
      v-bind="_attrs"
      v-on="_listeners"
      @cell-click="cellClickEvent"
    >
      <TheColumn
        v-for="(itemColumn, itemColumnIndex) in tableColumn"
        :itemColumn="itemColumn"
        :key="itemColumnIndex"
        :tableColumnIndex="itemColumnIndex"
      >
        <template
          v-if="itemColumn.slots && itemColumn.slots.default"
          v-slot:default="scope"
        >
          <slot :name="itemColumn.slots.default" v-bind="scope"></slot>
        </template>
        <template
          v-if="itemColumn.slots && itemColumn.slots.header"
          v-slot:header="scope"
        >
          <slot :name="itemColumn.slots.header" v-bind="scope"></slot>
        </template>
        <template
          v-if="itemColumn.slots && itemColumn.slots.footer"
          v-slot:footer="scope"
        >
          <slot :name="itemColumn.slots.footer" v-bind="scope"></slot>
        </template>
        <template
          v-if="itemColumn.slots && itemColumn.slots.filter"
          v-slot:filter="scope"
        >
          <slot :name="itemColumn.slots.filter" v-bind="scope"></slot>
        </template>
        <template
          v-if="itemColumn.slots && itemColumn.slots.edit"
          v-slot:edit="scope"
        >
          <slot :name="itemColumn.slots.edit" v-bind="scope"></slot>
        </template>
      </TheColumn>

      <template v-if="$slots.empty" #empty>
        <slot name="empty"></slot>
      </template>
      <template v-if="$slots.loading" #loading>
        <slot name="loading"></slot>
      </template>
    </vxe-table>
    <div class="ven-page" v-if="isPage">
      <vxe-pager
        :current-page="tableInfo.current"
        :page-size="tableInfo.size"
        :total="tableInfo.total"
        v-bind="_pageAttrs"
        @page-change="handlePageChange"
      >
        <template v-if="$slots.left" #left>
          <slot name="left"></slot>
        </template>
        <template v-if="$slots.right" #right>
          <slot name="right"></slot>
        </template>
      </vxe-pager>
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import TheColumn from "./TheColumn.vue";
import { chainGet, camelToKebab, isObject } from "@vensst/js-toolkit";

// why? 有的后端返回格式不一样
const defaultPageFieldOptions = {
  dataPath: "", // 链式语法 a.b.c
  data: "data", // 数据列表字段
  size: "size", // 每页数字段
  current: "current", // 当前页字段
  total: "total", // 总数字段
  pages: "pages", // 总页数字段
  defaultCurrentPage: 1, // 默认当前页，why？有的后端默认是从0开始
  defaultSize: 10,
};
const defaultPageOptions = {
  background: true,
  layouts: ["PrevPage", "JumpNumber", "NextPage", "FullJump", "Sizes", "Total"],
};
export default {
  name: "Table",
  components: { Fragment, TheColumn },
  mixins: [],
  props: {
    // 是否分页
    isPage: {
      type: Boolean,
      default: true,
    },
    // 表格数据接口
    tableDataApi: {
      type: Function,
      default: null,
    },
    // 表单数据
    formData: {
      type: Object,
      default: () => ({}),
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => [],
    },
    // 表格列
    tableColumn: {
      type: Array,
      default: () => [],
    },
    // 合并行字段
    mergeRowFields: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 分页字段配置
    pageFieldOptions: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 分页配置
    pageOptions: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      tableInfo: {
        loading: false,
        tableData: [],
        current: 1,
        size: 10,
        pages: 0,
        total: 0,
      },
    };
  },
  computed: {
    _attrs() {
      // key 统一使用短横线方式
      const defaultAttrs = {
        border: true,
        // "show-overflow": true,
        // "scroll-y": { enabled: false },
        "row-config": {
          // isCurrent: true,
          isHover: true,
        },
        "empty-text": "暂无数据",
        "span-method": this.mergeRowMethod,
        // "tooltip-config": {
        //   showAll: true,
        //   enterable: true,
        //   // eslint-disable-next-line no-unused-vars
        //   contentMethod: (scope) => {
        //     // { type, column, row, items, _columnIndex }
        //     return null;
        //   },
        // },
      };
      let attrs = this.mergeAttr(defaultAttrs, this.$attrs);
      if (this.isUseApi()) {
        attrs = {
          ...attrs,
          data: this.tableInfo.tableData,
          loading: this.tableInfo.loading,
        };
      } else {
        if (!attrs.data?.length && this.tableInfo.tableData.length) {
          attrs = {
            ...attrs,
            data: this.tableInfo.tableData,
          };
        }
      }

      return attrs;
    },
    _listeners() {
      return {
        ...this.$listeners,
      };
    },
    _pageFieldOptions() {
      return { ...defaultPageFieldOptions, ...this.pageFieldOptions };
    },
    _pageAttrs() {
      return { ...defaultPageOptions, ...this.pageOptions };
    },
  },
  watch: {
    tableData: {
      handler() {
        this.tableInfo.tableData = this.tableData;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (this.isPage) {
      this.tableInfo.current = this._pageFieldOptions.defaultCurrentPage;
      this.tableInfo.size = this._pageFieldOptions.defaultSize;
    }
  },
  mounted() {
    if (this.isUseApi()) {
      this.getList();
    } else {
      this.tableInfo.tableData = this.tableData;
    }
  },
  methods: {
    init() {
      this.tableInfo.current = 1;
      this.tableInfo.tableData = [];
      this.getList();
    },
    update() {
      this.getList();
    },
    getList() {
      this.tableInfo.loading = true;
      const { size, current } = this.tableInfo;
      const params = {
        ...this.formData,
      };
      params[this._pageFieldOptions.size] = size;
      params[this._pageFieldOptions.current] = current;
      this.tableDataApi(params)
        .then((res) => {
          const data = this._pageFieldOptions.dataPath
            ? chainGet(res, this._pageFieldOptions.dataPath)
            : res;
          this.tableInfo.tableData = data[this._pageFieldOptions.data];
          this.tableInfo.total = data[this._pageFieldOptions.total];
          this.tableInfo.pages = data[this._pageFieldOptions.pages];
        })
        .catch(() => {})
        .finally(() => {
          this.tableInfo.loading = false;
        });
    },

    cellClickEvent(e) {
      this.$emit("row-click", e);
    },
    /**
     * 递归合并attrs
     * @param {Object} defaultAttrs 默认
     * @param {Object} attrs 组件上传入的
     * @param {boolean} isDeep 是否深度的
     * @returns {*}
     */
    mergeAttr(defaultAttrs, attrs, isDeep = false) {
      const newAttrs = {
        ...defaultAttrs,
      };
      for (let key in attrs) {
        if (
          (Object.prototype.hasOwnProperty.call(newAttrs, key) ||
            Object.prototype.hasOwnProperty.call(
              newAttrs,
              camelToKebab(key)
            )) &&
          isObject(attrs[key])
        ) {
          newAttrs[isDeep ? key : camelToKebab(key)] = this.mergeAttr(
            newAttrs[key],
            attrs[key],
            true
          );
        } else {
          newAttrs[isDeep ? key : camelToKebab(key)] = attrs[key];
        }
      }
      return newAttrs;
    },
    /**
     * 合并行
     * @param row 当前行
     * @param _rowIndex
     * @param column
     * @param visibleData
     * @returns {{colspan: number, rowspan: number}}
     */
    mergeRowMethod({ row, _rowIndex, column, visibleData }) {
      //定义需要合并的列字段，有哪些列需要合并，就自定义添加字段即可
      const fields = this.mergeRowFields;
      // 当前行的数据
      const cellValue = row[column.property];
      // 判断只合并定义字段的列数据
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1];
        let nextRow = visibleData[_rowIndex + 1];
        // 当上一行的数据等于当前行数据时，当前行单元格隐藏
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          // 反之，则循环判断若下一行数据等于当前行数据，则当前行开始进行合并单元格
          let countRowspan = 1; //用于合并计数多少单元格
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex];
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 };
          }
        }
      }
    },

    /**
     * 分页
     * @param currentPage 当前页
     * @param pageSize 每页条数
     */
    handlePageChange({ currentPage, pageSize }) {
      this.tableInfo.current = currentPage;
      this.tableInfo.size = pageSize;
      this.getList();
    },
    // 获取 column attrs 过滤掉 slot批量插入的属性
    getColumnAttrs(itemColumn) {
      // eslint-disable-next-line no-unused-vars
      const { slots, ...filteredAttrs } = itemColumn;
      return filteredAttrs;
    },
    /**
     * 是否使用api方式
     * @returns {boolean}
     */
    isUseApi() {
      return this.tableDataApi && typeof this.tableDataApi === "function";
    },
  },
};
</script>
<style scoped>
.ven-page {
  text-align: right;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 14px;
}
</style>
