new Vue({
  el: "#app",
  data() {
    return {
      obj: {
        a: '1'
      }
    }
  },
  mounted() {
    console.log('this.obj 的值是：', this.obj);
  }

})