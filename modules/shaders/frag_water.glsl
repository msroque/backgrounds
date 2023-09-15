#include <fog_pars_fragment>

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uFoamOffset;
uniform vec3  uFoamColor;

varying float vHeight;
void main()
{
    float strength = vHeight * 2.0 + 0.3;
    float foamStrength = step(0.7, vHeight);
    vec3 color = mix(uDepthColor, uSurfaceColor, strength);
    vec3 foam = vec3(0.0);
    color += mix(color, foam, 1.2);
    vec3 finalColor = color * (1.0 - foamStrength) + uFoamColor * foamStrength;
    gl_FragColor = vec4(finalColor, 1.0);

    #include <fog_fragment>
}