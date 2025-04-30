module.exports = app => {
    
    const ODLN  = require("../controllers/ODLN.controller.js");
    var router = require("express").Router();

    //Create a new OPCH
    router.post("/", ODLN.create);

    //Retrive all ODLN
    router.get("/", ODLN.findAll);

     //Retrive data for PDF
     router.get("/PDF", ODLN.findPDFdata);

    //Retrive a Single ODLN
    router.get("/:id", ODLN.findOne);

    //Update a ODLN
    router.put("/:id", ODLN.update);

    //Delete a ODLN
    router.delete("/:id", ODLN.delete);

    //Delete all ODLN
    router.delete("/", ODLN.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", ODLN.getMin);
    router.get("/data/Max", ODLN.getMax);
    router.get("/data/Next/:id", ODLN.getNext);
    router.get("/data/Previous/:id", ODLN.getPrevious);
    router.get("/data/MaxDoc", ODLN.getMaxDoc);
    app.use('/api/ODLN', router);

}