module.exports = app => {
    
    const DLN1  = require("../controllers/DLN1.controller.js");
    var router = require("express").Router();

    //Create a new DLN1
    router.post("/", DLN1.create);

    //Retrive all DLN1
    router.get("/", DLN1.findAll);

    //Retrive a Single DLN1
    router.get("/:id", DLN1.findOne);

    //Update a DLN1
    router.put("/:docEntry", DLN1.update);

    //Delete a DLN1
    router.delete("/:id", DLN1.delete);

    //Delete all DLN1
    router.delete("/", DLN1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", DLN1.getMin);
    router.get("/data/List/:docEntry", DLN1.getList);
    router.get("/data/Max/:docEntry", DLN1.getMax);
    router.get("/data/Next/:docEntry", DLN1.getNext);
    router.get("/data/Previous/:docEntry", DLN1.getPrevious);



    app.use('/api/DLN1', router);

}