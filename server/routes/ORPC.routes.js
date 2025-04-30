module.exports = app => {
    
    const ORPC  = require("../controllers/ORPC.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", ORPC.create);

    //Retrive all ORPC
    router.get("/", ORPC.findAll);

     //Retrive data for PDF
     router.get("/PDF", ORPC.findPDFdata);

    //Retrive a Single ORPC
    router.get("/:id", ORPC.findOne);

    //Update a ORPC
    router.put("/:id", ORPC.update);

    //Delete a ORPC
    router.delete("/:id", ORPC.delete);

    //Delete all ORPC
    router.delete("/", ORPC.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", ORPC.getMin);
    router.get("/data/Max", ORPC.getMax);
    router.get("/data/Next/:id", ORPC.getNext);
    router.get("/data/Previous/:id", ORPC.getPrevious);
    router.get("/data/MaxDoc", ORPC.getMaxDoc);
    app.use('/api/ORPC', router);

}