module.exports = app => {
   
    const OINV  = require("../controllers/OINV.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", OINV.create);

    //Retrive all OINV
    router.get("/", OINV.findAll);

     //Retrive data for PDF
     router.get("/PDF", OINV.findPDFdata);

    //Retrive a Single OINV
    router.get("/:id", OINV.findOne);

    //Update a OINV
    router.put("/:id", OINV.update);

    //Delete a OINV
    router.delete("/:id", OINV.delete);

    //Delete all OINV
    router.delete("/", OINV.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OINV.getMin);
    router.get("/data/Max", OINV.getMax);
    router.get("/data/Next/:id", OINV.getNext);
    router.get("/data/Previous/:id", OINV.getPrevious);
    router.get("/data/MaxDoc", OINV.getMaxDoc);
    app.use('/api/OINV', router);

}