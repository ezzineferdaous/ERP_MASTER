module.exports = app => {
    
    const OPDN  = require("../controllers/OPDN.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", OPDN.create);

    //Retrive all OPDN
    router.get("/", OPDN.findAll);

     //Retrive data for PDF
     router.get("/PDF", OPDN.findPDFdata);

    //Retrive a Single OPDN
    router.get("/:id", OPDN.findOne);

    //Update a OPDN
    router.put("/:id", OPDN.update);

    //Delete a OPDN
    router.delete("/:id", OPDN.delete);

    //Delete all OPDN
    router.delete("/", OPDN.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OPDN.getMin);
    router.get("/data/Max", OPDN.getMax);
    router.get("/data/Next/:id", OPDN.getNext);
    router.get("/data/Previous/:id", OPDN.getPrevious);
    router.get("/data/MaxDoc", OPDN.getMaxDoc);
    app.use('/api/OPDN', router);

}