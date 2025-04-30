module.exports = app => {
    
    const RDR1  = require("../controllers/RDR1.controller.js");
    var router = require("express").Router();

    //Create a new RDR1
    router.post("/", RDR1.create);

    //Retrive all RDR1
    router.get("/", RDR1.findAll);

    //Retrive a Single RDR1
    router.get("/:id", RDR1.findOne);

    //Update a RDR1
    router.put("/:docEntry", RDR1.update);

    //Delete a RDR1
    router.delete("/:id", RDR1.delete);

    //Delete all RDR1
    router.delete("/", RDR1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", RDR1.getMin);
    router.get("/data/List/:docEntry", RDR1.getList);
    router.get("/data/Max/:docEntry", RDR1.getMax);
    router.get("/data/Next/:docEntry", RDR1.getNext);
    router.get("/data/Previous/:docEntry", RDR1.getPrevious);



    app.use('/api/RDR1', router);

}