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
      this.dataFilterComputed = [...this.data];
      if (this.gender) {
        this.dataFilterComputed = this.dataFilterComputed.filter(
          (el) => el.login.username !== this.active.username
        );

        if (this.amount < 0) {
          alert("Debe ingresar un valor mayor a cero");
          this.amount = 0;
          return false;
        }

        let male = this.dataFilterComputed.filter((el) => el.gender === "male");
        let female = this.dataFilterComputed.filter(
          (el) => el.gender === "female"
        );
        // console.log(male, female);

        if (this.gender === "male") {
          this.dataFilterComputed = male.slice(0, this.amount || male.length);
        }

        if (this.gender === "female") {
          this.dataFilterComputed = female.slice(
            0,
            this.amount || female.length
          );
        }

        this.dataFilter = this.dataFilterComputed.filter(
          (el) => el.gender === this.gender
        );
      }
    },
  },

  methods: {
    logOut() {
      let isOut = confirm("Desea cerrar sesión?");
      if (isOut) {
        this.is = {
          out: true,
          login: false,
        };
        this.active = {};
        location.reload();
      }
    },

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
        this.data.map(async (el) => {
          let urlFlag = `https://countryflagsapi.com/png/${el.location.country}`;
          el.location.flag = urlFlag;
        });

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

    deleteUsers(index) {
      let isDelete = confirm("Esta Seguro Que Desea Eliminar Al Usuario?");
      if (isDelete) {
        this.dataFilter.splice(index, 1);
      }
    },
  },

  created() {
    this.getData("https://randomuser.me/api/?results=10");
  },
});
