uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandom;

varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float angle = atan(modelPosition.x, modelPosition.z);
    float dist = length(modelPosition.xz);
    float offset = (1.0 / dist) * uTime * 0.2;
    angle += offset;
    modelPosition.x = dist * cos(angle);
    modelPosition.z = dist * sin(angle);

    modelPosition.xyz += aRandom;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;                // Point Geometry
    gl_PointSize = uSize * aScale;                  // Random Star Sizes
    gl_PointSize *= (1.0 /  - viewPosition.z);      // Size Attenuation

    vColor = color;
}