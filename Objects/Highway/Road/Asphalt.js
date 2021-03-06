class Asphalt extends Object3D{
    /*Asfalto del camino (parte superior)*/
    constructor(color){
        super();

        var SWEPT_LEVELS = 280;
        var SHAPE_POINTS = 6;

        this.shape = new AsphaltShape(SHAPE_POINTS);
        this.path = new RoadPath(curveController.controlPoints ,SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setTextureCreator(this);
        this.street = true;
        this.uShininess = 5.0;
        this.id = 0;
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTangentCreator(this.surface);
    }
    setTextureBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        var u, v;
        /*En cada nivel se calcula la componente v*/
        for (var i = 0; i < pathLevels; i++){
            v = (i / (pathLevels-1))*120; //Entre 0 y 10
            /*Para cada punto se calcula la componente u*/
            for (var j = 0; j < shapeLevels; j++){
                u = (j / (shapeLevels-1))*4; //Entre 0 y 2
                buffer.push(v);
                buffer.push(u);
            }
        }
        return buffer;
    }
}
