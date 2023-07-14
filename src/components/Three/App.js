import Viewer from './Viewer.js';
import * as THREE from 'three';

export default class {
  constructor() {
    Viewer.init(
      {
        renderer: {
          parent: document.body,
          antialias: true,
          alpha: false,
          clearColor: "green",
          pixelRatio: 1
        },

        object: {
          obj: this
        }
      }
    );
    this.createObject();
  }
  createObject() {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: "gray" })
    )
    this.object.position.z = -5;

    Viewer.scene.add(this.object);

    var that = this;

    Viewer.addUpdate(
      "rotate_object",
      () => { that.object.rotation.y += .01; }
    )
  }
}