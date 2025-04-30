module.exports = app => {
    
    const Territory  = require("../controllers/territory.controller.js");
    var router = require("express").Router();

    //Create a new Territory
    router.post("/", Territory.create);

    //Retrive all Territory
    router.get("/", Territory.findAll);

    //Retrive a Single Territory
    router.get("/:id", Territory.findOne);

    //Update a Territory
    router.put("/:id", Territory.update);

    //Delete a Territory
    router.delete("/:id", Territory.delete);

    //Delete all Territory
    router.delete("/", Territory.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Territory.getMin);
    router.get("/data/Max", Territory.getMax);
    router.get("/data/Next/:id", Territory.getNext);
    router.get("/data/Previous/:id", Territory.getPrevious);

    app.use('/api/Territory', router);

}