import * as THREE from 'three';

export default {
  
  init(data) {
    this.createResize();

    this.createRenderer(data);
    this.createCamera();
    this.createScene();
    this.createLight();


    this.update();
  },
  
  createRenderer(settings) {

    let mouseSize = 0 

    const cube = settings.object.obj

    if (this.renderer) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);

      this.renderer.dispose();
    }

    this.renderer = new THREE.WebGLRenderer(settings.renderer);

    settings.renderer.parent.appendChild(this.renderer.domElement);

    this.renderer.setClearColor(settings.renderer.clearColor || "black");

    this.renderer.setPixelRatio(settings.renderer.pixelRatio || devicePixelRatio)

    var that = this;

    this.addResize("resize_render", () => {
      that.renderer.setSize(
        that.renderer.domElement.parentNode.offsetWidth,
        that.renderer.domElement.parentNode.offsetHeight
      );
    });
    this.resizePool["resize_render"]();

    
    let canvasRenderer = this.renderer.domElement;
    
    canvasRenderer.id = 'canvas'
    
    let canvas = document.getElementById('canvas')
    
    canvas.tabIndex="1"
    
    canvas.addEventListener("mousewheel", (event) => {
      mouseSize = mouseSize + event.deltaY
      console.log(mouseSize);
      if(mouseSize > 100 && mouseSize <= 10000 ) {
        cube.object.position.z = -(mouseSize/100)
      }
      else if (mouseSize > 100) {
        mouseSize = 200
      }
      else if (mouseSize <= 10000) {
        mouseSize = 10000
      }
      // switch (mouseSize) {
      //   case 100:
      //     break;
      //   case 200:
      //     cube.object.position.z = -2
      //     break;
      //   case 300:
      //     cube.object.position.z = -3
      //     break;
      //   case 400:
      //     cube.object.position.z = -4
      //     break;
      //   case 500:
      //     cube.object.position.z = -5
      //     break;
      // }


    })



  },
  
  createResize() {
    var that = this;
    window.addEventListener("resize", () => { that.resize(); });


  },
  
  resizePool: {},
  
  addResize(name, func) {
    this.resizePool[name] = func;
  },
  
  removeRize(name) {
    delete this.resizePool[name];
  },
  
  resize() {
    for (var key in this.resizePool) this.resizePool[key]();
  },
  
  createCamera() {

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.renderer.domElement.width / this.renderer.domElement.height,
      1,
      100
    )

    var that = this;

    this.addResize("resize_camera", () => {
      that.camera.aspect = that.renderer.domElement.width / that.renderer.domElement.height;

      that.camera.updateProjectionMatrix();
    });
  },
  
  createScene() {

    this.scene = new THREE.Scene();
  },
  
  createLight() {
    this.light1 = new THREE.DirectionalLight(0xffffff, .5);

    this.scene.add(this.light1);

    this.light1.position.set(5, 5, 5);
  },
  
  addUpdate(name, func) {
    this.updatePool[name] = func;
  },
  
  removeUpdate(name) {
    delete this.updatePool[name];
  },
  
  updatePool: {},
  
  update() {

    this.renderer.render(this.scene, this.camera);

    var that = this;

    requestAnimationFrame(() => { that.update(); });

    for (var key in this.updatePool) this.updatePool[key]();
  }
}