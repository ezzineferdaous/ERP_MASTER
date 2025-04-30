module.exports = app => {
   
    const INV1  = require("../controllers/INV1.controller");
    var router = require("express").Router();

    //Create a new INV1
    router.post("/", INV1.create);

    //Retrive all INV1
    router.get("/", INV1.findAll);

    //Retrive a Single INV1
    router.get("/:id", INV1.findOne);

    //Update a INV1
    router.put("/:docEntry", INV1.update);

    //Delete a INV1
    router.delete("/:id", INV1.delete);

    //Delete all INV1
    router.delete("/", INV1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", INV1.getMin);
    router.get("/data/Max/:docEntry", INV1.getMax);
    router.get("/data/Next/:docEntry", INV1.getNext);
    router.get("/data/Previous/:docEntry", INV1.getPrevious);



    app.use('/api/INV1', router);

}