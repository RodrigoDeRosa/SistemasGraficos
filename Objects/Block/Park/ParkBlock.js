class ParkBlock extends BuildingBlock{
    /*Manzanas por las cuales pasa la autopista*/
    constructor(shader){
        var NO_BUILDING = true;
        super(shader, NO_BUILDING);

        this.addGrass(shader);
    }
    /**Agrega el pasto a la manzana
      * @param {shader} ShaderProgram
    */
    addGrass(shader){
        var grass = new Sidewalk(shader, new Green(2, 56), false);
        grass.setShaderProgram(shader);

        grass.translate(0, 0.01, 0);
        grass.scale(0.85, 1, 0.85);

        this.addChild(grass);
    }
}
