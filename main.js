var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    data: [],
  },

  methods: {
    login() {},
    getData(url) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.data = data.results;
        });
    },
  },

  created() {
    this.getData("https://randomuser.me/api/?results=5");
  },
});
