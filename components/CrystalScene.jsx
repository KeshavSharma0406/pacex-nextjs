'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scrollProgress';

const noiseGLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec3 vViewPosition;
  varying float vNoise;
  ${noiseGLSL}
  void main() {
    float n = snoise(position * 1.4 + uTime * 0.06);
    vNoise = n;
    vec3 displaced = position + normal * n * uAmplitude;
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vViewPosition;
  varying float vNoise;
  void main() {
    vec3 fdx = dFdx(vViewPosition);
    vec3 fdy = dFdy(vViewPosition);
    vec3 normal = normalize(cross(fdx, fdy));
    vec3 viewDir = normalize(vViewPosition);

    float diffuse = max(dot(normal, normalize(vec3(0.4, 0.8, 0.6))), 0.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);

    vec3 base = mix(vec3(0.04, 0.04, 0.045), vec3(0.95, 0.93, 0.88), diffuse * 0.85);
    base += fresnel * vec3(0.9, 0.88, 0.82) * 0.9;
    base += vNoise * 0.04;

    gl_FragColor = vec4(base, 1.0);
  }
`;

// Maps a 0-1 progress value to an interpolated value across a set of keyframes
function lerpKeyframes(progress, keyframes) {
  if (progress <= keyframes[0].p) return keyframes[0].v;
  const last = keyframes[keyframes.length - 1];
  if (progress >= last.p) return last.v;
  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i], b = keyframes[i + 1];
    if (progress >= a.p && progress <= b.p) {
      const t = (progress - a.p) / (b.p - a.p);
      return a.v + (b.v - a.v) * t;
    }
  }
  return last.v;
}

function Crystal() {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.1 },
    }),
    []
  );

  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const progress = scrollState.progress;
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.material.uniforms.uTime.value = t;

    const amplitude = lerpKeyframes(progress, [
      { p: 0, v: 0.1 },
      { p: 0.25, v: 0.2 },
      { p: 0.5, v: 0.4 },
      { p: 0.75, v: 0.28 },
      { p: 1, v: 0.5 },
    ]);
    mesh.material.uniforms.uAmplitude.value = amplitude;

    const posX = lerpKeyframes(progress, [
      { p: 0, v: 0 },
      { p: 0.12, v: 1.4 },
      { p: 0.45, v: -1.5 },
      { p: 0.65, v: 1.3 },
      { p: 0.85, v: -1.4 },
      { p: 1, v: 0 },
    ]);
    const scale = lerpKeyframes(progress, [
      { p: 0, v: 1.25 },
      { p: 0.12, v: 0.85 },
      { p: 0.65, v: 0.8 },
      { p: 0.85, v: 1.0 },
      { p: 1, v: 1.3 },
    ]);

    mesh.position.x += (posX - mesh.position.x) * 0.06;
    const currentScale = mesh.scale.x;
    const nextScale = currentScale + (scale - currentScale) * 0.06;
    mesh.scale.setScalar(nextScale);

    mesh.rotation.y = t * 0.12 + progress * Math.PI * 3;
    mesh.rotation.x = t * 0.05 + progress * Math.PI * 0.6;

    state.camera.position.x += (mouse.current.x * 0.35 - state.camera.position.x) * 0.04;
    state.camera.position.y += (-mouse.current.y * 0.35 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  // Track mouse for subtle camera parallax
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.7, 6]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function CrystalScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Crystal />
      </Canvas>
    </div>
  );
}
