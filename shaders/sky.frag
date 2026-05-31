#version 330 core

in vec2 vTexCoord;

uniform sampler2D uSkyHDR;    // equirectangular HDR panorama
uniform mat4      uInvVP;     // inverse(projection * view), updated each frame
uniform mat3      uHdriRotMat; // pre-built XYZ Euler rotation applied to the sky direction
uniform float     uHdriExposure;
uniform bool      uHdriFlipV; // flip panorama vertically

out vec4 FragColor;

const float PI = 3.14159265358979;

void main() {
    vec2  ndc   = vTexCoord * 2.0 - 1.0;
    vec4  world = uInvVP * vec4(ndc, 1.0, 1.0);
    vec3  dir   = normalize(world.xyz / world.w);

    dir = uHdriRotMat * dir;

    float phi   = atan(dir.z, dir.x);
    float theta = acos(clamp(dir.y, -1.0, 1.0));
    float v     = uHdriFlipV ? theta / PI : 1.0 - theta / PI;
    vec2  uv    = vec2(phi / (2.0 * PI) + 0.5, v);

    FragColor = vec4(texture(uSkyHDR, uv).rgb * uHdriExposure, 1.0);
}
