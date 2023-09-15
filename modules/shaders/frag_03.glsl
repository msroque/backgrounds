#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform vec2 uCenter;
varying vec2 vuv;

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main()
{
    // Pattern
    vec2 rotated = rotate(vuv, uTime, vec2(0.5, 0.5));
    float angle = atan(rotated.x - 0.5, rotated.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    float strength = angle;

    // Colors
    vec3 blackColor = vec3(0.9);
    vec3 uvColor = vec3(vuv, 1.0);
    vec3 mixedColors = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(mixedColors, 1.0);
}