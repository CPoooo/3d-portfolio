// Ashima Arts 3D simplex noise (MIT).
const simplex = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

export const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

${simplex}

float field(vec3 p){
  float n = snoise(p * uFreq + vec3(0.0, uTime * 0.18, uTime * 0.11));
  n += 0.45 * snoise(p * uFreq * 2.2 - vec3(uTime * 0.21));
  return n;
}

vec3 displace(vec3 p){
  return p + normalize(p) * field(p) * uAmp;
}

void main(){
  vec3 p = position;
  vec3 n = normalize(p);
  vec3 up = abs(n.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 t = normalize(cross(n, up));
  vec3 b = normalize(cross(n, t));

  float eps = 0.012;
  vec3 d  = displace(p);
  vec3 dt = displace(p + t * eps);
  vec3 db = displace(p + b * eps);
  vec3 nn = normalize(cross(dt - d, db - d));
  if (dot(nn, n) < 0.0) nn = -nn;

  vNoise = field(p);
  vec4 mv = modelViewMatrix * vec4(d, 1.0);
  vNormal = normalize(normalMatrix * nn);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`

export const coreFragment = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uEmber;
uniform vec3 uIris;
uniform vec3 uRim;
uniform vec3 uAccent;
uniform float uAccentMix;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  float t = vNoise * 0.5 + 0.5;

  vec3 hot = mix(uEmber, uAccent, uAccentMix);
  vec3 base = mix(uDeep, uIris * 0.55, smoothstep(0.25, 0.6, t));
  base = mix(base, hot, smoothstep(0.55, 0.95, t));

  vec3 L = normalize(vec3(0.4, 0.8, 0.6));
  float diff = max(dot(N, L), 0.0) * 0.55 + 0.45;
  float spec = pow(max(dot(reflect(-L, N), V), 0.0), 40.0) * 0.6;

  vec3 col = base * diff + spec * vec3(1.0, 0.95, 0.9);
  col += fres * mix(uRim, hot, 0.35) * 0.9;

  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export const particlesVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aScale;
attribute float aSpeed;
attribute vec3 aColor;
varying vec3 vColor;
varying float vTwinkle;

void main(){
  vec3 p = position;
  float a = uTime * aSpeed * 0.05;
  float c = cos(a), s = sin(a);
  p.xz = mat2(c, -s, s, c) * p.xz;
  p.y += sin(uTime * 0.3 + aScale * 10.0) * 0.05;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aScale * 26.0 * uPixelRatio / -mv.z;
  vColor = aColor;
  vTwinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSpeed) + aScale * 40.0);
}
`

export const particlesFragment = /* glsl */ `
varying vec3 vColor;
varying float vTwinkle;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, alpha * vTwinkle * 0.85);
  #include <colorspace_fragment>
}
`

export const haloVertex = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const haloFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uIntensity;
varying vec2 vUv;
void main(){
  float d = length(vUv - 0.5) * 2.0;
  float a = pow(max(1.0 - d, 0.0), 2.6) * uIntensity;
  gl_FragColor = vec4(uColor, a);
  #include <colorspace_fragment>
}
`
