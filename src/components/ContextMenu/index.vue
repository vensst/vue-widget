<!--
 * @Name: ContextMenu.vue
 * @Description:
 * @Date: 2023/8/28 10:42
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2023/8/28 10:42
-->
<template>
  <div class="contextmenu" ref="contextmenuRef">
    <slot></slot>
    <Teleport to="body">
      <div ref="menusRef" v-if="isMenuVisible" :class="['menus']">
        <template v-for="menu in menus">
          <div
            class="menu-item"
            :key="menu.label"
            @click="handleMenuClick(menu)"
          >
            <slot name="menu" v-bind="{ menu, ...extend }">
              <span>{{ menu.name }}</span>
            </slot>
          </div>
        </template>
      </div>
    </Teleport>
  </div>
</template>

<script>
import Teleport from "../Teleport/index.vue";
export default {
  name: "ContextMenu",
  components: { Teleport },
  mixins: [],
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
    extend: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isMenuVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$refs.contextmenuRef.addEventListener("contextmenu", this.showMenu);
    window.addEventListener("click", this.hideMenu);
    // 在捕获或冒泡阶段执行，隐藏菜单
    window.addEventListener("contextmenu", this.hideMenu, true);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.hideMenu);
    window.removeEventListener("contextmenu", this.hideMenu);
  },
  methods: {
    showMenu(event) {
      // 阻止默认
      event.preventDefault();
      // 停止冒泡
      event.stopPropagation();
      this.isMenuVisible = true;
      this.$nextTick(() => {
        const menusRef = this.$refs.menusRef;
        // 设置菜单的位置
        menusRef.style.left = event.clientX + "px";
        menusRef.style.top = event.clientY + "px";
      });
    },
    hideMenu() {
      this.isMenuVisible = false;
    },
    handleMenuClick(menu) {
      if (menu.callback && typeof menu.callback === "function") {
        menu.callback();
      }
      this.$listeners.command &&
        this.$emit("command", {
          menu,
          ...this.extend,
        });
      this.isMenuVisible = false;
    },
  },
};
</script>

<style scoped>
.contextmenu {
  display: inline-block;
}
.menus {
  z-index: 999;
  position: fixed;
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
.menu-item {
  list-style: none;
  line-height: 32px;
  padding: 0 20px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
}
.menu-item:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>
