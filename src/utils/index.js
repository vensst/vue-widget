import { isMobile, $ } from "@vensst/js-toolkit";

const hasUnit = function (str) {
  if (typeof str !== "string") return false;
  const unitPattern = /[a-zA-Z]+$/; // 匹配以字母组成的单位
  return unitPattern.test(str);
};
const removeUnit = function (str) {
  if (typeof str !== "string" || !hasUnit(str)) {
    return str;
  }
  return str.replace(/[a-zA-Z]+$/, "");
};

const bindDragEvent = function (parentElSelector, el, isRange) {
  if (parentElSelector === "body") {
    el.style.position = "fixed";
  } else {
    el.style.position = "absolute";
  }
  el.style.cursor = "pointer";
  //元素宽高
  const { offsetWidth, offsetHeight } = el;
  const { clientWidth, clientHeight } = $(parentElSelector);
  let maxClientWidth = clientWidth - offsetWidth; //最大可移动宽度
  let maxClientHeight = clientHeight - offsetHeight; //最大可移动高度

  let start, move, end;
  //判断当前是移动端还是PC，移动端touch，PC端mouse
  if (isMobile()) {
    start = "ontouchstart"; //手指按下
    move = "ontouchmove"; //手指移动
    end = "ontouchend"; //手指放开
  } else {
    start = "onmousedown"; //鼠标按下
    move = "onmousemove"; //鼠标移动
    end = "onmouseup"; //鼠标松开
  }
  //鼠标点位到元素左上角点位距离
  let mouseToELDistanceX, mouseToELDistanceY;
  el[start] = (e) => {
    // 处理拖动时选中文字的问题
    document.onselectstart = function () {
      return false;
    };
    let touch;
    if (e.touches) {
      touch = e.touches[0];
    } else {
      touch = e;
    }
    //计算出鼠标到元素左上角距离
    mouseToELDistanceX = touch.clientX - el.offsetLeft;
    mouseToELDistanceY = touch.clientY - el.offsetTop;
    document[move] = (e) => {
      let touch;
      if (e.touches) {
        touch = e.touches[0];
      } else {
        touch = e;
      }
      //鼠标的位置-鼠标到元素左上角距离=元素的左上角位置
      let left = touch.clientX - mouseToELDistanceX;
      let top = touch.clientY - mouseToELDistanceY;
      //判断是否有边界限制
      if (isRange) {
        if (left < 0) {
          left = 0;
        } else if (left > maxClientWidth) {
          left = maxClientWidth;
        }
        if (top < 0) {
          top = 0;
        } else if (top > maxClientHeight) {
          top = maxClientHeight;
        }
      }

      el.style.left = left + "px";
      el.style.top = top + "px";
    };
    document[end] = () => {
      document[start] = null;
      document[move] = null;
      document[end] = null;
      document.onselectstart = null;
    };
  };
};

export { hasUnit, removeUnit, bindDragEvent };
