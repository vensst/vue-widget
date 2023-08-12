<!--
 * @Name: index.vue
 * @Description: 表格
 * @Date: 2023/8/9 16:45
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/8/9 16:45
-->
<template>
  <div>
    <vxe-table
      class="table--style"
      header-cell-class-name="header-cell--height"
      ref="vxeTableRef"
      v-bind="_attrs"
      v-on="_listeners"
      @cell-click="cellClickEvent"
    >
      <vxe-column
        v-for="itemColumn in tableColumn"
        :key="itemColumn.key"
        v-bind="getColumnAttrs(itemColumn)"
      >
        <!--将原来的scope数据原封不动返回-->
        <template v-if="itemColumn.slot" v-slot:default="scope">
          <slot :name="itemColumn.slot" v-bind="scope"></slot>
        </template>
      </vxe-column>
    </vxe-table>
    <div class="ven-page" v-if="isPage">
      <div class="ven-page__left" v-if="isPageLeft">
        <slot name="page-left">
          共{{ tableInfo.total }}条{{ tableInfo.pages }}页，当前第{{
            tableInfo.current
          }}页。
        </slot>
      </div>
      <vxe-pager
        :current-page="tableInfo.current"
        :page-size="tableInfo.size"
        :total="tableInfo.total"
        v-bind="_pageAttrs"
        @page-change="handlePageChange"
      >
      </vxe-pager>
    </div>
  </div>
</template>

<script>
import jsToolkit from "@vensst/js-toolkit";

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
  layouts: ["PrevPage", "JumpNumber", "NextPage", "Sizes", "FullJump"],
};
export default {
  name: "Table",
  components: {},
  mixins: [],
  props: {
    // 是否分页
    isPage: {
      type: Boolean,
      default: true,
    },
    isPageLeft: {
      type: Boolean,
      default: true,
    },
    // 表格数据接口
    tableDataApi: {
      type: Function,
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
      let attrs = {
        border: true,
        showOverflow: true,
        scrollY: { enabled: false },
        rowConfig: { isCurrent: false, isHover: true },
        emptyText: "暂无数据",
        spanMethod: this.mergeRowMethod,
        ...this.$attrs,
      };
      if (this.tableDataApi && typeof this.tableDataApi === "function") {
        attrs = {
          ...attrs,
          data: this.tableInfo.tableData,
          loading: this.tableInfo.loading,
        };
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
      immediate: true,
    },
  },
  created() {
    this.tableInfo.current = this._pageFieldOptions.defaultCurrentPage;
    this.tableInfo.size = this._pageFieldOptions.defaultSize;
  },
  mounted() {
    if (this.tableDataApi && typeof this.tableDataApi === "function") {
      this.getList();
    } else {
      this.tableInfo.tableData = this.tableData;
    }
  },
  methods: {
    init() {
      this.tableInfo.current = 1;
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
            ? jsToolkit.chainGet(res, this._pageFieldOptions.dataPath)
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
     * 合并行
     * @param row 当前行
     * @param _rowIndex
     * @param column
     * @param visibleData
     * @returns {{colspan: number, rowspan: number}}
     */
    mergeRowMethod({ row, _rowIndex, column, visibleData }) {
      const fields = this.mergeRowFields;
      const cellValue = row[column.property];
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1];
        let nextRow = visibleData[_rowIndex + 1];
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let countRowspan = 1;
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
      const { key, slot, ...filteredAttrs } = itemColumn;
      return filteredAttrs;
    },
  },
};
</script>
<style scoped>
/*
::v-deep .table--style .vxe-header--column {
  background-color: #ebf4fe;
  color: #0075f0;
}
 */

.ven-page {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 14px;
}
</style>