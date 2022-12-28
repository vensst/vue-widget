<template>
  <div class="main">
    <!-- 相机、文件方式同时只能使用一个,可根据自己需求修改,如:1.改成下拉框;2.改成tab;3.改成radio等等控制显示隐藏和相应逻辑 -->
    <button @click="useCamera">扫一扫</button>
    <button @click="stop">停止</button>
    <button @click="useLocal">
      <input
        type="file"
        id="upload-input"
        accept="image/*"
        value="使用文件方式"
      />
      <span id="upload-text">使用文件方式</span>
    </button>
    <div class="camera" v-if="isShowCamera">
      <span @click="stop">返回</span>
      <div id="reader"></div>
    </div>
    <h3 id="results"></h3>
  </div>
</template>
<script>
/**
 * @name: ScanCode
 * @description：ScanCode.vue
 * @date: 2022/7/11 9:28
 * @author: yf_hu
 */
import {
  Html5Qrcode,
  Html5QrcodeScanner,
  Html5QrcodeScannerState,
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";

export default {
  name: "ScanCode",
  components: {},
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      //扫一扫相关设置
      config: {
        fps: 10,
        qrbox: {
          width: 300,
          height: 280,
        },
      },
      isShowCamera: false,
      html5QrCode: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(window);
    console.log(
      Html5Qrcode,
      Html5QrcodeScanType,
      Html5QrcodeScanner,
      Html5QrcodeScannerState,
      Html5QrcodeSupportedFormats
    );
  },
  methods: {
    //使用本地文件
    useLocal: function () {
      let html5QrCode = new Html5Qrcode("reader");
      let reader = document.getElementById("reader");
      let res = document.getElementById("qr-reader-results");
      let uploadInput = document.getElementById("upload-input");
      reader.style.display = "none";
      res.innerText = "";
      uploadInput.addEventListener("change", (e) => {
        if (e.target.files.length == 0) {
          return;
        }
        const imageFile = e.target.files[0];
        html5QrCode
          .scanFile(imageFile, true)
          .then((decodedText) => {
            res.innerText = "扫码成功结果:\n" + decodedText;
          })
          .catch((err) => {
            res.innerText = "扫码失败:\n" + err;
          });
      });
    },
    //相机授权
    useCamera: function () {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            this.isShowCamera = true;
            this.$nextTick(() => {
              let cameraId = "";
              if (devices.length == 1) {
                cameraId = devices[0].id; //前置摄像头
              } else {
                cameraId = devices[1].id; //后置摄像头
              }
              if (cameraId) {
                this.startWithCameraId(cameraId);
              }
            });
          } else {
            this.startWithoutCameraId();
          }
        })
        .catch((err) => {
          console.log("没有获取摄像头设备...", err);
        });
    },

    //带相机ID扫描
    startWithCameraId: function (cameraId) {
      this.html5QrCode = new Html5Qrcode("reader");
      this.html5QrCode
        .start(
          { deviceId: { exact: cameraId } },
          this.config,
          this.onScanSuccess,
          this.onScanFailure
        )
        .catch((err) => {
          console.log("通过摄像头扫码异常....", err);
        });
    },

    //不带相机ID扫描,允许传递约束来代替相机设备 ID
    startWithoutCameraId: function () {
      this.html5QrCode = new Html5Qrcode("reader");
      //environment 表示后置摄像头  换成user则表示前置摄像头
      this.html5QrCode.start(
        { facingMode: "environment" } || {
          facingMode: { exact: "environment" },
        },
        this.config,
        this.onScanSuccess,
        this.onScanFailure
      );
    },

    stop: function () {
      this.html5QrCode
        .stop()
        .then((ignore) => {
          // QR Code scanning is stopped.
          console.log("QR Code scanning stopped.", ignore);
          this.isShowCamera = false;
        })
        .catch((err) => {
          // Stop failed, handle it.
          console.log("Unable to stop scanning.", err);
        });
    },

    //扫码解析成功后按照自己的需求做后续的操作
    onScanSuccess: function (decodedText, decodedResult) {
      this.stop()
      let res = document.getElementById("results");
      res.innerText = "扫码成功结果:\n" + decodedText + decodedResult;
    },
    //扫码解析失败后按照自己的需求做后续的操作
    onScanFailure: function (error) {
      let res = document.getElementById("results");
      res.innerText = "扫码失败:\n" + error;
    },
  },
};
</script>
<style scoped>
.main {
  height: 100%;
  position: relative;
}

.camera {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
}

#reader {
}

button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  outline: none;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background-color: #26a2ff;
  text-align: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

#upload-input {
  opacity: 0;
  filter: alpha(opacity=0);
  display: inline-block;
  width: 100%;
  height: 100%;
}

#upload-text {
  position: relative;
  bottom: 40px;
  user-select: none;
}
</style>
