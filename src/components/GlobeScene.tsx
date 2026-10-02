// =====================================================
// GLOBE SCENE – atmospheric 3D hero visual (no human model).
// Real Earth (NASA Blue Marble + clear country borders, Central Asia and
// Afghanistan highlighted), golden city markers with connection arcs, orbit
// rings, floating "document" planes and drifting particles.
// The globe follows the cursor (or finger).
// Lightweight: no postprocessing, reduced geometry/texture on mobile,
// paused when off-screen, static with prefers-reduced-motion.
// =====================================================
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildEarthTexture } from "../utils/earthTexture";

const GOLD = "#c8a96a";
const ICE = "#9fb4d6";
const deg = THREE.MathUtils.degToRad;

/** lat/lon -> point on the sphere, matching three.js SphereGeometry's UV layout (lon 0 at +x, lon 90 at -z). */
function toVec(lat: number, lon: number, r = 1) {
  const phi = deg(lat);
  const lam = deg(lon);
  return new THREE.Vector3(r * Math.cos(phi) * Math.cos(lam), r * Math.sin(phi), -r * Math.cos(phi) * Math.sin(lam));
}

// Focus: Uzbekistan / Central Asia. Rotation that brings (lat, lon) to face the camera (+z).
const FOCUS_LON = 66;
const FOCUS_LAT = 36;
const BASE_YAW = -deg(FOCUS_LON + 90);
const BASE_PITCH = deg(FOCUS_LAT) * 0.95;

const TASHKENT = { name: "Tashkent", lat: 41.3, lon: 69.28 };
const CITIES = [
  { name: "Kabul", lat: 34.53, lon: 69.17 },
  { name: "Astana", lat: 51.17, lon: 71.43 },
  { name: "Bishkek", lat: 42.87, lon: 74.57 },
  { name: "Dushanbe", lat: 38.56, lon: 68.78 },
  { name: "Ashgabat", lat: 37.96, lon: 58.33 },
  { name: "Islamabad", lat: 33.68, lon: 73.05 },
];

function makeArc(from: THREE.Vector3, to: THREE.Vector3, segments = 48, lift = 0.22) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = from.clone().lerp(to, t).normalize();
    p.multiplyScalar(1.004 + Math.sin(Math.PI * t) * lift * from.distanceTo(to));
    pts.push(p);
  }
  return pts;
}

function Marker({ lat, lon, size = 0.016, main = false, animate }: { lat: number; lon: number; size?: number; main?: boolean; animate: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => toVec(lat, lon, 1.006), [lat, lon]);
  useEffect(() => {
    ring.current?.lookAt(pos.clone().multiplyScalar(3));
  }, [pos]);
  useFrame(({ clock }) => {
    if (!animate || !ring.current) return;
    const k = (clock.elapsedTime * (main ? 0.7 : 0.5) + lat) % 1;
    ring.current.scale.setScalar(1 + k * 2.4);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.6;
  });
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[size, 12, 12]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[size * 1.5, size * 1.9, 32]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Fresnel atmosphere glow */
const atmosphereMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { glow: { value: new THREE.Color("#5f86c9") } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 glow; varying vec3 vN; varying vec3 vV;
      void main(){ float i = pow(0.58 - dot(vN, vV), 3.0); gl_FragColor = vec4(glow, 1.0) * clamp(i, 0.0, 1.0) * 0.55; }`,
  });

function Globe({ mobile, animate }: { mobile: boolean; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);
  const planes = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [tex, setTex] = useState<{ map: THREE.Texture; bump?: THREE.Texture } | null>(null);

  useEffect(() => {
    let alive = true;
    buildEarthTexture(mobile)
      .then((t) => alive && setTex(t))
      .catch((e) => console.warn("Earth texture failed:", e));
    return () => {
      alive = false;
    };
  }, [mobile]);

  // Cursor (desktop) or finger (touch) steers the globe.
  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  const atmosphere = useMemo(atmosphereMaterial, []);

  const origin = useMemo(() => toVec(TASHKENT.lat, TASHKENT.lon, 1.004), []);
  const arcs = useMemo(
    () =>
      CITIES.map((c) => {
        const pts = makeArc(origin, toVec(c.lat, c.lon, 1.004));
        return { name: c.name, pts, line: new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: "#f0d28a", transparent: true, opacity: 0.85 })) };
      }),
    [origin]
  );
  const kabulArc = arcs[0].pts;

  const ringLines = useMemo(() => {
    const make = (r: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < 128; i++) pts.push(new THREE.Vector3(Math.cos((i / 128) * Math.PI * 2) * r, 0, Math.sin((i / 128) * Math.PI * 2) * r));
      return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: ICE, transparent: true, opacity: 0.22 }));
    };
    return [make(1.4), make(1.62)];
  }, []);

  const shell = useMemo(() => {
    const n = mobile ? 140 : 420;
    const pos: number[] = [];
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = 1.35 + Math.random() * 1.4;
      const s = Math.sqrt(1 - u * u);
      pos.push(r * s * Math.cos(th), r * u, r * s * Math.sin(th));
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, [mobile]);

  const docPlanes = useMemo(() => {
    const defs = [
      { p: [1.22, 0.62, 0.45], r: [0.3, -0.5, 0.15] },
      { p: [-1.2, 0.85, -0.5], r: [-0.2, 0.6, -0.1] },
      { p: [0.85, -1.02, 0.7], r: [0.4, 0.2, 0.3] },
    ];
    return mobile ? defs.slice(0, 1) : defs;
  }, [mobile]);
  const planeEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.28, 0.38)), []);

  // Smoothed rotation toward (focus + pointer offset) – the globe visibly reacts to the cursor.
  const rot = useRef({ y: BASE_YAW, x: BASE_PITCH });
  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (g) {
      const t = clock.elapsedTime;
      const drift = animate ? Math.sin(t * 0.18) * 0.12 : 0;
      const targetY = BASE_YAW + drift + pointer.current.x * 0.6;
      const targetX = BASE_PITCH + pointer.current.y * 0.32;
      const k = Math.min(1, delta * 3.2);
      rot.current.y += (targetY - rot.current.y) * k;
      rot.current.x += (targetX - rot.current.x) * k;
      g.rotation.set(rot.current.x, rot.current.y, 0);
    }
    if (!animate) return;
    const t = clock.elapsedTime;
    if (rings.current) rings.current.rotation.y = t * 0.05;
    if (particles.current) particles.current.rotation.y = t * 0.012;
    if (planes.current) {
      planes.current.rotation.y = t * 0.04;
      planes.current.children.forEach((c, i) => (c.position.y += Math.sin(t * 0.6 + i * 2) * 0.0007));
    }
    if (satellite.current) satellite.current.position.set(Math.cos(t * 0.35) * 1.4, 0, Math.sin(t * 0.35) * 1.4);
    if (pulse.current) {
      const kk = (t * 0.22) % 1;
      pulse.current.position.copy(kabulArc[Math.min(kabulArc.length - 1, Math.floor(kk * kabulArc.length))]);
    }
  });

  return (
    <>
      <ambientLight intensity={1.15} color="#b9c8e8" />
      <directionalLight position={[-3, 2.2, 4]} intensity={2.1} color="#fff3de" />

      <group ref={group} rotation={[BASE_PITCH, BASE_YAW, 0]}>
        <mesh>
          <sphereGeometry args={[1, mobile ? 64 : 128, mobile ? 64 : 128]} />
          <meshStandardMaterial
            key={tex ? "textured" : "plain"}
            map={tex?.map ?? null}
            color={tex ? "#ffffff" : "#0b1426"}
            bumpMap={tex?.bump ?? null}
            bumpScale={0.012}
            roughness={0.88}
            metalness={0.02}
          />
        </mesh>

        {arcs.map((a) => (
          <primitive key={a.name} object={a.line} />
        ))}
        <mesh ref={pulse}>
          <sphereGeometry args={[0.011, 8, 8]} />
          <meshBasicMaterial color="#fff3d6" />
        </mesh>
        <Marker lat={TASHKENT.lat} lon={TASHKENT.lon} size={0.022} main animate={animate} />
        {CITIES.map((c) => (
          <Marker key={c.name} lat={c.lat} lon={c.lon} animate={animate} />
        ))}
      </group>

      {/* Atmosphere */}
      <mesh scale={1.14} material={atmosphere}>
        <sphereGeometry args={[1, 48, 48]} />
      </mesh>

      {/* Orbit rings */}
      <group ref={rings} rotation={[0.9, 0, 0.35]}>
        <primitive object={ringLines[0]} />
        {!mobile && <primitive object={ringLines[1]} rotation={[0.5, 0, -0.3]} />}
        <mesh ref={satellite}>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshBasicMaterial color={GOLD} />
        </mesh>
      </group>

      {/* Floating research "documents" */}
      <group ref={planes}>
        {docPlanes.map((d, i) => (
          <group key={i} position={d.p as [number, number, number]} rotation={d.r as [number, number, number]}>
            <lineSegments geometry={planeEdges}>
              <lineBasicMaterial color={GOLD} transparent opacity={0.55} />
            </lineSegments>
            <mesh>
              <planeGeometry args={[0.28, 0.38]} />
              <meshBasicMaterial color={GOLD} transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          </group>
        ))}
      </group>

      <points ref={particles} geometry={shell}>
        <pointsMaterial color="#e9e4d6" size={0.012} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
      </points>
    </>
  );
}

export default function GlobeScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const mobile = useMemo(() => window.matchMedia("(max-width: 768px)").matches, []);

  // Pause rendering while the hero is off-screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="globe-canvas">
      <Canvas
        frameloop={reducedMotion ? "demand" : visible ? "always" : "never"}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 5.3], fov: 30 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        resize={{ scroll: false }}
      >
        <Globe mobile={mobile} animate={!reducedMotion} />
      </Canvas>
    </div>
  );
}
