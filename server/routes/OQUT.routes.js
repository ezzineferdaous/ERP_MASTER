module.exports = app => {
    
    const OQUT  = require("../controllers/OQUT.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", OQUT.create);

    //Retrive all OQUT
    router.get("/", OQUT.findAll);

     //Retrive data for PDF
     router.get("/PDF", OQUT.findPDFdata);

    //Retrive a Single OQUT
    router.get("/:id", OQUT.findOne);

    //Update a OQUT
    router.put("/:id", OQUT.update);

    //Delete a OQUT
    router.delete("/:id", OQUT.delete);

    //Delete all OQUT
    router.delete("/", OQUT.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OQUT.getMin);
    router.get("/data/Max", OQUT.getMax);
    router.get("/data/Next/:id", OQUT.getNext);
    router.get("/data/Previous/:id", OQUT.getPrevious);
    router.get("/data/MaxDoc", OQUT.getMaxDoc);
    app.use('/api/OQUT', router);

}