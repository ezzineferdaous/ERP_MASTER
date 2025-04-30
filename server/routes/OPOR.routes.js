module.exports = app => {
    
    const OPOR  = require("../controllers/OPOR.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", OPOR.create);

    //Retrive all OPOR
    router.get("/", OPOR.findAll);

     //Retrive data for PDF
     router.get("/PDF", OPOR.findPDFdata);

    //Retrive a Single OPOR
    router.get("/:id", OPOR.findOne);

    //Update a OPOR
    router.put("/:id", OPOR.update);

    //Delete a OPOR
    router.delete("/:id", OPOR.delete);

    //Delete all OPOR
    router.delete("/", OPOR.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OPOR.getMin);
    router.get("/data/Max", OPOR.getMax);
    router.get("/data/Next/:id", OPOR.getNext);
    router.get("/data/Previous/:id", OPOR.getPrevious);
    router.get("/data/MaxDoc", OPOR.getMaxDoc);
    app.use('/api/OPOR', router);

}