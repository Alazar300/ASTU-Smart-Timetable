import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js";

const container = document.getElementById("astu-3d-logo");

if (container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45, 1, 0.1, 100
  );
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const gold = new THREE.MeshStandardMaterial({
    color: 0xD6AE59,
    metalness: 0.85,
    roughness: 0.25
  });

  const loader = new THREE.TextureLoader();

  loader.load(
    "images/astu-logo.jpg",
    (logo) => {
      logo.colorSpace = THREE.SRGBColorSpace;

      const front = new THREE.MeshStandardMaterial({
        map: logo,
        transparent: true,
        metalness: 0.15,
        roughness: 0.4
      });

      const back = new THREE.MeshStandardMaterial({
        color: 0x142B4F,
        metalness: 0.7,
        roughness: 0.3
      });

      const geometry = new THREE.CylinderGeometry(
        1.25, 1.25, 0.16, 96
      );

      const coin = new THREE.Mesh(
        geometry,
        [gold, front, back]
      );

      coin.rotation.x = Math.PI / 2;
      scene.add(coin);

      const light = new THREE.DirectionalLight(
        0xffffff, 3
      );
      light.position.set(2, 3, 4);
      scene.add(light);

      scene.add(
        new THREE.AmbientLight(0xffffff, 1)
      );

      function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (!width || !height) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }

      resize();
      window.addEventListener("resize", resize);

      function animate() {
        requestAnimationFrame(animate);

        coin.rotation.y += 0.008;

        renderer.render(scene, camera);
      }

      animate();
    },
    undefined,
    (error) => {
      console.error("ASTU logo could not load:", error);
    }
  );
}