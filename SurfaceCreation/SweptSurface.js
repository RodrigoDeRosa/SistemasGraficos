class SweptSurface{
    /**Superficie de barrido.
      * @param {shape} Shape Es la forma que sera barrida.
      * @param {path} Path Camino por el que se hara el barrido.
    */
    constructor(shape, path){
        this.shape = shape;
        this.path = path;
    }
    setPosBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        /*En cada nivel se calcula la posicion de cada punto de la forma*/
        for (var i = 0; i < pathLevels; i++){
            /*Para cada punto de la forma se aplica la transformacion*/
            for (var j = 0; j < shapeLevels; j++){
                /*Se define la posicion*/
                var pos = this.shape.getPosition(j);
                /*Se transforma el punto con la matriz de nivel*/
                var tPos = vec3.fromValues(pos.x, pos.y, pos.z);
                vec3.transformMat4(tPos, tPos, this.path.getLevelVertexMatrix(i));

                /*Se guarda la posicion en el position buffer*/
                for (var k = 0; k < 3; k++){
                    buffer.push(tPos[k]);
                }
            }
        }
        return buffer;
    }
    setNormalBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        /*En cada nivel se calcula la normal de cada punto de la forma*/
        for (var i = 0; i < pathLevels; i++){
            /*Para cada punto de la forma se aplica la transformacion*/
            for (var j = 0; j < shapeLevels; j++){
                /*Se define la normal*/
                var normal = this.shape.getNormal(j);
                /*Se transforma el punto con la matriz del nivel*/
                var tNormal = vec3.fromValues(normal.x, normal.y, normal.z);
                vec3.transformMat4(tNormal, tNormal, this.path.getLevelBasisMatrix(i));
                /*Se guarda la normal en el normal buffer*/
                for (var k = 0; k < 3; k++){
                    buffer.push(tNormal[k]);
                }
            }
        }
        return buffer;
    }
    setTangentBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        /*En cada nivel se calcula la tangente de cada punto de la forma*/
        for (var i = 0; i < pathLevels; i++){
            /*Para cada punto de la forma se aplica la transformacion*/
            for (var j = 0; j < shapeLevels; j++){
                /*Se define la normal*/
                var tangent = this.shape.getTangent(j);
                /*Se transforma el punto con la matriz del nivel*/
                var tTangent = vec3.fromValues(tangent.x, tangent.y, tangent.z);
                vec3.transformMat4(tTangent, tTangent, this.path.getLevelBasisMatrix(i));
                /*Se guarda la tangente en el tangent buffer*/
                for (var k = 0; k < 3; k++){
                    buffer.push(tTangent[k]);
                }
            }
        }
        return buffer;
    }
    setTextureBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        var u, v;
        /*En cada nivel se calcula la componente v*/
        for (var i = 0; i < pathLevels; i++){
            v = i / (pathLevels-1); //Entre 0 y 1
            /*Para cada punto se calcula la componente u*/
            for (var j = 0; j < shapeLevels; j++){
                u = j / (shapeLevels-1); //Entre 0 y 1
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
