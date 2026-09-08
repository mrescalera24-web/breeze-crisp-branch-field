import * as THREE from "three";

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  visible: boolean;
};

type Piece = { image: string; name: string };

type Opts = {
  hats: Piece[];
  street: Piece[];
  vault: Piece[];
  reduced: boolean;
  onHotspots: (spots: Hotspot[]) => void;
  onReady: () => void;
};

const GOLD = 0xd4b06a;
const MIAMI = 0x3ee8d4;
const PURPLE = 0xb14cff;

function applyMap(loader: THREE.TextureLoader, url: string, m: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial, repeat?: number) {
  loader.load(url, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 2;
    if (repeat) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeat, repeat);
    }
    m.map = t;
    m.needsUpdate = true;
  });
}

function photo(loader: THREE.TextureLoader, url: string, w: number, h: number) {
  const group = new THREE.Group();
  const plate = new THREE.MeshBasicMaterial({ color: 0xffffff });
  applyMap(loader, url, plate);
  const img = new THREE.Mesh(new THREE.PlaneGeometry(w, h), plate);
  const trim = new THREE.Mesh(
    new THREE.PlaneGeometry(w + 0.08, h + 0.08),
    new THREE.MeshBasicMaterial({ color: GOLD }),
  );
  trim.position.z = -0.02;
  group.add(trim, img);
  return group;
}

function neon(color: number, w: number, h: number) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

function blobTex(r: number, g: number, b: number, inner = 0.45) {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const grd = ctx.createRadialGradient(32, 32, 2, 32, 32, 32);
  grd.addColorStop(0, `rgba(${r},${g},${b},${inner})`);
  grd.addColorStop(0.4, `rgba(${r},${g},${b},0.12)`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function cloud(count: number, tex: THREE.Texture, size: number, opacity: number, spread: THREE.Vector3) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread.x;
    pos[i * 3 + 1] = Math.random() * spread.y + 0.4;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
    seed[i] = Math.random() * Math.PI * 2;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  const pts = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      map: tex,
      size,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  pts.frustumCulled = false;
  return pts;
}

export function createHouse3d(canvas: HTMLCanvasElement, opts: Opts) {
  const mobile = window.innerWidth < 700;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x07080c, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07080c);
  scene.fog = new THREE.Fog(0x0a1018, 22, 42);

  const camera = new THREE.PerspectiveCamera(mobile ? 70 : 58, 1, 0.1, 50);
  camera.rotation.order = "YXZ";
  camera.position.set(0, 1.62, mobile ? 3.8 : 5.2);

  const loader = new THREE.TextureLoader();
  const W = 14;
  const D = 18;
  const H = 6.4;

  const floorM = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.14, metalness: 0.18 });
  applyMap(loader, "/scenes/room/marble.jpg", floorM, 5);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(22, 26), floorM);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const wallM = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0 });
  applyMap(loader, "/scenes/room/velvet.jpg", wallM);
  const mkWall = (w: number, h: number) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallM);
  const north = mkWall(W, H);
  north.position.set(0, H / 2, -D / 2);
  scene.add(north);
  const east = mkWall(D, H);
  east.position.set(W / 2, H / 2, 0);
  east.rotation.y = Math.PI / 2;
  scene.add(east);
  const west = mkWall(D, H);
  west.position.set(-W / 2, H / 2, 0);
  west.rotation.y = -Math.PI / 2;
  scene.add(west);
  const south = mkWall(W, H);
  south.position.set(0, H / 2, D / 2);
  south.rotation.y = Math.PI;
  scene.add(south);

  const ceilM = new THREE.MeshStandardMaterial({ color: 0x0c0c12, roughness: 0.9, metalness: 0 });
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(20, 24), ceilM);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = H;
  scene.add(ceil);

  const card = photo(loader, "/scenes/room/card.jpg", 6.4, 3.4);
  card.position.set(0, 2.55, -D / 2 + 0.08);
  scene.add(card);

  const graffiti = photo(loader, "/scenes/room/graffiti.jpg", 2.4, 1.8);
  graffiti.position.set(-W / 2 + 0.08, 3.5, 0);
  graffiti.rotation.y = -Math.PI / 2;
  scene.add(graffiti);

  const jesus = photo(loader, "/scenes/room/jesus.jpg", 1.3, 1.8);
  jesus.position.set(-W / 2 + 0.08, 2.4, -4.2);
  jesus.rotation.y = -Math.PI / 2;
  scene.add(jesus);

  const hats = opts.hats.slice(0, 12);
  hats.forEach((p, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const f = photo(loader, p.image, 1.15, 1.15);
    f.position.set(W / 2 - 0.08, 1.15 + row * 1.45, -4.4 + col * 2.2);
    f.rotation.y = Math.PI / 2;
    scene.add(f);
  });

  opts.street.slice(0, 6).forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const f = photo(loader, p.image, 1.35, 1.7);
    f.position.set(-4.2 + col * 2.1, 1.4 + row * 2.05, D / 2 - 0.08);
    f.rotation.y = Math.PI;
    scene.add(f);
  });

  opts.vault.slice(0, 8).forEach((p, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const f = photo(loader, p.image, 1.05, 1.3);
    f.position.set(-W / 2 + 0.08, 1.15 + row * 1.55, -1.8 + col * 2.05);
    f.rotation.y = -Math.PI / 2;
    scene.add(f);
  });

  const gold = new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.35, metalness: 0.4 });
  const shaftGeo = new THREE.CylinderGeometry(0.22, 0.26, 5.6, 10);
  const capGeo = new THREE.CylinderGeometry(0.38, 0.26, 0.22, 10);
  const shaftM = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.2 });
  applyMap(loader, "/scenes/room/marble.jpg", shaftM, 1);
  for (const z of [-5.2, 0, 5.2]) {
    for (const x of [-3.4, 3.4]) {
      const g = new THREE.Group();
      const shaft = new THREE.Mesh(shaftGeo, shaftM);
      shaft.position.y = 2.85;
      const cap = new THREE.Mesh(capGeo, gold);
      cap.position.y = 5.7;
      g.add(shaft, cap);
      g.position.set(x, 0, z);
      scene.add(g);
    }
  }

  const caseM = new THREE.MeshStandardMaterial({ color: 0x0c0c10, roughness: 0.5, metalness: 0.08 });
  [-2.2, 2.2].forEach((z) => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 0.9), caseM);
    box.position.set(0, 0.35, z);
    const rim = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.04, 0.96), gold);
    rim.position.set(0, 0.72, z);
    scene.add(box, rim);
  });
  opts.hats.slice(0, 2).forEach((p, i) => {
    const f = photo(loader, p.image, 0.7, 0.7);
    f.position.set(0, 1.05, i === 0 ? -2.2 : 2.2);
    f.rotation.x = -0.45;
    scene.add(f);
  });

  const strip = (color: number, x: number, y: number, z: number, w: number, rotY: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, 0.04), neon(color, 1, 1));
    m.position.set(x, y, z);
    m.rotation.y = rotY;
    scene.add(m);
  };
  strip(MIAMI, 0, H - 0.15, -D / 2 + 0.1, W - 1, 0);
  strip(GOLD, W / 2 - 0.1, H - 0.15, 0, D - 1, Math.PI / 2);
  strip(PURPLE, -W / 2 + 0.1, H - 0.15, 0, D - 1, Math.PI / 2);
  strip(MIAMI, 0, 0.08, 0, 8, 0);

  const laserGroup = new THREE.Group();
  const laserGeo = new THREE.CylinderGeometry(0.012, 0.012, 16, 6);
  const laserCols = [MIAMI, GOLD, PURPLE, 0xffffff];
  laserCols.forEach((c, i) => {
    const m = new THREE.Mesh(
      laserGeo,
      new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    m.rotation.z = (i - 1.5) * 0.18;
    m.rotation.x = 0.55;
    m.position.y = 4.2;
    laserGroup.add(m);
  });
  laserGroup.position.set(0, 0, -1);
  scene.add(laserGroup);

  const smokeTex = blobTex(40, 180, 190, 0.35);
  const moteTex = blobTex(255, 220, 160, 0.55);
  const smoke = cloud(mobile ? 50 : 90, smokeTex, 1.4, 0.16, new THREE.Vector3(12, 5, 14));
  const motes = cloud(mobile ? 60 : 110, moteTex, 0.16, 0.4, new THREE.Vector3(10, 5, 12));
  scene.add(smoke, motes);

  scene.add(new THREE.AmbientLight(0x1c2433, 0.55));
  scene.add(new THREE.HemisphereLight(0x3ee8d4, 0x08060c, 0.28));
  const chandelier = new THREE.PointLight(GOLD, 10, 12, 1.8);
  chandelier.position.set(0, 4.8, -6);
  scene.add(chandelier);
  const teal = new THREE.PointLight(MIAMI, 8, 12, 1.8);
  teal.position.set(-4, 2.4, 1);
  scene.add(teal);
  const fill = new THREE.PointLight(0xffe6c0, 6, 10, 2);
  fill.position.set(3.5, 2.2, 2);
  scene.add(fill);

  const anchors: { id: string; label: string; pos: THREE.Vector3 }[] = [
    { id: "altar", label: "The house", pos: new THREE.Vector3(0, 2.2, -7.5) },
    { id: "gorras", label: "Gorras", pos: new THREE.Vector3(5.8, 1.8, 0) },
    { id: "street", label: "Street", pos: new THREE.Vector3(0, 2, 7.5) },
    { id: "saints", label: "Vault", pos: new THREE.Vector3(-5.8, 1.8, 0) },
  ];

  let yaw = 0;
  let pitch = 0.04;
  let targetYaw = 0;
  let targetPitch = 0.04;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let touched = false;
  let lastSpots = "";
  let signaled = false;
  let lastT = performance.now();
  const origin = lastT;
  const ndc = new THREE.Vector3();
  const look = new THREE.Vector3();
  const kLook = () => ((camera.fov * Math.PI) / 180 / Math.max(1, canvas.clientHeight)) * 0.5;

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.05 : 1.25);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  };

  const onDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragging = true;
    touched = true;
    lastX = e.clientX;
    lastY = e.clientY;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* */
    }
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const k = kLook();
    targetYaw -= Math.max(-36, Math.min(36, e.clientX - lastX)) * k;
    targetPitch -= Math.max(-36, Math.min(36, e.clientY - lastY)) * k;
    targetPitch = Math.max(-0.32, Math.min(0.28, targetPitch));
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onUp = (e: PointerEvent) => {
    dragging = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      /* */
    }
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());

  let raf = 0;
  let alive = true;

  const drift = (pts: THREE.Points, t: number, rise: number, swirl: number) => {
    const pos = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const seed = pts.geometry.getAttribute("aSeed") as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const s = seed.getX(i);
      let y = pos.getY(i) + rise;
      if (y > 5.6) y = 0.3;
      pos.setXYZ(i, pos.getX(i) + Math.sin(t * 0.3 + s) * swirl, y, pos.getZ(i) + Math.cos(t * 0.24 + s) * swirl);
    }
    pos.needsUpdate = true;
  };

  const tick = (now: number) => {
    if (!alive) return;
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    const t = (now - origin) / 1000;
    if (!opts.reduced && !touched) targetYaw += Math.sin(t * 0.16) * 0.0002;
    const follow = 1 - Math.exp(-10 * dt);
    yaw += (targetYaw - yaw) * follow;
    pitch += (targetPitch - pitch) * follow;
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
    if (!opts.reduced) {
      laserGroup.rotation.y = t * 0.25;
      chandelier.intensity = 9 + Math.sin(t * 2) * 1.5;
      teal.intensity = 7 + Math.sin(t * 0.9) * 1.5;
      drift(smoke, t, 0.18 * dt, 0.01);
      drift(motes, t, 0.3 * dt, 0.007);
    }

    const spots: Hotspot[] = anchors.map((a) => {
      ndc.copy(a.pos).project(camera);
      camera.getWorldDirection(look);
      const to = a.pos.clone().sub(camera.position).normalize();
      const facing = look.dot(to) > 0.22 && ndc.z < 1;
      return {
        id: a.id,
        label: a.label,
        x: (ndc.x * 0.5 + 0.5) * 100,
        y: (-ndc.y * 0.5 + 0.5) * 100,
        visible: facing && ndc.x > -1.15 && ndc.x < 1.15 && ndc.y > -1.15 && ndc.y < 1.15,
      };
    });
    const key = spots.map((s) => `${s.id}:${s.visible ? 1 : 0}:${s.x | 0}:${s.y | 0}`).join("|");
    if (key !== lastSpots) {
      lastSpots = key;
      opts.onHotspots(spots);
    }

    renderer.render(scene, camera);
    if (!signaled) {
      signaled = true;
      opts.onReady();
    }
    if (!document.hidden) raf = requestAnimationFrame(tick);
  };

  const onVis = () => {
    if (!document.hidden && alive) raf = requestAnimationFrame(tick);
  };
  document.addEventListener("visibilitychange", onVis);
  resize();
  raf = requestAnimationFrame(tick);
  window.addEventListener("resize", resize);

  return {
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      smokeTex.dispose();
      moteTex.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
    },
  };
}
