const VERT = `#version 300 es
precision mediump float;
const vec2 V[3] = vec2[](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main() {
  gl_Position = vec4(V[gl_VertexID], 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision mediump float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uTime;
uniform float uAmp;

float hash(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.02 + 13.7;
    a *= 0.5;
  }
  return v;
}

float density(vec3 p, float time) {
  float n = fbm(p * vec3(0.5, 0.65, 0.5) + vec3(time * 0.028, time * 0.018, time * 0.022));
  float h = smoothstep(1.35, -0.55, p.y);
  float room = 1.0 - smoothstep(2.6, 3.5, length(p.xz));
  return clamp(n * 1.2 * h * room - 0.2, 0.0, 1.0);
}

vec3 lights(vec3 p) {
  vec3 lp = vec3(0.04, 1.58, 0.12);
  vec3 toP = p - lp;
  float dist = length(toP);
  float spot = pow(max(dot(normalize(toP), vec3(0.0, -1.0, 0.0)), 0.0), 7.0);
  vec3 gold = vec3(0.86, 0.69, 0.38) * spot * exp(-dist * 0.42) / (0.35 + dist * dist * 0.07);

  vec3 wp = vec3(2.35, 0.4, 0.55);
  float wd = length(wp - p);
  vec3 miami = vec3(0.24, 0.88, 0.8) * exp(-wd * 0.52) * 0.5;

  return gold + miami;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.12, 2.85);
  vec3 rd = normalize(vec3(uv * 1.08, -1.32));

  vec3 acc = vec3(0.0);
  float transm = 1.0;
  float t = 0.45;
  for (int i = 0; i < 36; i++) {
    vec3 p = ro + rd * t;
    float d = density(p, uTime);
    if (d > 0.003 && transm > 0.04) {
      float shadow = exp(-density(p + vec3(0.0, 0.18, 0.0), uTime) * 1.6);
      acc += transm * lights(p) * d * shadow * 0.12;
      transm *= exp(-d * 0.2);
    }
    t += 0.085;
  }
  acc *= uAmp;
  float alpha = clamp((1.0 - transm) * 0.9, 0.0, 0.82);
  fragColor = vec4(acc, alpha);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export type RaymarchHandle = {
  draw: (time: number) => void;
  resize: () => void;
  destroy: () => void;
};

export function createRaymarch(canvas: HTMLCanvasElement): RaymarchHandle | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    return null;
  }

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.useProgram(prog);

  const locRes = gl.getUniformLocation(prog, "uRes");
  const locTime = gl.getUniformLocation(prog, "uTime");
  const locAmp = gl.getUniformLocation(prog, "uAmp");

  const mobile = window.matchMedia("(max-width: 700px)").matches;
  const scale = mobile ? 0.5 : Math.min(window.devicePixelRatio || 1, 1.25) * 0.7;

  const resize = () => {
    const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
    const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  };

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  return {
    resize,
    draw(time: number) {
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.uniform1f(locTime, time);
      gl.uniform1f(locAmp, mobile ? 0.85 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteVertexArray(vao);
    },
  };
}
