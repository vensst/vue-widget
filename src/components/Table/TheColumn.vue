<!--
 * @Name: Column.vue
 * @Description:
 * @Date: 2023/12/29 17:08
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/12/29 17:08
-->
<template>
  <component
    :is="itemColumn.children ? 'vxe-colgroup' : 'vxe-column'"
    v-bind="getColumnAttrs(itemColumn)"
  >
    <template v-if="itemColumn.children">
      <TheColumn
        v-for="(cItemColumn, cItemColumnIndex) in itemColumn.children"
        :key="tableColumnIndex + cItemColumnIndex"
        :itemColumn="cItemColumn"
        :tableColumnIndex="cItemColumnIndex"
      >
        <template
          v-if="cItemColumn.slots && cItemColumn.slots.default"
          v-slot:default="scope"
        >
          <slot :name="cItemColumn.slots.default" v-bind="scope"></slot>
        </template>
        <template
          v-if="cItemColumn.slots && cItemColumn.slots.header"
          v-slot:header="scope"
        >
          <slot :name="cItemColumn.slots.header" v-bind="scope"></slot>
        </template>
        <template
          v-if="cItemColumn.slots && cItemColumn.slots.footer"
          v-slot:footer="scope"
        >
          <slot :name="cItemColumn.slots.footer" v-bind="scope"></slot>
        </template>
        <template
          v-if="cItemColumn.slots && cItemColumn.slots.filter"
          v-slot:filter="scope"
        >
          <slot :name="cItemColumn.slots.filter" v-bind="scope"></slot>
        </template>
        <template
          v-if="cItemColumn.slots && cItemColumn.slots.edit"
          v-slot:edit="scope"
        >
          <slot :name="cItemColumn.slots.edit" v-bind="scope"></slot>
        </template>
      </TheColumn>
    </template>
    <template
      v-if="itemColumn.slots && itemColumn.slots.default"
      v-slot:default="scope"
    >
      <slot v-bind="scope"></slot>
    </template>
    <template
      v-if="itemColumn.slots && itemColumn.slots.header"
      v-slot:header="scope"
    >
      <slot name="header" v-bind="scope"></slot>
    </template>
    <template
      v-if="itemColumn.slots && itemColumn.slots.footer"
      v-slot:footer="scope"
    >
      <slot name="footer" v-bind="scope"></slot>
    </template>
    <template
      v-if="itemColumn.slots && itemColumn.slots.filter"
      v-slot:filter="scope"
    >
      <slot name="filter" v-bind="scope"></slot>
    </template>
    <template
      v-if="itemColumn.slots && itemColumn.slots.edit"
      v-slot:edit="scope"
    >
      <slot name="edit" v-bind="scope"></slot>
    </template>
  </component>
</template>

<script>
export default {
  name: "TheColumn",
  components: {},
  mixins: [],
  props: {
    itemColumn: {
      type: Object,
      default: function () {
        return {};
      },
    },
    tableColumnIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取 column attrs 过滤掉 slot批量插入的属性
    getColumnAttrs(itemColumn) {
      // eslint-disable-next-line no-unused-vars
      const { slots, ...filteredAttrs } = itemColumn;
      return filteredAttrs;
    },
  },
};
</script>

<style scoped>

</style>
