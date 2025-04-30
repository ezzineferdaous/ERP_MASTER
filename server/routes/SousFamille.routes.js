module.exports = app => {
    
    const SousFamille  = require("../controllers/SousFamille.controller.js");
    var router = require("express").Router();

    //Create a new SousFamille
    router.post("/", SousFamille.create);

    //Retrive all Countries
    router.get("/", SousFamille.findAll);

    //Retrive a Single SousFamille
    router.get("/:id", SousFamille.findOne);

    //Update a SousFamille
    router.put("/:id", SousFamille.update);

    //Delete a SousFamille
    router.delete("/:id", SousFamille.delete);

    //Delete all Countries
    router.delete("/", SousFamille.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", SousFamille.getMin);
    router.get("/data/Max", SousFamille.getMax);
    router.get("/data/Next/:id", SousFamille.getNext);
    router.get("/data/Previous/:id", SousFamille.getPrevious);

    app.use('/api/SousFamille', router);

}