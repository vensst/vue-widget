<template>
  <div class="home">
    <ul>
      <li v-for="item in routes" :key="item.name">
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
      </li>
    </ul>
    <div class="msg">{{ msg }}</div>
  </div>
</template>

<script>
// @ is an alias to /examples
import routes from "../router/routes";

export default {
  name: "Home",
  components: {},
  directives: {},
  data() {
    return {
      routes,
      msg: "我是msg",
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.VenDrag {
  width: 60px;
  height: 60px;
  background: burlywood;
  cursor: pointer;
  position: absolute;
}
</style>
