module.exports = app => {
   
    const RDN1  = require("../controllers/RDN1.controller");
    var router = require("express").Router();

    //Create a new RDN1
    router.post("/", RDN1.create);

    //Retrive all RDN1
    router.get("/", RDN1.findAll);

    //Retrive a Single RDN1
    router.get("/:id", RDN1.findOne);

    //Update a RDN1
    router.put("/:docEntry", RDN1.update);

    //Delete a RDN1
    router.delete("/:id", RDN1.delete);

    //Delete all RDN1
    router.delete("/", RDN1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", RDN1.getMin);
    router.get("/data/Max/:docEntry", RDN1.getMax);
    router.get("/data/Next/:docEntry", RDN1.getNext);
    router.get("/data/Previous/:docEntry", RDN1.getPrevious);



    app.use('/api/RDN1', router);

}