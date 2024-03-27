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
    <VenSpeech :message="message"></VenSpeech>
    <VenSpeech :message="message2"></VenSpeech>
  </div>
</template>

<script>
export default {
  name: "",
  title: "语音播报",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      message:
        "海内存知己，天涯若比邻海内存知己，天涯若比邻海内存知己，天涯若比邻海内存知己，天涯若比邻海内存知己，天涯若比邻海内存知己，天涯若比邻海内存知己，天涯若比邻",
      message2: " A B C D E F G+-)/",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
