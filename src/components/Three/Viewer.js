import * as THREE from 'three';

export default {

  init(data) {
    this.createRenderer(data);
    this.createCamera();
    this.createScene();
    this.createLight();

    this.update()
  },

  createRenderer(settings) {

    const up = 'ArrowUp'
    const down = 'ArrowDown'
    const left = 'ArrowLeft'
    const right = 'ArrowRight'

    let start = false

    const e = settings.object.obj

    if(this.renderer) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
      this.renderer.dispose()
    }
    this.renderer = new THREE.WebGLRenderer(settings.renderer)

    let canvasRenderer = this.renderer.domElement;

    canvasRenderer.id = 'canvas'

    settings.renderer.parent.appendChild(canvasRenderer)

    let canvas = document.getElementById('canvas');

    canvas.tabIndex="1"
    
    canvas.addEventListener('keydown', (event) => {
      console.log(e.object.rotation);
      
      if(event.key == ' '){
        start = !start
        this.addUpdate("rotate-object", ()=> {e.object.rotation.x -= .1})
      }

      if(start) {
        switch(event.key){
          case up: 
            this.addUpdate("rotate-object", ()=> {e.object.position.x -= .1})
            break;
          case down: 
            this.addUpdate("rotate-object", ()=> {e.object.position.x += .1})
            break;
          case left: 
            this.addUpdate("rotate-object", ()=> {e.object.position.y -= .1})
            break;
          case right: 
            this.addUpdate("rotate-object", ()=> {e.object.position.y += .1})
            break;
        }
      }
      
      else {
        this.removeUpdate("rotate-object")
      }

    });

    this.renderer.setClearColor(settings.clearColor || "green")
    
    this.renderer.setPixelRatio(settings.pixelRatio || devicePixelRatio)

    this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight)
  },

  createCamera() {
    
    this.camera = new THREE.PerspectiveCamera(
      45, 
      document.body.offsetWidth/document.body.offsetHeight,
      1,
      100
    )

  },

  createScene() {
    this.scene = new THREE.Scene()
  },

  createLight() {
    this.light1 = new THREE.DirectionalLight(0xffffff, .5)
    this.scene.add(this.light1)
    this.light1.position.set(5,5,5)
  },

  addUpdate(name, func) {
    this.updatePool[name] = func
  },

  removeUpdate(name) {
    delete this.updatePool[name]
  },

  updatePool : {},

  update() {
    this.renderer.render(this.scene, this.camera)

    var that = this

    requestAnimationFrame(() => {that.update()})

    for(let key in this.updatePool) this.updatePool[key]() 
  }
}