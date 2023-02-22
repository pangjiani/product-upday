<template>
  <div class="container">
    <el-image v-for="url in urls" :key="url" :src="url" ></el-image>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: function () {
    return {
      urls: []
    }
  },
  async created() {
    const res = await fetch("http://localhost:3002/api/getPicList");
    const resJson = await res.json();
    this.urls = resJson.data;
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container .img {
  width: 100%;
}
</style>