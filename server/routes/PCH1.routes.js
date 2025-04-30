module.exports = app => {
    
    const PCH1  = require("../controllers/PCH1.controller.js");
    var router = require("express").Router();

    //Create a new PCH1
    router.post("/", PCH1.create);

    //Retrive all PCH1
    router.get("/", PCH1.findAll);

    //Retrive a Single PCH1
    router.get("/:id", PCH1.findOne);

    //Update a PCH1
    router.put("/:docEntry", PCH1.update);

    //Delete a PCH1
    router.delete("/:id", PCH1.delete);

    //Delete all PCH1
    router.delete("/", PCH1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", PCH1.getMin);
    router.get("/data/List/:docEntry", PCH1.getList);
    router.get("/data/Max/:docEntry", PCH1.getMax);
    router.get("/data/Next/:docEntry", PCH1.getNext);
    router.get("/data/Previous/:docEntry", PCH1.getPrevious);



    app.use('/api/PCH1', router);

}