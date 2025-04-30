module.exports = app => {
    
    const RPC1  = require("../controllers/RPC1.controller");
    var router = require("express").Router();

    //Create a new RPC1
    router.post("/", RPC1.create);

    //Retrive all RPC1
    router.get("/", RPC1.findAll);

    //Retrive a Single RPC1
    router.get("/:id", RPC1.findOne);

    //Update a RPC1
    router.put("/:docEntry", RPC1.update);

    //Delete a RPC1
    router.delete("/:id", RPC1.delete);

    //Delete all RPC1
    router.delete("/", RPC1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", RPC1.getMin);
    router.get("/data/List/:docEntry", RPC1.getList);
    router.get("/data/Max/:docEntry", RPC1.getMax);
    router.get("/data/Next/:docEntry", RPC1.getNext);
    router.get("/data/Previous/:docEntry", RPC1.getPrevious);



    app.use('/api/RPC1', router);

}