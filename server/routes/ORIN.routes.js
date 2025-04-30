module.exports = app => {
    
    const ORIN  = require("../controllers/ORIN.controller.js");
    var router = require("express").Router();

    //Create a new ORIN
    router.post("/", ORIN.create);

    //Retrive all ORIN
    router.get("/", ORIN.findAll);

     //Retrive data for PDF
     router.get("/PDF", ORIN.findPDFdata);

    //Retrive a Single ORIN
    router.get("/:id", ORIN.findOne);

    //Update a ORIN
    router.put("/:id", ORIN.update);

    //Delete a ORIN
    router.delete("/:id", ORIN.delete);

    //Delete all ORIN
    router.delete("/", ORIN.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", ORIN.getMin);
    router.get("/data/Max", ORIN.getMax);
    router.get("/data/Next/:id", ORIN.getNext);
    router.get("/data/Previous/:id", ORIN.getPrevious);
    router.get("/data/MaxDoc", ORIN.getMaxDoc);
    app.use('/api/ORIN', router);

}