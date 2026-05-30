#version 330 core

in vec2 vUV;

uniform sampler2D uFrame;
uniform sampler2D uAO;      // blurred SSAO result (unit 1)
uniform int       uViewMode;

out vec4 FragColor;

void main() {
    if (uViewMode == 10) {
        float ao = texture(uAO, vUV).r;
        FragColor = vec4(ao, ao, ao, 1.0);
    } else {
        FragColor = vec4(texture(uFrame, vUV).rgb, 1.0);
    }
}
