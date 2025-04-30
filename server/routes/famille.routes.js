module.exports = app => {
    
    const Famille  = require("../controllers/famille.controller.js");
    var router = require("express").Router();

    //Create a new Famille
    router.post("/", Famille.create);

    //Retrive all Countries
    router.get("/", Famille.findAll);

    //Retrive a Single Famille
    router.get("/:id", Famille.findOne);

    //Update a Famille
    router.put("/:id", Famille.update);

    //Delete a Famille
    router.delete("/:id", Famille.delete);

    //Delete all Countries
    router.delete("/", Famille.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Famille.getMin);
    router.get("/data/Max", Famille.getMax);
    router.get("/data/Next/:id", Famille.getNext);
    router.get("/data/Previous/:id", Famille.getPrevious);

    app.use('/api/Famille', router);

}