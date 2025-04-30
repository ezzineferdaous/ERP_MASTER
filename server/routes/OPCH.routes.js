module.exports = app => {
    
    const OPCH  = require("../controllers/OPCH.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", OPCH.create);

    //Retrive all OPCH
    router.get("/", OPCH.findAll);

     //Retrive data for PDF
     router.get("/PDF", OPCH.findPDFdata);

    //Retrive a Single OPCH
    router.get("/:id", OPCH.findOne);

    //Update a OPCH
    router.put("/:id", OPCH.update);

    //Delete a OPCH
    router.delete("/:id", OPCH.delete);

    //Delete all OPCH
    router.delete("/", OPCH.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OPCH.getMin);
    router.get("/data/Max", OPCH.getMax);
    router.get("/data/Next/:id", OPCH.getNext);
    router.get("/data/Previous/:id", OPCH.getPrevious);
    router.get("/data/MaxDoc", OPCH.getMaxDoc);
    app.use('/api/OPCH', router);

}