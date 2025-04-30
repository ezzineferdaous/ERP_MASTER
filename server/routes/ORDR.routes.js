module.exports = app => {
    
    const ORDR  = require("../controllers/ORDR.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", ORDR.create);

    //Retrive all ORDR
    router.get("/", ORDR.findAll);

     //Retrive data for PDF
     router.get("/PDF", ORDR.findPDFdata);

    //Retrive a Single ORDR
    router.get("/:id", ORDR.findOne);

    //Update a ORDR
    router.put("/:id", ORDR.update);

    //Delete a ORDR
    router.delete("/:id", ORDR.delete);

    //Delete all ORDR
    router.delete("/", ORDR.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", ORDR.getMin);
    router.get("/data/Max", ORDR.getMax);
    router.get("/data/Next/:id", ORDR.getNext);
    router.get("/data/Previous/:id", ORDR.getPrevious);
    router.get("/data/MaxDoc", ORDR.getMaxDoc);
    app.use('/api/ORDR', router);

}