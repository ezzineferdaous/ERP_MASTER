// OIGE.routes.js
module.exports = app => {
    
    const OIGE  = require("../controllers/OIGE.controller.js");
    var router = require("express").Router();

    //Create a new OIGE
    router.post("/", OIGE.create);

    //Retrive all OIGE
    router.get("/", OIGE.findAll);

    //Retrive a Single OIGE
    router.get("/:id", OIGE.findOne);

    //Update a OIGEوهده ال
    router.put("/:id", OIGE.update);

    //Delete a OIGE
    router.delete("/:id", OIGE.delete);

    //Delete all OIGE
    router.delete("/", OIGE.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OIGE.getMin);
    router.get("/data/Max", OIGE.getMax);
    router.get("/data/MaxDoc", OIGE.getMaxDoc);
    router.get("/data/Next/:id", OIGE.getNext);
    router.get("/data/Previous/:id", OIGE.getPrevious);
    // router.get("/nextdocentry", OIGE.getNextDocEntry);

    app.use('/api/OIGE', router);

}