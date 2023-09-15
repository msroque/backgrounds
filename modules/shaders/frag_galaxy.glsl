varying vec3 vColor;

void main()
{
    //Light Point Value - exponential fade
    float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
    strength = pow(strength, 10.0);

    //Mix
    vec3 mixedColor = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
}