class CarRoofCover extends Object3D{
    /*Forma de la parte inferior de un auto*/
    constructor(color, side){
        super();

        this.side = side;
        this.setIndexCreator(this);
        this.setPosCreator(this);
        this.setNormalCreator(this);
        this.setTextureCreator(this);

        this.id = 7;
        this.street = true;
    }
    setPosBuffer(){
        var bottomLeft = new Point(-0.35, 0.2, 0);
        var bottomRight = new Point(0.35, 0.2, 0);
        var topRight = new Point(0.1, 0.35, 0);
        var topLeft = new Point(-0.3, 0.35, 0);
        /*Se repiten por el facetado*/
        return [
            bottomLeft.x, bottomLeft.y, bottomLeft.z,
            bottomRight.x, bottomRight.y, bottomRight.z,
            topRight.x, topRight.y, topRight.z,
            topLeft.x, topLeft.y, topLeft.z
        ];
    }
    setNormalBuffer(){
        /*Se repiten por el facetado*/
        return [
            0, 0, this.side,
            0, 0, this.side,
            0, 0, this.side,
            0, 0, this.side
        ];
    }
    setIndexBuffer(){
        return [0, 1, 2, 0, 2, 3];
    }
    setTextureBuffer(){
        return [
            0.22, 0.52,
            0.87, 0.53,
            0.7, 0.62,
            0.42, 0.62
        ];
    }
}
