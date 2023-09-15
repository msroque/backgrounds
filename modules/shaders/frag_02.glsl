uniform float uTime;
varying vec2 vuv;

void main()
{
    vec2 fuv = vec2(
        vuv.x,
        vuv.y
    );

    vec2 waveUV = vec2(
        fuv.x + 0.1 * sin(fuv.y * 100.0 * sin(uTime * 0.2)),
        fuv.y + 0.1 * sin(fuv.x * 100.0 * sin(uTime * 0.2))
    );

    float strength = 1.0 - step(0.01, abs(distance(waveUV, vec2(0.5)) - 0.25));

    // Colors
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(
        abs(sin(fuv.x - uTime * 0.5)),
        abs(cos(fuv.y - uTime * 0.5)), 1.0);

    // mix colors
    vec3 mixedColors = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(mixedColors, 1.0);
}