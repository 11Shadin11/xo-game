<template lang='pug'>
.allGame
  .dialog(v-if="dialog")
  span(style="font: 17px monospace; font-weight: 900") Крестики - нолики

  br
  br
  div(v-if="show == false")
    span(style="font-family: monospace; font-weight: 800") Кем будете ходить ?
    br
    br
    div(style="display: flex; justify-content: center")
      #player1.player(@click="getPlayer('X')") X
      span(
        style="font: 40px monospace; text-align: center; padding: 0 15px 0 15px"
      ) /
      #player2.player(@click="getPlayer('O')") O
  div(v-if="show == true") Ход игрока '{{ player }}'
  br
  div
    .block
      .all
        #n1.field(@click="setPlayer('n1')")
        #n2.field(@click="setPlayer('n2')")
        #n3.field(@click="setPlayer('n3')")
      .all
        #n4.field(@click="setPlayer('n4')")
        #n5.field(@click="setPlayer('n5')")
        #n6.field(@click="setPlayer('n6')")
      .all
        #n7.field(@click="setPlayer('n7')")
        #n8.field(@click="setPlayer('n8')")
        #n9.field(@click="setPlayer('n9')")
  div(style="display: flex; justify-content: center")
    button.button(@click="reset") Сброс
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      player: "",
      show: false,
      dialog: false,
      win: [],
    };
  },
  mounted() {},
  computed: {},
  methods: {
    getPlayer(name) {
      if (name === "X") this.player = "X";
      else this.player = "O";
      this.show = true;
    },
    setPlayer(id) {
      document.getElementById(id).innerHTML = this.player;
      document.getElementById(id).classList.add("disabledbutton");
      if (this.player == "X") {
        this.player = "O";
      } else if (this.player == "O") this.player = "X";
      this.watchChange();
    },
    reset() {
      for (let i = 1; i < 10; i++) {
        document.getElementById(`n${i}`).innerHTML = "";
        document.getElementById(`n${i}`).classList.remove("disabledbutton");
      }
      this.show = false;
      this.player = "";
    },
    watchChange() {
      let search = document.getElementsByClassName("field");
      let xo = ["X", "O"];
      for (let i = 0; i < xo.length; i++) {
        if (
          (search[0].innerHTML == xo[i] &&
            search[1].innerHTML == xo[i] &&
            search[2].innerHTML == xo[i]) ||
          (search[3].innerHTML == xo[i] &&
            search[4].innerHTML == xo[i] &&
            search[5].innerHTML == xo[i]) ||
          (search[6].innerHTML == xo[i] &&
            search[7].innerHTML == xo[i] &&
            search[8].innerHTML == xo[i]) ||
          (search[0].innerHTML == xo[i] &&
            search[3].innerHTML == xo[i] &&
            search[6].innerHTML == xo[i]) ||
          (search[2].innerHTML == xo[i] &&
            search[5].innerHTML == xo[i] &&
            search[8].innerHTML == xo[i]) ||
          (search[1].innerHTML == xo[i] &&
            search[4].innerHTML == xo[i] &&
            search[7].innerHTML == xo[i]) ||
          (search[0].innerHTML == xo[i] &&
            search[4].innerHTML == xo[i] &&
            search[8].innerHTML == xo[i])
        ) {
          // alert("WINNER");
          this.dialog = true;
        } else console.log("LOH");
      }
    },
  },
};
</script>

<style scoped>
.button {
  margin: 20px;
  background: conic-gradient(orange, red, orange, red, orange);
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  font: 20px monospace;
}
.button:hover {
  margin-top: -10px;
  box-shadow: 15px 10px 20px #000;
  transform: scale(1.1);
}
.allGame {
  box-shadow: 15px 10px 30px #000;
  padding: 20px 60px 60px 60px;
  width: 165px;
  height: 310px;
  border: 5px solid;
  border-radius: 15px;
}
.player {
  border-radius: 10px;
  border: 1px solid;
  width: 50px;
  height: 50px;
  font: 40px monospace;
  text-align: center;
}
input {
  font: 40px monospace;
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
}
.block {
  border-radius: 15px;
  border: 5px solid orange;
}
.all {
  display: flex;
}
.field {
  font: 40px monospace;
  border-radius: 10px;
  border: 1px solid;
  width: 50px;
  height: 50px;
}
.disabledbutton {
  pointer-events: none;
}
.dialog {
  color: #fff;
  font: 30px monospace;
  border-radius: 100%;
  border: 5px solid #444;
  background: conic-gradient(red, blue, green, red);
  width: 250px;
  height: 250px;
  position: absolute;
  animation: spin 1.4s linear infinite;
}
.dialog::before {
  content: "";
  position: absolute;
  width: 85%;
  height: 85%;
  border-radius: 50%;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 150px -70px grey;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
