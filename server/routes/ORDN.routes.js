module.exports = app => {
   
    const ORDN  = require("../controllers/ORDN.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", ORDN.create);

    //Retrive all ORDN
    router.get("/", ORDN.findAll);

     //Retrive data for PDF
     router.get("/PDF", ORDN.findPDFdata);

    //Retrive a Single ORDN
    router.get("/:id", ORDN.findOne);

    //Update a ORDN
    router.put("/:id", ORDN.update);

    //Delete a ORDN
    router.delete("/:id", ORDN.delete);

    //Delete all ORDN
    router.delete("/", ORDN.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", ORDN.getMin);
    router.get("/data/Max", ORDN.getMax);
    router.get("/data/Next/:id", ORDN.getNext);
    router.get("/data/Previous/:id", ORDN.getPrevious);
    router.get("/data/MaxDoc", ORDN.getMaxDoc);
    app.use('/api/ORDN', router);

}