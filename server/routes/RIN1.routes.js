module.exports = app => {
    
    const RIN1  = require("../controllers/RIN1.controller");
    var router = require("express").Router();

    //Create a new RIN1
    router.post("/", RIN1.create);

    //Retrive all RIN1
    router.get("/", RIN1.findAll);

    //Retrive a Single RIN1
    router.get("/:id", RIN1.findOne);

    //Update a RIN1
    router.put("/:docEntry", RIN1.update);

    //Delete a RIN1
    router.delete("/:id", RIN1.delete);

    //Delete all RIN1
    router.delete("/", RIN1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", RIN1.getMin);
    router.get("/data/List/:docEntry", RIN1.getList);
    router.get("/data/Max/:docEntry", RIN1.getMax);
    router.get("/data/Next/:docEntry", RIN1.getNext);
    router.get("/data/Previous/:docEntry", RIN1.getPrevious);



    app.use('/api/RIN1', router);

}