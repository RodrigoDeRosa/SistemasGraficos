attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexTangent;
attribute vec2 aTextureCoord;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;

uniform vec3 uLightPosition;
uniform vec3 uSpotLightPos[23];

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying vec3 vLightDir;
varying vec3 vViewDir;
varying vec3 vSpotLightDir;
varying vec3 vSpotLightPos[23];

void main(void) {
    // Transformamos al v�rtice al espacio de la c�mara
    vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    vec3 pos = vec3(uModelMatrix * vec4(aVertexPosition, 1.0));

    // Transformamos al v�rtice al espacio de la proyecci�n
    gl_Position = uPMatrix * pos_camera_view;
    // Coordenada de textura sin modifiaciones
    vTextureCoord = aTextureCoord;
    //Variables que se pasan al fragment para la iluminacion
    vVertexNormal = normalize(uNMatrix * aVertexNormal);
    vLightDir = normalize(uLightPosition - pos); //Direccion de la luz
    vViewDir = normalize(pos_camera_view.xyz); //Direccion de la vista
    //Para cada spotlight se calcula la posicion relativa y la direccion
    for (int i = 0; i < 23; i++){
        vSpotLightPos[i] = uSpotLightPos[i] - pos;
        vSpotLightDir = vec3(0.0, -1.0, 0.0);
    }

    // Transform normal and tangent to eye space
    vec3 norm = vVertexNormal;
    vec3 tang = normalize(uNMatrix * aVertexTangent);
    vec3 binormal = normalize(cross(norm, tang));

    //Matriz de transformacion al espacio tangencial
    mat3 tangMat = mat3(
        tang.x, binormal.x, norm.x,
        tang.y, binormal.y, norm.y,
        tang.z, binormal.z, norm.z
    );

    //Se transforman todos los vectores al espacio tangencial
    vLightDir = tangMat * vLightDir;
    vViewDir = tangMat * vViewDir;
    //Spotlights
    vSpotLightDir = tangMat * vSpotLightDir;
    for (int i = 0; i < 23; i++){
        vSpotLightPos[i] = tangMat * vSpotLightPos[i];
    }
}
