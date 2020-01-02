import React from 'react';
import {
  init,
  createGeometry,
  createCylinder,
  createSphere,
  initLinePoints
} from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.02,
      renderer: null,
      scene: null,
      camera: null,
      points: null,
      cylinder: null,
      sphere: null
    };
  }

  componentDidMount = () => {
    this.createLineAndPoints();
  };

  createParticles = () => {
    const points = createGeometry(0xffffff, 0.5, 2000);
    const start = init(points, { z: 50, y: 30, x: 35 });
    const viewer = document.getElementById('viewer');
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera,
      points
    });
    this.mainLoop();
  };

  createLineAndPoints = () => {
    const cylinder = createCylinder(0xffffff);
    const sphere = createSphere(0xffffff);
    const start = initLinePoints({ cylinder, sphere }, { z: 15 });
    const viewer = document.getElementById('viewer');
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera,
      cylinder,
      sphere
    });
    this.mainLoopLines();
  };

  mainLoop = () => {
    const { scene, camera, renderer, points } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      points !== null
    ) {
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  mainLoopLines = () => {
    const { ADD, scene, camera, renderer, cylinder, sphere } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      cylinder !== null &&
      sphere !== null
    ) {
      cylinder.rotation.x += ADD;
      sphere.rotation.x += ADD;

      cylinder.rotation.y += ADD;
      sphere.rotation.y += ADD;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoopLines);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
