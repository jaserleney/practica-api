var app = new Vue({
  el: "#app",
  data: {
    message: "Bienvenido",
    data: [],
    dataFilter: [],
    dataFilterComputed: [],

    is: {
      out: true,
      login: false,
    },
    username: "",
    password: "",
    gender: "",
    amount: "",
    active: {},
  },

  computed: {
    filteredData() {
      if (this.gender) {
        this.dataFilterComputed = this.data.filter(
          (el) => el.login.username !== this.active.username
        );

        this.dataFilter = this.dataFilterComputed.filter(
          (el) => el.gender === this.gender
        );
      }
    },
  },

  methods: {
    login() {
      const login = this.data.map((el) => {
        return { username: el.login.username, password: el.login.password };
      });

      if (
        login.find(
          (el) => el.username === this.username && el.password === this.password
        )
      ) {
        // console.log(login);
        this.is = {
          out: false,
          login: true,
        };

        this.active = {
          username: this.username,
          password: this.password,
        };

        localStorage;

        if (this.active) {
          this.dataFilter = this.data.filter(
            (el) => el.login.username !== this.active.username
          );

          console.log(this.dataFilter);
        }
      } else {
        alert("Usuario o contraseña incorrecta");
        return false;
      }
    },

    async getData(url) {
      try {
        let res = await fetch(url);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        let data = await res.json();

        this.data = data.results;

        console.log(
          this.data.map((el) => {
            return {
              username: el.login.username,
              password: el.login.password,
            };
          })
        );
      } catch (err) {
        console.log(`Error ${err.status}: ${err.statusText}`);
      }
    },
  },

  created() {
    this.getData("https://randomuser.me/api/?results=10");
  },
});
