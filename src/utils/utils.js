import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  PointsMaterial,
  Geometry,
  Vector3,
  Points,
  AmbientLight,
  PointLight,
  CylinderGeometry,
  SphereGeometry,
  Line
} from 'three';

const randomInRange = (from, to) => Math.random() * (to - from);

const createGeometry = (color, size, numberOfPoints) => {
  const material = new PointsMaterial({ color: Math.random() * color, size });
  const geometry = new Geometry();

  for (let i = 1; i <= numberOfPoints; i += 1) {
    const x = randomInRange(-35, 35);
    const y = randomInRange(-35, 35);
    const z = randomInRange(-35, 35);
    geometry.vertices.push(new Vector3(x, y, z));
  }
  geometry.computeBoundingSphere();
  return new Points(geometry, material);
};

const createCylinder = (color) => {
  // let material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1});

  // let material = new THREE.LineDashedMaterial({color: 0xffffff, linewidth: 1,
  //                      dashSize: 5, gapSize: 1
  //                 });

  const material = new PointsMaterial({ color: Math.random() * color });

  const geometry = new CylinderGeometry(3, 2, 4);
  const cylinder = new Line(geometry, material);
  // const cylinder = new Points(geometry, material);
  cylinder.position.z = -10;
  cylinder.position.x = -5;

  cylinder.computeLineDistances();
  return cylinder;
};

const createSphere = (color) => {
  // let material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1});

  // let material = new THREE.LineDashedMaterial({color: 0xffffff, linewidth: 1,
  //                      dashSize: 5, gapSize: 1
  //                 });

  const material = new PointsMaterial({ color: Math.random() * color });

  const geometry = new SphereGeometry(3, 2, 4);
  const sphere = new Line(geometry, material);

  sphere.position.z = 0;
  sphere.position.x = 5;
  sphere.computeLineDistances();

  return sphere;
};

const init = (points, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0x000000);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;
  camera.position.y = position.y;
  camera.position.x = position.x;

  const light = new AmbientLight(0xffffff, 0.5);
  scene.add(light);

  const light2 = new PointLight(0xffffff, 0.5);
  scene.add(light2);

  scene.add(points);
  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera };
};

const initLinePoints = (geometry, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0x000000);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;

  const light = new AmbientLight(0xffffff, 0.5);
  scene.add(light);

  const light2 = new PointLight(0xffffff, 0.5);
  scene.add(light2);

  Object.entries(geometry).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera };
};

export { init, createGeometry, createCylinder, createSphere, initLinePoints };
