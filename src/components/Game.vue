<template lang="pug">
  canvas(ref="canvas" tabindex='1' width="608" height="608" @keydown='movement')
</template>

<script>

const up = 'ArrowUp'
const down = 'ArrowDown'
const left = 'ArrowLeft'
const right = 'ArrowRight'

export default {
  
  name: "GamePage",
  
  data: () => ({
    x: 1,
    y: 1,
    pressKey: null

  }),
  
  mounted() {
    this.draw()
  },
  
  methods: {

    draw() {

      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      // Размер
      let box = 32;

      // количесво набранных очков
      let score = 0;

      // Рандомное появление еды на карте игры
      // let food = {
      //   x: Math.floor((Math.random() * 17 + 1)) * box,
      //   y: Math.floor((Math.random() * 15 + 3)) * box,
      // };

      // Изначальная змейка
      let snake = [1,1,1,1];
      
      // Изначальное координаты появление змейки на карте 
      snake[0] = {
        x: 9 * box,
        y: 10 * box
      };

      const drive = () => { 
        
        for(let i = 0; i < snake.length; i++) {
          ctx.fillStyle = i == 0 ? "green" : "red";
          ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(score, box * 2.5, box * 1.7);

        // let snakeX = snake[0].x;
        // let snakeY = snake[0].y;



        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, 10, 10);

        if(this.pressKey) {

          if(this.pressKey == up) {
            this.y --
          }
  
          else if(this.pressKey == down) {
            this.y ++
          }
          
          else if(this.pressKey == left) {
            this.x --
          }
  
          else if(this.pressKey == right) {
            this.x ++
          }

        }

        if (this.x == 300) {
          this.x = 0
        }

        else if (this.x == 0) {
          this.x = 300
        }
        
        if(this.y == 150) {
          this.y = 0
        }

        else if (this.y == 0) {
          this.y = 150
        }

    
        requestAnimationFrame(drive); 
      };

      drive();

    },

    movement(ev) {

      if(ev.key == up) {
        this.pressKey = up
      }

      if(ev.key == down) {
        this.pressKey = down
      }

      if(ev.key == left) {
        this.pressKey = left
      }

      if(ev.key == right) {
        this.pressKey = right
      } 
    }
  }

}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>