<template lang='pug'>
  div
    .allGame(id='allGame')

      span(style="font: 25px monospace; font-weight: 800") XO Game
      br
      br

      //Выбор игрока
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
      
      //Показывает чья очередь ходить
      div(v-if="show == true" style="font: 25px monospace;") Ход игрока '{{ player }}'
      br

      //Поле игры
      div(style="display:flex; justify-content: center;")
        .block#block
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
      
      //Кнопка сброса
      div(style="display:flex; justify-content: center;")
        button.reset(@click="reset") Сброс
      
    //Меню победы/ничьи
    .winMenu(v-if="dialog") 
      span 🎆✨ Вы победитель ✨🎆  
      button(@click="closeMenu") Закрыть
</template>

<script>

export default {
  
  name: "HelloWorld",
  
  data() {
    return {
      player: "",
      show: false,
      dialog: null,
      win: [],
      disabledField:true,
      generateArray:[0,1,2,3,4,5,6,7,8],
    };
  },

  mounted() {
    document.getElementById('block').classList.add('disabledbutton')
  },

  computed: {},

  methods: {

    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    
    //Выбор игрока(Х/О)
    getPlayer(name) {
      if (name === "X") this.player = "X";
      else this.player = "O";
      this.show = true;
      document.getElementById('block').classList.remove('disabledbutton')
    },

    //рисовка крестиков и ноликов на поле
    setPlayer(id) {
      document.getElementById(id).innerHTML = this.player;
      document.getElementById(id).classList.add("disabledbutton");
      if (this.player == "X") {
        this.player = "O";
      } else if (this.player == "O") this.player = "X";
      
      //Ход компьютера
      this.machineGame()

      //вызов метода который проводит проверку на наличие свопадение с выигрышними стратегниями 
      this.watchChange();
    },

    //Сброс(начать игру заного)
    reset() {
      for (let i = 1; i < 10; i++) {
        document.getElementById(`n${i}`).innerHTML = "";
        document.getElementById(`n${i}`).classList.remove("disabledbutton");
      }
      this.show = false;
      this.player = "";
      document.getElementById('block').classList.add('disabledbutton')
    },

    //проверка на наличие свопадение с выигрышними стратегниями
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
            search[8].innerHTML == xo[i]) ||
          (search[2].innerHTML == xo[i] &&
            search[4].innerHTML == xo[i] &&
            search[6].innerHTML == xo[i])
        ) {
          this.dialog = true;
          //Для disebale фона когда открывается меню победы
          document.getElementById("allGame").classList.add("disabledMenu");
        } else this.emptiness()
      }
    },

    emptiness(){
      let box = document.getElementsByClassName("field");
      for(let i = 0; i < box.length; i++){        
        if(box[i].innerHTML == ''){
          console.log("Занято");
        }
      }
    },

    closeMenu(){
      this.dialog = false
      //сброс disebale с фона
      document.getElementById("allGame").classList.remove("disabledMenu");
      this.reset()
    },

    machineGame(){

    }
  },
};
</script>

<style scoped>
.reset {
  margin-bottom: 5vh;
  background: conic-gradient(orange, red, orange, red, orange);
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  font: 20px monospace;
  position: fixed;
  bottom: 0;
}
.allGame {
  box-shadow: 15px 10px 30px #000;
  padding: 20px 60px 60px 60px;
  width: 50vw;
  height: 60vh;
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
  position: fixed;
  bottom: 0;
  margin:  0 auto 100px auto;
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
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.disabledbutton {
  pointer-events: none;
}
.disabledMenu{
  pointer-events: none;
}
.winMenu{
  position:absolute;
  width: 85%;
  height: 35%;
  background: linear-gradient(grey, rgb(228, 228, 228), grey);
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 100px #000;
}
.winMenu span{
  color: #fff;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  font: 18px monospace;
  /* text-shadow: 1px 1px 0px orange,
   -1px 1px 0px orange,
   1px -1px 0px orange,
   -1px -1px 0px orange; */
}
.winMenu button{
  margin: 20px;
  border-radius: 10px;
  font: 25px monospace;
  box-shadow: 7px 5px 10px #000;
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
