import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { FloorProduct } from "@/lib/floor";

const GOLD = "#D4AF37";
const ORBIT = new THREE.Vector3(0, 1.2, 0);

function marbleMap() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0b0b0c";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 18; i++) {
    ctx.strokeStyle = `rgba(220,220,225,${0.05 + Math.random() * 0.1})`;
    ctx.lineWidth = 0.5 + Math.random() * 2;
    ctx.beginPath();
    let x = Math.random() * 512;
    let y = 0;
    ctx.moveTo(x, y);
    for (let s = 0; s < 6; s++) {
      x += (Math.random() - 0.5) * 140;
      y += 512 / 6;
      ctx.bezierCurveTo(x + 40, y - 40, x - 40, y - 20, x, y);
    }
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function signMap() {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const g = ctx.createLinearGradient(0, h * 0.22, 0, h * 0.52);
  g.addColorStop(0, "#f6e6a8");
  g.addColorStop(0.5, GOLD);
  g.addColorStop(1, "#8a6a1e");
  ctx.fillStyle = g;
  ctx.shadowColor = GOLD;
  ctx.shadowBlur = 22;
  ctx.font = "700 92px Georgia, serif";
  ctx.fillText("LA CASA", w / 2, h * 0.32);
  ctx.fillText("TRIPLEJ", w / 2, h * 0.5);
  ctx.shadowBlur = 8;
  ctx.font = "400 28px Helvetica, Arial, sans-serif";
  ctx.fillStyle = "rgba(238,230,207,0.88)";
  ctx.fillText("M  O  N  T  R  O  S  E", w / 2, h * 0.66);
  ctx.font = "italic 400 34px Georgia, serif";
  ctx.fillStyle = "rgba(212,175,55,0.92)";
  ctx.fillText("Dios sobre todo.", w / 2, h * 0.82);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function miamiMap() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 768;
  const ctx = c.getContext("2d")!;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 140px Georgia, serif";
  ctx.fillStyle = "#00f5d4";
  ctx.shadowColor = "#00f5d4";
  ctx.shadowBlur = 36;
  ctx.fillText("MIAMI", 256, 384);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function haloMap() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(256, 230, 8, 256, 230, 240);
  g.addColorStop(0, "rgba(255,244,212,0.9)");
  g.addColorStop(0.4, "rgba(255,220,150,0.28)");
  g.addColorStop(1, "rgba(255,220,150,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "rgba(212,175,55,0.45)";
  for (let r = 50; r < 220; r += 24) {
    ctx.beginPath();
    ctx.arc(256, 230, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  return t;
}

function Gold() {
  return <meshStandardMaterial color={GOLD} metalness={0.88} roughness={0.28} />;
}

function Piece({
  product,
  position,
  selected,
  onPick,
}: {
  product: FloorProduct;
  position: [number, number, number];
  selected: boolean;
  onPick: () => void;
}) {
  const tex = useTexture(product.image);
  tex.colorSpace = THREE.SRGBColorSpace;
  const g = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((_, dt) => {
    const m = g.current;
    if (!m) return;
    const t = performance.now() / 1000;
    m.position.y = position[1] + Math.sin(t * 1.5 + phase) * 0.03;
    m.rotation.y += dt * 0.35;
    const s = selected ? 1.08 : 1;
    m.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
  });
  return (
    <group ref={g} position={position} onClick={(e) => { e.stopPropagation(); onPick(); }}>
      <mesh>
        <planeGeometry args={[0.62, 0.78]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[0.7, 0.86]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
    </group>
  );
}

function Curtain({ x, rotY }: { x: number; rotY: number }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(1.6, 3.6, 12, 20);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const fold = Math.sin(vx * 6.5) * 0.05 + Math.sin(vx * 2.1 + 1) * 0.03;
      pos.setZ(i, fold * (0.4 + 0.6 * ((vy + 1.8) / 3.6)));
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh geometry={geo} position={[x, 1.8, 0.15]} rotation={[0, rotY, 0]}>
      <meshStandardMaterial color="#0c0b0e" roughness={0.95} metalness={0.04} />
    </mesh>
  );
}

function Island({
  x,
  rotY,
  items,
  selected,
  onPick,
}: {
  x: number;
  rotY: number;
  items: FloorProduct[];
  selected: string | null;
  onPick: (p: FloorProduct) => void;
}) {
  return (
    <group position={[x, 0, 0.5]} rotation={[0, rotY, 0]}>
      <mesh position={[0, 0.36, 0] } castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.72, 0.95]} />
        <meshStandardMaterial color="#121213" roughness={0.22} metalness={0.25} />
      </mesh>
      <mesh position={[0, 1.12, 0]}>
        <boxGeometry args={[1.62, 0.82, 0.82]} />
        <meshStandardMaterial color="#9fb3b0" transparent opacity={0.14} roughness={0.08} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.52, 0.4]}>
        <boxGeometry args={[1.55, 0.02, 0.02]} />
        <meshBasicMaterial color="#FFE8A3" />
      </mesh>
      {items.slice(0, 3).map((p, i) => (
        <Piece
          key={p.slug}
          product={p}
          position={[-0.46 + i * 0.46, 1.18, 0.08]}
          selected={selected === p.slug}
          onPick={() => onPick(p)}
        />
      ))}
    </group>
  );
}

function Shrine() {
  const halo = useMemo(() => haloMap(), []);
  return (
    <group position={[0, 0, -1.8]}>
      <mesh position={[0, 1.55, 0.32]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[1.02, 0.08, 12, 32, Math.PI]} />
        <Gold />
      </mesh>
      {[-1.02, 1.02].map((x) => (
        <mesh key={x} position={[x, 0.78, 0.32]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 1.55, 16]} />
          <Gold />
        </mesh>
      ))}
      <mesh position={[0, 1.32, -0.5]}>
        <planeGeometry args={[2.05, 2.05]} />
        <meshBasicMaterial map={halo} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, 0.55, -0.28]} castShadow>
        <coneGeometry args={[0.26, 0.82, 20]} />
        <meshStandardMaterial color="#E8C766" metalness={0.8} roughness={0.22} emissive="#3a2c08" emissiveIntensity={0.28} />
      </mesh>
      <mesh position={[0, 1.08, -0.28]}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color="#E8C766" metalness={0.8} roughness={0.22} />
      </mesh>
      <mesh position={[0, 1.16, -0.28]} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[0.19, 0.018, 8, 24]} />
        <Gold />
      </mesh>
    </group>
  );
}

export function StorefrontScene({
  hats,
  street,
  selected,
  onPick,
  cam,
}: {
  hats: FloorProduct[];
  street: FloorProduct[];
  selected: string | null;
  onPick: (p: FloorProduct) => void;
  cam: "default" | "hats" | "collabs";
}) {
  const marble = useMemo(() => marbleMap(), []);
  const sign = useMemo(() => signMap(), []);
  const miami = useMemo(() => miamiMap(), []);
  const { camera } = useThree();

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    if (cam === "hats") {
      camera.position.lerp(new THREE.Vector3(-1.15, 1.45, 3.9), 1 - Math.exp(-4 * d));
    } else if (cam === "collabs") {
      camera.position.lerp(new THREE.Vector3(1.15, 1.45, 3.9), 1 - Math.exp(-4 * d));
    } else {
      camera.position.lerp(new THREE.Vector3(0, 1.4, 4.5), 1 - Math.exp(-4 * d));
    }
  });

  return (
    <>
      <color attach="background" args={["#050506"]} />
      <fog attach="fog" args={["#050506", 8, 18]} />
      <ambientLight intensity={0.55} color="#33405a" />
      <hemisphereLight args={["#22283a", "#090807", 0.35]} />
      <spotLight
        color="#fff4d4"
        intensity={3.2}
        position={[0, 4.4, -0.6]}
        angle={Math.PI / 7}
        penumbra={0.45}
        distance={12}
        castShadow
      />
      <pointLight color="#00f5d4" intensity={2.1} position={[-4.6, 2, -0.6]} distance={9} decay={2} />
      <pointLight color="#ffa834" intensity={1.5} position={[3.1, 2.3, -0.5]} distance={6} decay={2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial map={marble} roughness={0.14} metalness={0.32} />
      </mesh>
      <mesh position={[0, 3, -2.6]}>
        <planeGeometry args={[11, 6]} />
        <meshStandardMaterial color="#08080a" roughness={0.9} />
      </mesh>

      <mesh position={[0, 2.85, -1.52]}>
        <planeGeometry args={[4.6, 2.25]} />
        <meshBasicMaterial map={sign} transparent />
      </mesh>

      <Shrine />
      <Island x={-2.2} rotY={0.25} items={hats} selected={selected} onPick={onPick} />
      <Island x={2.2} rotY={-0.25} items={street} selected={selected} onPick={onPick} />
      <Curtain x={-3.5} rotY={0.32} />
      <Curtain x={3.5} rotY={-0.32} />

      <group position={[-4.6, 0, -0.4]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.6, 0.001, 0]}>
          <planeGeometry args={[3.4, 5]} />
          <meshStandardMaterial color="#0c0d10" roughness={0.32} metalness={0.16} />
        </mesh>
        <mesh position={[-0.2, 2, -1.3]} rotation={[0, Math.PI / 2.6, 0]}>
          <planeGeometry args={[1.1, 1.6]} />
          <meshBasicMaterial map={miami} transparent />
        </mesh>
      </group>
      <mesh position={[-4, 2.1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4.2, 10]} />
        <Gold />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.05}
        minAzimuthAngle={-0.35}
        maxAzimuthAngle={0.35}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.9}
        target={ORBIT}
      />
    </>
  );
}
