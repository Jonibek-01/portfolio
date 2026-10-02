// =====================================================
// EARTH TEXTURE
// Builds an equirectangular texture at runtime:
//   NASA Blue Marble (public/images/earth) + darkening tint
//   + crisp country borders (Natural Earth via world-atlas)
//   + Central Asia / Afghanistan highlight and country labels.
// Kept deliberately light: 2k texture + 110m borders, no relief map.
// =====================================================
import * as THREE from "three";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";

// ISO 3166-1 numeric ids used by world-atlas
const FOCUS = new Set(["860", "004", "398", "417", "762", "795"]); // UZ AF KZ KG TJ TM
const HERO = "860"; // Uzbekistan – strongest highlight

interface Label { text: string; lon: number; lat: number; focus?: boolean; size?: number }
const LABELS: Label[] = [
  { text: "UZBEKISTAN", lon: 62.6, lat: 41.7, focus: true, size: 25 },
  { text: "KAZAKHSTAN", lon: 67, lat: 49, focus: true, size: 25 },
  { text: "TURKMENISTAN", lon: 58.2, lat: 38.9, focus: true, size: 20 },
  { text: "AFGHANISTAN", lon: 66, lat: 33.9, focus: true, size: 23 },
  { text: "TAJIKISTAN", lon: 71.6, lat: 38.5, focus: true, size: 15 },
  { text: "KYRGYZSTAN", lon: 76, lat: 41.9, focus: true, size: 15 },
  { text: "RUSSIA", lon: 95, lat: 62 },
  { text: "CHINA", lon: 98, lat: 36 },
  { text: "IRAN", lon: 54.5, lat: 32.2 },
  { text: "PAKISTAN", lon: 69.5, lat: 29.5 },
  { text: "INDIA", lon: 79, lat: 22 },
  { text: "TÜRKİYE", lon: 35, lat: 39 },
  { text: "MONGOLIA", lon: 103, lat: 46.8 },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

type Geo = { type: string; coordinates: unknown };

function tracePath(ctx: CanvasRenderingContext2D, geo: Geo, W: number, H: number) {
  const X = (lon: number) => ((lon + 180) / 360) * W;
  const Y = (lat: number) => ((90 - lat) / 180) * H;
  const line = (pts: number[][]) => {
    let prev: number[] | null = null;
    pts.forEach((p) => {
      const x = X(p[0]);
      const y = Y(p[1]);
      // break the path across the antimeridian to avoid horizontal streaks
      if (!prev || Math.abs(x - prev[0]) > W / 2) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      prev = [x, y];
    });
  };
  const c = geo.coordinates as number[][][] | number[][][][] | number[][];
  switch (geo.type) {
    case "LineString": line(c as number[][]); break;
    case "MultiLineString": (c as number[][][]).forEach(line); break;
    case "Polygon": (c as number[][][]).forEach((r) => { line(r); ctx.closePath(); }); break;
    case "MultiPolygon": (c as number[][][][]).forEach((p) => p.forEach((r) => { line(r); ctx.closePath(); })); break;
  }
}

export async function buildEarthTexture(mobile: boolean): Promise<{ map: THREE.CanvasTexture; bump?: THREE.Texture }> {
  const W = 2048;
  const H = W / 2;

  const [img, topoModule] = await Promise.all([
    loadImage("/images/earth/earth-2k.webp"),
    import("world-atlas/countries-110m.json"),
  ]);
  const topo = (topoModule.default ?? topoModule) as unknown as Topology;
  const countries = topo.objects.countries as GeometryCollection;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // 1) satellite imagery, toned to the site palette (deep navy, slightly desaturated)
  ctx.drawImage(img, 0, 0, W, H);
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgb(150,170,205)";
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(5,9,22,0.18)";
  ctx.fillRect(0, 0, W, H);

  // 2) highlight Central Asia + Afghanistan
  const fc = feature(topo, countries);
  fc.features.forEach((f) => {
    const id = String(f.id);
    if (!FOCUS.has(id)) return;
    ctx.beginPath();
    tracePath(ctx, f.geometry as unknown as Geo, W, H);
    ctx.fillStyle = id === HERO ? "rgba(214,178,100,0.40)" : "rgba(200,169,106,0.20)";
    ctx.fill("evenodd");
  });

  // 3) borders: all boundaries (coast + land) first, then interior borders brighter
  const strokeGeo = (geo: unknown, style: string, width: number) => {
    ctx.beginPath();
    tracePath(ctx, geo as Geo, W, H);
    ctx.strokeStyle = style;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.stroke();
  };
  strokeGeo(mesh(topo, countries), "rgba(210,225,255,0.42)", 1.2);
  strokeGeo(mesh(topo, countries, (a, b) => a !== b), "rgba(235,242,255,0.72)", 1.6);

  // focus country outlines in gold
  fc.features.forEach((f) => {
    const id = String(f.id);
    if (!FOCUS.has(id)) return;
    strokeGeo(f.geometry, id === HERO ? "rgba(240,205,130,0.98)" : "rgba(222,190,125,0.85)", id === HERO ? 2.6 : 2);
  });

  // 4) graticule every 15° – very faint
  ctx.strokeStyle = "rgba(160,185,230,0.10)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let lon = -180; lon <= 180; lon += 15) { ctx.moveTo(((lon + 180) / 360) * W, 0); ctx.lineTo(((lon + 180) / 360) * W, H); }
  for (let lat = -75; lat <= 75; lat += 15) { ctx.moveTo(0, ((90 - lat) / 180) * H); ctx.lineTo(W, ((90 - lat) / 180) * H); }
  ctx.stroke();

  // 5) country labels, squeezed horizontally by cos(lat) so they look natural on the sphere
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  LABELS.forEach((lb) => {
    if (mobile && (!lb.focus || (lb.size ?? 25) < 20)) return;
    const x = ((lb.lon + 180) / 360) * W;
    const y = ((90 - lb.lat) / 180) * H;
    const size = (lb.size ?? 20) * 0.62;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(Math.cos((lb.lat * Math.PI) / 180) * 1.12, 1);
    ctx.font = `600 ${size}px Inter, "Helvetica Neue", Arial, sans-serif`;
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${(lb.focus ? 3 : 3.5)}px`;
    ctx.shadowColor = "rgba(0,0,0,0.85)";
    ctx.shadowBlur = 5;
    ctx.fillStyle = lb.focus ? "rgba(255,244,214,0.97)" : "rgba(225,232,248,0.62)";
    ctx.fillText(lb.text, 0, 0);
    ctx.restore();
  });

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = mobile ? 4 : 8;
  map.generateMipmaps = true;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.needsUpdate = true;

  const bump: THREE.Texture | undefined = undefined;
  return { map, bump };
}
