module.exports = app => {
   
    const RDP1  = require("../controllers/RDP1.controller");
    var router = require("express").Router();

    //Create a new RDP1
    router.post("/", RDP1.create);

    //Retrive all RDP1
    router.get("/", RDP1.findAll);

    //Retrive a Single RDP1
    router.get("/:id", RDP1.findOne);

    //Update a RDP1
    router.put("/:docEntry", RDP1.update);

    //Delete a RDP1
    router.delete("/:id", RDP1.delete);

    //Delete all RDP1
    router.delete("/", RDP1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", RDP1.getMin);
    router.get("/data/Max/:docEntry", RDP1.getMax);
    router.get("/data/Next/:docEntry", RDP1.getNext);
    router.get("/data/Previous/:docEntry", RDP1.getPrevious);



    app.use('/api/RDP1', router);

}