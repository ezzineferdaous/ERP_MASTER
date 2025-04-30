// OIQR.routes.js
module.exports = app => {
    
    const OIQR  = require("../controllers/OIQR.controller");
    var router = require("express").Router();

    //Create a new OIQR
    router.post("/", OIQR.create);

    //Retrive all OIQR
    router.get("/", OIQR.findAll);

    router.get("/PDF", OIQR.findData);


    //Retrive a Single OIQR
    router.get("/:id", OIQR.findOne);

    //Update a OIQR
    router.put("/:id", OIQR.update);

    //Delete a OIQR
    router.delete("/:id", OIQR.delete);

    //Delete all OIQR
    router.delete("/", OIQR.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OIQR.getMin);
    router.get("/data/Max", OIQR.getMax);
    router.get("/data/MaxDoc", OIQR.getMaxDoc);
    router.get("/data/Next/:id", OIQR.getNext);
    router.get("/data/Previous/:id", OIQR.getPrevious);
    

    app.use('/api/OIQR', router);

}