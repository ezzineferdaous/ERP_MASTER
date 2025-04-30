module.exports = app => {
   
    const ORPD  = require("../controllers/ORPD.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", ORPD.create);

    //Retrive all ORPD
    router.get("/", ORPD.findAll);

     //Retrive data for PDF
     router.get("/PDF", ORPD.findPDFdata);

    //Retrive a Single ORPD
    router.get("/:id", ORPD.findOne);

    //Update a ORPD
    router.put("/:id", ORPD.update);

    //Delete a ORPD
    router.delete("/:id", ORPD.delete);

    //Delete all ORPD
    router.delete("/", ORPD.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", ORPD.getMin);
    router.get("/data/Max", ORPD.getMax);
    router.get("/data/Next/:id", ORPD.getNext);
    router.get("/data/Previous/:id", ORPD.getPrevious);
    router.get("/data/MaxDoc", ORPD.getMaxDoc);
    app.use('/api/ORPD', router);

}