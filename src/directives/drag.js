import { bindDragEvent } from "~/utils";
/**
 * https://cn.vuejs.org/v2/guide/custom-directive.html
 * 钩子函数 bind，inserted update componentUpdated unbind
 * 钩子函数参数 el, binding, vnode, oldVnode
 * {
  bind: function (el, binding, vnode, oldVnode) { },
  inserted: function (el, binding, vnode, oldVnode) { },
  update: function (el, binding, vnode, oldVnode) { },
  componentUpdated: function (el, binding, vnode, oldVnode) { },
  unbind: function (el, binding, vnode, oldVnode) { },
}
 */
const drag = {
  inserted: function (el, binding) {
    el.style.position = "fixed";
    let isRange = true;
    if (binding.value && binding.value.isRange !== undefined) {
      isRange = binding.value.isRange;
    }
    bindDragEvent(el, isRange);
  },
};
export default drag;
