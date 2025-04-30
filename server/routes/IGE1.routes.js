// IGE1.routes.js
module.exports = app => {
    
    const IGE1  = require("../controllers/IGE1.controller.js");
    var router = require("express").Router();

    //Create a new IGE1
    router.post("/", IGE1.create);

    //Retrive all IGE1
    router.get("/", IGE1.findAll);

    //Retrive a Single IGE1
    router.get("/:id", IGE1.findOne);

    //Update a IGE1
    router.put("/:docEntry", IGE1.update);

    //Delete a IGE1
    router.delete("/:id", IGE1.delete);

    //Delete all IGE1
    router.delete("/", IGE1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", IGE1.getMin);
    router.get("/data/Max/:docEntry", IGE1.getMax);
    router.get("/data/Next/:docEntry", IGE1.getNext);
    router.get("/data/Previous/:docEntry", IGE1.getPrevious);

    app.use('/api/IGE1', router);

}