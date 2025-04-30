module.exports = app => {
    
    const POR1  = require("../controllers/POR1.controller.js");
    var router = require("express").Router();

    //Create a new POR1
    router.post("/", POR1.create);

    //Retrive all POR1
    router.get("/", POR1.findAll);

    //Retrive a Single POR1
    router.get("/:id", POR1.findOne);

    //Update a POR1
    router.put("/:docEntry", POR1.update);

    //Delete a POR1
    router.delete("/:id", POR1.delete);

    //Delete all POR1
    router.delete("/", POR1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", POR1.getMin);
    router.get("/data/List/:docEntry", POR1.getList);
    router.get("/data/Max/:docEntry", POR1.getMax);
    router.get("/data/Next/:docEntry", POR1.getNext);
    router.get("/data/Previous/:docEntry", POR1.getPrevious);



    app.use('/api/POR1', router);

}