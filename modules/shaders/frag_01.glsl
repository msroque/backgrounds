#define PI 3.1415926535897932384626433832795

uniform float uTime;

varying vec2 vuv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main()
{
    // float strength = mod(10.0 * vuv.x, 1.0);
    // float strength2 = mod(10.0 * vuv.y, 1.0);

    // strength = step(0.8, strength);
    // strength2 = step(0.8, strength2);
    // float strength3 = strength + strength2;

    // Crosses
    // float barX = step(0.4, mod(10.0 * vuv.x, 1.0));
    // barX *= step(0.8, mod((10.0 * vuv.y) + 0.2, 1.0));

    // float barY = step(0.4, mod(10.0 * vuv.y, 1.0));
    // barY *= step(0.8, mod((10.0 * vuv.x) + 0.2, 1.0));

    // float strength = barX + barY;

    // float strength = step(0.4, max(abs(vuv.x - 0.5), abs(vuv.y - 0.5)));

    // float strength = floor(10.0 * vuv.x) / 10.0;
    // strength *= floor(10.0 * vuv.y) / 10.0;

    // noise
    // float strength = random(vuv);
    
    // vec2 gridUV = vec2(
    //     floor(10.0 * vuv.x) / 10.0,
    //     floor((10.0 * vuv.y) + (5.0 * vuv.x)) / 10.0
    // );
    // float strength = random(gridUV);

    // float strength = length(vuv - 0.5);

    // vec2 lightUV = vec2(
    //     vuv.x * 0.1 + 0.45,
    //     vuv.y * 0.5 + 0.25
    // );
    // float strength = 0.015 / distance(lightUV, vec2(0.5));

    // diamond
    // vec2 rotated = rotate(vuv, PI / 4.0, vec2(0.5, 0.5));
    // vec2 lightUVX = vec2(
    //     rotated.x * 0.1 + 0.45,
    //     rotated.y * 0.5 + 0.25
    // );
    // vec2 lightUVY = vec2(
    //     rotated.x * 0.5 + 0.25,
    //     rotated.y * 0.1 + 0.45
    // );
    // float lightX = 0.015 / distance(lightUVX, vec2(0.5));
    // float lightY = 0.015 / distance(lightUVY, vec2(0.5));
    // float strength = lightX * lightY;

    // circle
    // float strength = 1.0 - step(0.01, abs(distance(vuv, vec2(0.5)) - 0.25));

    // vec2 waveUV = vec2(
    //     vuv.x,
    //     vuv.y + 0.1 * sin(vuv.x * 30.0)
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUV, vec2(0.5)) - 0.25));

    // vec2 waveUV = vec2(
    //     vuv.x + 0.1 * sin(vuv.y * 30.0),
    //     vuv.y + 0.1 * sin(vuv.x * 30.0)
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUV, vec2(0.5)) - 0.25));

    // vec2 waveUV = vec2(
    //     vuv.x + 0.1 * sin(vuv.y * 100.0),
    //     vuv.y + 0.1 * sin(vuv.x * 100.0)
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUV, vec2(0.5)) - 0.25));

    // angles
    // float strength = cos(atan(vuv.y/vuv.x));
    // float angle = atan(vuv.x - 0.5, vuv.y - 0.5);
    // angle /= 2.0 * PI;
    // angle += 0.5;
    // // float strength = sin(angle * 100.0);

    // float radius = 0.25 + 0.02 * sin(angle * 100.0);
    // float strength = 1.0 - step(0.01, abs(distance(vuv, vec2(0.5)) - radius));

    // perlin noise
    float strength = sin(cnoise(vuv * 10.0) * PI * 6.0 - uTime * 2.0);

    // Colors
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(
        abs(sin(vuv.x - uTime * 0.5)),
        abs(cos(vuv.y - uTime * 0.5)), 1.0);

    // mix colors
    vec3 mixedColors = mix(blackColor, uvColor, strength);


    // gl_FragColor = vec4(vuv, 1.0, 1.0);
    // gl_FragColor = vec4(vuv, 0.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0); // bw left->right
    // gl_FragColor = vec4(upStrength, upStrength, upStrength, 1.0); // bw down->up

    // 1, 2, 3,...,10 = 1.0
    // 0, 1.1, 2.1... = 0.0
    gl_FragColor = vec4(mixedColors, 1.0);
}