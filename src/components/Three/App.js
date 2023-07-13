import Viewer from './Viewer.js';
import * as THREE from 'three';

export default class {
  constructor() {
    Viewer.init({
      renderer: {
        parent: document.body,
        antialias: true,
        alpha: false,
        clearColor: "gray",
        pixelRatio: 2
      },
      object: {
        obj: this
      }
    })
    this.createObject();
  }

  createObject() {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshStandardMaterial({color:"blue"})
    )

    Viewer.scene.add(this.object)

    this.object.position.z = -5

    // var that = this
    
    // Viewer.addUpdate( 
    //   "rotate-object", 
    //   ()=> {
        
    //     that.object.rotation.x += .01
    //     that.object.rotation.y += .01
    //     that.object.rotation.z += .01
      
    // })
  }
}