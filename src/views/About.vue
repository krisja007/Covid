<template>
  <div class="about">
    <div>
      <span class="text middle" data-text=""></span>
    </div>
    <div class="card container">
      <span class="text1">Covid</span>
      <span class="text2">Data</span>
      <form @submit.prevent="addData">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control text-secondary"
              id="floatingInput"
              placeholder="date"
              v-model="date"
            />
            <label class="text-secondary" for="floatingInput">Date</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="name"
              class="form-control"
              id="floatingInput"
              placeholder="name"
              v-model="name"
            />
            <label for="floatingInput" class="text-secondary">Name...</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="atk"
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <label for="floatingSelect">selects</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="tel"
              class="form-control"
              id="floatingInput"
              placeholder="phone number"
              v-model="tel"
            />
            <label for="floatingInput" class="text-secondary"
              >Telephone.....</label
            >
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="email"
            />
            <label for="floatingInput" class="text-secondary"
              >Email address....</label
            >
          </div>

          <div class="d-grid gap-2 d-md-block">
            <button type="submit" class="btn">ADD DATA</button>
          </div>
        </div>
      </form>
      <div class="card-body">
        <table class="container table table-striped table-hover">
          <thead>
            <tr class="table table-success table-striped">
              <th scope="col">DATE</th>
              <th scope="col">NAME</th>
              <th scope="col">ATK result</th>
              <th scope="col">tel number</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in csDoc" :key="index" align="center">
              <td>{{ i.data.date1 }}</td>
              <td>{{ i.data.name1 }}</td>
              <td>{{ i.data.atkresult }}</td>
              <td>{{ i.data.telnumber }}</td>
              <td>{{ i.data.email1 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import db from "../plugin/firebase";
export default {
  data() {
    return {
      csDoc: [],
      name: "",
      email: "",
      atk: "",
      tel: "",
      date: "",
    };
  },
  beforeMount() {
    this.readData();
  },
  methods: {
    async addData() {
      try {
        this.csDoc = [];
        const docRef = await addDoc(collection(db, "covid"), {
          name1: this.name,
          email1: this.email,
          atkresult: this.atk,
          telnumber: this.tel,
          date1: this.date,
        });
        this.name = "";
        this.email = "";
        this.atk = "";
        this.tel = "";
        this.date = "";
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      this.csDoc = [];
      const q = query(collection(db, "covid"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
        // console.log("Current cities in CA: ", this.csDoc.join(", "));
      });
    },
  },
};
</script>

<style>
.body {
  background: rgb(255, 255, 255, 1);
}
.textdatacivid {
  text-align: left;
  width: auto;
  height: auto;
}
.btn {
  width: 200px;
  height: 60px;
  background: none;
  border: 4px solid;
  color: #0dd5f0;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 16px;
  position: relative;
}
.btn::before,
.btn::after {
  content: "";
  position: absolute;
  width: 14px;
  height: 4px;
  background: #fdffff;
  transform: skewX(50deg);
  transition: 0.4s linear;
}
.btn::before {
  top: -4px;
  left: 10%;
}
.btn::after {
  bottom: -4px;
  right: 10%;
}
.btn:hover::before {
  left: 80%;
}
.btn:hover::after {
  right: 80%;
}
.text {
  color: #fff;
  font-size: 60px;
  text-align: center;
  letter-spacing: 14px;
}
.text::before,
.text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: auto;
  z-index: -1;
}
.text::before {
  color: #0019fd;
  animation: glitch-effect 3s infinite;
}
.text::after {
  color: #ff0000;
  animation: glitch-effect 2s infinite;
}
@keyframes glitch-effect {
  0% {
    left: -2px;
    top: -2px;
  }
  25% {
    left: 2px;
    top: 0px;
  }
  50% {
    left: -1px;
    top: 2px;
  }
  75% {
    left: 1px;
    top: -1px;
  }
  100% {
    left: 0px;
    top: -2px;
  }
}
.container span {
  text-transform: uppercase;
  display: block;
  background: rgb(248, 245, 245);
}
.text1 {
  color: rgb(3, 3, 3);
  font-size: 60px;
  font-weight: 700;
  letter-spacing: 8px;
  margin-bottom: 0.5px;
  background: rgb(255, 254, 254);
  position: relative;
  animation: text 3s 1;
}
.text2 {
  font-size: 30px;
  color: #6ab04c;
}

@keyframes text {
  0% {
    color: black;
    margin-bottom: -40px;
  }
  30% {
    letter-spacing: 25px;
    margin-bottom: -40px;
  }
  85% {
    letter-spacing: 8px;
    margin-bottom: -40px;
  }
}

.floating-text {
  text-transform: uppercase;
  font-size: 80px;
  font-weight: 900;
  letter-spacing: 6px;
  color: #12f0dde5;
  transform: translateY(0);
  animation: fl1 3s infinite linear;
}
.floating-text::before {
  content: attr(data-text);
  position: absolute;
  color: rgba(13, 209, 243, 0.938);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  animation: fl2 3s infinite linear;
}
@keyframes fl1 {
  30% {
    transform: translateY(10%) rotate(4deg);
  }
  70% {
    transform: translateY(10%) rotate(-4deg);
  }
}
@keyframes fl2 {
  30% {
    clip-path: polygon(0 0, 100% 0, 100% 24%, 0 56%);
  }
  70% {
    clip-path: polygon(0 0, 100% 0, 100% 56%, 0 24%);
  }
}
</style>
