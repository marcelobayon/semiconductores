/* eslint-disable */
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { track } from "@/lib/analytics";

const ROUTES = ["/search", "/manufacturers", "/categories", "/suppliers", "/compare"];
const ANCHORS = [
  [0, 7.2, -3.2],
  [-6.5, 3.3, -3.2],
  [-6, 1.7, -1.7],
  [7.5, 1.5, 3.6],
  [3.5, 2.4, -1.8],
];
const LABELS = {
  en: [
    { t: "Supply Chain & Part Search", s: "AMHS ▸ LIVE", accent: "cyan" },
    { t: "Foundries & Manufacturers", s: "WAFER PROCESS ▸ FAB", accent: "cyan" },
    { t: "Component Catalog & Specs", s: "REEL SORT ▸ SMD", accent: "cyan" },
    { t: "Verified Distributors & Logistics", s: "AGV ▸ AIR-FREIGHT", accent: "amber" },
    { t: "Cross-Reference & Alternatives", s: "INSPECT ▸ DUAL-CHIP", accent: "cyan" },
  ],
  es: [
    { t: "Búsqueda de Piezas y Suministro", s: "AMHS ▸ EN VIVO", accent: "cyan" },
    { t: "Fundiciones y Fabricantes", s: "PROCESO OBLEA ▸ FAB", accent: "cyan" },
    { t: "Catálogo y Especificaciones", s: "CLASIF. CARRETE ▸ SMD", accent: "cyan" },
    { t: "Distribuidores y Logística", s: "AGV ▸ CARGA AÉREA", accent: "amber" },
    { t: "Referencias y Alternativas", s: "INSPECCIÓN ▸ 2-CHIP", accent: "cyan" },
  ],
};

export default function FabScene({ locale }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const labels = LABELS[locale] || LABELS.en;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, host.clientWidth / host.clientHeight, 0.1, 200);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.045).texture;

    scene.add(new THREE.HemisphereLight(0x9fb4d8, 0x0a0e18, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(6, 12, 8); scene.add(key);
    const fill = new THREE.DirectionalLight(0x00f0ff, 0.25); fill.position.set(-8, 4, -6); scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.enableZoom = false; controls.enablePan = false;
    controls.minPolarAngle = 0.55; controls.maxPolarAngle = 1.32;
    controls.minAzimuthAngle = -0.75; controls.maxAzimuthAngle = 0.75;
    controls.rotateSpeed = 0.6;

    const M = {
      alu: new THREE.MeshStandardMaterial({ color: 0x9aa3b4, metalness: 0.95, roughness: 0.34 }),
      white: new THREE.MeshStandardMaterial({ color: 0xe6e9ef, metalness: 0.1, roughness: 0.72 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x121824, metalness: 0.55, roughness: 0.5 }),
      slab: new THREE.MeshStandardMaterial({ color: 0x0c1220, metalness: 0.4, roughness: 0.6 }),
      cyan: new THREE.MeshStandardMaterial({ color: 0x061417, emissive: 0x00f0ff, emissiveIntensity: 1.5, metalness: 0.2, roughness: 0.4 }),
      amber: new THREE.MeshStandardMaterial({ color: 0x1a1304, emissive: 0xffb800, emissiveIntensity: 1.5, metalness: 0.2, roughness: 0.4 }),
      foup: new THREE.MeshStandardMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.34, emissive: 0x00f0ff, emissiveIntensity: 0.9, roughness: 0.15 }),
      reel: new THREE.MeshStandardMaterial({ color: 0x0c3a3f, metalness: 0.3, roughness: 0.55, emissive: 0x00343a, emissiveIntensity: 0.5 }),
    };

    const fab = new THREE.Group(); scene.add(fab);
    const updaters = [];

    // floor + glowing grid
    const slab = new THREE.Mesh(new THREE.BoxGeometry(18.4, 0.6, 11.4), M.slab); slab.position.y = -0.3; fab.add(slab);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.08, 11.6), M.cyan.clone()); trim.material.emissiveIntensity = 0.7; trim.position.y = 0.02; fab.add(trim);
    const gridMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0x00f0ff) } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "precision highp float; varying vec2 vUv; uniform float uTime; uniform vec3 uColor; float grid(vec2 uv,float s,float w){ vec2 g=abs(fract(uv*s-0.5)-0.5); float d=min(g.x,g.y); return 1.0-smoothstep(0.0,w,d);} void main(){ vec2 uv=vUv; float r=length((uv-0.5)*2.0); float fine=grid(uv,26.0,0.05)*0.30; float coarse=grid(uv,6.5,0.055)*0.6; float g=clamp(fine+coarse,0.0,1.0); float ring=sin(r*7.0-uTime*1.6); ring=smoothstep(0.86,1.0,ring)*(1.0-smoothstep(0.55,1.05,r)); float edge=1.0-smoothstep(0.72,1.02,r); float inten=g*edge*0.85+ring*0.7; gl_FragColor=vec4(uColor*inten+uColor*0.02*edge, clamp(inten*1.25+0.03*edge,0.0,1.0)); }",
    });
    const grid = new THREE.Mesh(new THREE.PlaneGeometry(18, 11), gridMat); grid.rotation.x = -Math.PI / 2; grid.position.y = 0.05; fab.add(grid);
    updaters.push((t) => { gridMat.uniforms.uTime.value = t; });

    // walls
    const back = new THREE.Mesh(new THREE.BoxGeometry(18, 5.2, 0.25), M.white); back.position.set(0, 2.6, -5.5); fab.add(back);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.25, 5.2, 11), M.white); left.position.set(-9, 2.6, 0); fab.add(left);

    // AMHS track + OHT
    const railY = 6.6, railZ = -3.2;
    const rail = new THREE.Mesh(new THREE.BoxGeometry(17, 0.14, 0.14), M.alu); rail.position.set(0, railY, railZ); fab.add(rail);
    function makeOHT(phase) {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.34, 0.8), M.dark));
      const foup = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.6, 0.62), M.foup); foup.position.y = -0.5; g.add(foup);
      g.position.set(0, railY - 0.28, railZ - 0.25); fab.add(g);
      updaters.push((t) => { const p = (t * 0.08 + phase) % 1; g.position.x = -7.5 + p * 15; });
    }
    makeOHT(0); makeOHT(0.5);

    // wafer processing bay
    const wbX = -6.5, wbZ = -3.2;
    fab.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 2.0), M.alu), { position: new THREE.Vector3(wbX, 1.3, wbZ) }));
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 0.06), M.cyan.clone()); win.material.emissiveIntensity = 1.0; win.position.set(wbX, 1.5, wbZ + 1.02); fab.add(win);
    const wafer = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.05, 40), new THREE.MeshStandardMaterial({ color: 0x0a2a30, metalness: 0.6, roughness: 0.2, emissive: 0x00c8d8, emissiveIntensity: 0.6 }));
    wafer.position.set(wbX, 3.0, wbZ); fab.add(wafer);
    updaters.push((t) => { wafer.rotation.y = t * 0.6; });

    // robotic arm
    const bX = -3.2, bZ = 1.2;
    fab.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.5, 24), M.dark), { position: new THREE.Vector3(bX, 0.25, bZ) }));
    const yaw = new THREE.Group(); yaw.position.set(bX, 0.5, bZ); fab.add(yaw);
    const sh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.8), M.amber.clone()); sh.material.emissiveIntensity = 0.5; sh.position.y = 0.3; yaw.add(sh);
    const j1 = new THREE.Group(); j1.position.y = 0.5; yaw.add(j1);
    j1.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 2.2, 16), M.alu), { position: new THREE.Vector3(0, 1.1, 0) }));
    const j2 = new THREE.Group(); j2.position.y = 2.2; j1.add(j2);
    j2.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 1.8, 16), M.alu), { position: new THREE.Vector3(0, 0.9, 0) }));
    const j3 = new THREE.Group(); j3.position.y = 1.8; j2.add(j3);
    j3.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12), M.dark), { position: new THREE.Vector3(0, 0.2, 0) }));
    const fingerL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.14), M.cyan.clone()); fingerL.material.emissiveIntensity = 0.7; fingerL.position.set(0, 0.5, 0.12);
    const fingerR = fingerL.clone(); fingerR.position.z = -0.12; j3.add(fingerL, fingerR);
    const KF = [
      [0.0, 0.0, 0.55, -1.05, 0.45, 0.14], [0.14, 0.0, 0.55, -1.05, 0.45, 0.14],
      [0.3, 0.22, 1.1, -1.8, 0.95, 0.14], [0.37, 0.22, 1.1, -1.8, 0.95, 0.06],
      [0.5, 0.22, 0.55, -1.0, 0.5, 0.06], [0.63, 1.3, 0.82, -1.25, 0.7, 0.06],
      [0.71, 1.3, 0.82, -1.25, 0.7, 0.14], [0.86, 0.0, 0.55, -1.05, 0.45, 0.14], [1.0, 0.0, 0.55, -1.05, 0.45, 0.14],
    ];
    const sm = (a, b, x) => { x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
    let armPhase = 0;
    updaters.push((t) => {
      const p = (t * 0.1) % 1; armPhase = p;
      let i = 0; for (; i < KF.length - 1; i++) if (p >= KF[i][0] && p < KF[i + 1][0]) break;
      const a = KF[i], b = KF[i + 1], k = sm(a[0], b[0], p), v = (idx) => a[idx] + (b[idx] - a[idx]) * k;
      yaw.rotation.y = v(1); j1.rotation.x = v(2) + Math.sin(t * 1.3) * 0.015; j2.rotation.x = v(3); j3.rotation.x = v(4);
      fingerL.position.z = v(5); fingerR.position.z = -v(5);
    });

    // conveyor + instanced reels
    fab.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 1.2), M.dark), { position: new THREE.Vector3(-2.5, 0.75, 2.9) }));
    const reelGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.5, 20);
    const reels = new THREE.InstancedMesh(reelGeo, M.reel, 7); fab.add(reels);
    const dummy = new THREE.Object3D();
    updaters.push((t) => {
      for (let i = 0; i < 7; i++) {
        const x = ((i / 7) * 9 + t * 0.6) % 9;
        dummy.position.set(-7 + x, 1.05, 2.9); dummy.rotation.set(0, t * 2 + i, Math.PI / 2); dummy.updateMatrix();
        reels.setMatrixAt(i, dummy.matrix);
      }
      reels.instanceMatrix.needsUpdate = true;
    });

    // storage bins
    fab.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.2, 2.6), M.dark), { position: new THREE.Vector3(-6, 0.1, -1.6) }));
    const bins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.95, 0.85, 0.95), M.alu, 6);
    let n = 0;
    for (let cc = 0; cc < 3; cc++) for (let rr = 0; rr < 2; rr++) { dummy.position.set(-7.1 + cc * 1.1, 0.63, -2.3 + rr * 1.3); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); bins.setMatrixAt(n++, dummy.matrix); }
    bins.instanceMatrix.needsUpdate = true; fab.add(bins);

    // inspection station
    const iX = 3.5, iZ = -1.8;
    fab.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 1.6), M.dark), { position: new THREE.Vector3(iX, 0.1, iZ) }));
    for (const dx of [-0.5, 0.5]) { const top = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.5), M.cyan.clone()); top.material.emissiveIntensity = 0.9; top.position.set(iX + dx, 0.3, iZ); fab.add(top); }
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.4), M.cyan.clone()); bar.material.emissiveIntensity = 1.3; bar.position.set(iX, 1.85, iZ); fab.add(bar);
    updaters.push((t) => { bar.position.x = iX + Math.sin(t * 1.8) * 0.9; });

    // AGV + air-freight pad
    const pX = 7.5, pZ = 3.6;
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.2), new THREE.MeshStandardMaterial({ color: 0x2a2006, emissive: 0xffb800, emissiveIntensity: 0.6, roughness: 0.6 }));
    pad.rotation.x = -Math.PI / 2; pad.position.set(pX, 0.06, pZ); fab.add(pad);
    const agv = new THREE.Group();
    agv.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.45, 0.95), M.dark), { position: new THREE.Vector3(0, 0.3, 0) }));
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.1, 0.97), M.amber.clone()); stripe.material.emissiveIntensity = 1.0; stripe.position.y = 0.42; agv.add(stripe);
    agv.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.5, 0.75), M.alu), { position: new THREE.Vector3(0, 0.78, 0) }));
    fab.add(agv);
    const A = new THREE.Vector3(1.0, 0, 3.0), B = new THREE.Vector3(pX - 0.2, 0, pZ);
    let agvState = "BAY-A";
    updaters.push((t) => {
      const T = 12, p = (t % T) / T; let s, facing = 1;
      if (p < 0.38) { s = p / 0.38; facing = 1; agvState = "TRANSIT"; }
      else if (p < 0.52) { s = 1; agvState = "LOAD"; }
      else if (p < 0.9) { s = 1 - (p - 0.52) / 0.38; facing = -1; agvState = "TRANSIT"; }
      else { s = 0; agvState = "BAY-A"; }
      const ss = s * s * (3 - 2 * s);
      agv.position.lerpVectors(A, B, ss); agv.rotation.y = facing > 0 ? 0 : Math.PI;
    });

    // camera framing
    const box = new THREE.Box3(), size = new THREE.Vector3(), center = new THREE.Vector3();
    let dir = new THREE.Vector3(1, 0.72, 1).normalize();
    function frame() {
      box.setFromObject(fab); box.getSize(size); box.getCenter(center);
      const fov = camera.fov * Math.PI / 180;
      const fitH = size.y / 2 / Math.tan(fov / 2);
      const fitW = size.x / 2 / (Math.tan(fov / 2) * camera.aspect);
      const dist = Math.max(fitH, fitW, size.z / 2 / Math.tan(fov / 2)) * 1.18;
      const tgt = center.clone(); tgt.y = center.y - 0.3;
      camera.position.copy(tgt).add(dir.clone().multiplyScalar(dist));
      controls.target.copy(tgt); controls.update();
    }
    frame();

    // hotspot overlays
    const spotsEl = document.createElement("div"); spotsEl.className = "scene-spots"; host.appendChild(spotsEl);
    const spotNodes = ANCHORS.map((a, i) => {
      const L = labels[i];
      const el = document.createElement("button");
      el.className = "spot" + (L.accent === "amber" ? " amber" : "");
      el.innerHTML = '<span class="ring"><i></i></span><span class="lab">' + L.t + "<small>" + ROUTES[i] + " · " + L.s + "</small></span>";
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        track("platform_node_click", { route: ROUTES[i], business_unit: "component_intelligence" });
        dir = camera.position.clone().sub(controls.target).normalize();
      });
      spotsEl.appendChild(el);
      return { el, v: new THREE.Vector3(a[0], a[1], a[2]) };
    });
    const proj = new THREE.Vector3();
    function updateSpots() {
      const w = host.clientWidth, h = host.clientHeight;
      spotNodes.forEach((s) => {
        proj.copy(s.v).project(camera);
        const behind = proj.z > 1;
        s.el.style.left = (proj.x * 0.5 + 0.5) * w + "px";
        s.el.style.top = (-proj.y * 0.5 + 0.5) * h + "px";
        s.el.style.opacity = behind ? "0" : "1";
        s.el.style.pointerEvents = behind ? "none" : "auto";
      });
    }

    // HUD + controls
    const hud = document.createElement("div"); hud.className = "scene-hud"; host.appendChild(hud);
    const hint = document.createElement("div"); hint.className = "scene-hint"; hint.textContent = "drag to orbit · tap a node"; host.appendChild(hint);
    const ctrl = document.createElement("div"); ctrl.className = "scene-ctrl";
    const motionBtn = document.createElement("button"); motionBtn.textContent = reduced ? "▶" : "❚❚";
    const resetBtn = document.createElement("button"); resetBtn.textContent = "↺";
    ctrl.appendChild(motionBtn); ctrl.appendChild(resetBtn); host.appendChild(ctrl);
    let motion = !reduced;
    motionBtn.addEventListener("click", () => { motion = !motion; motionBtn.textContent = motion ? "❚❚" : "▶"; track("platform_motion_toggle", { state: motion ? "play" : "pause" }); });
    resetBtn.addEventListener("click", () => { dir = new THREE.Vector3(1, 0.72, 1).normalize(); frame(); });

    // loop with offscreen pause
    let raf, running = false, last = performance.now(), animTime = reduced ? 3.2 : 0;
    for (const u of updaters) u(animTime);
    track("platform_view", { business_unit: "component_intelligence" });
    function loop(now) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      if (motion) { animTime += dt; for (const u of updaters) u(animTime); }
      controls.update(); updateSpots(); renderer.render(scene, camera);
      hud.innerHTML = '<span class="k">ARM-01</span> <b>cycle ' + String(Math.round(armPhase * 100)).padStart(2, "0") + "%</b><br><span class=\"k\">AGV-07</span> <b>" + agvState + "</b>";
    }
    function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }
    const io = new IntersectionObserver((es) => { es[0].isIntersecting ? start() : stop(); }, { threshold: 0.03 });
    io.observe(host);
    const onVis = () => { document.hidden ? stop() : start(); };
    document.addEventListener("visibilitychange", onVis);

    let rz;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        renderer.setSize(host.clientWidth, host.clientHeight);
        camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix();
        dir = camera.position.clone().sub(controls.target).normalize(); frame();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      controls.dispose(); pmrem.dispose(); renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      spotsEl.remove(); hud.remove(); hint.remove(); ctrl.remove();
    };
  }, [locale]);

  return <div className="scene-host" ref={hostRef} />;
}
