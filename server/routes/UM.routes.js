module.exports = app => {
    
    const UM  = require("../controllers/UM.controller.js");
    var router = require("express").Router();

    //Create a new UM
    router.post("/", UM.create);

    //Retrive all Countries
    router.get("/", UM.findAll);

    //Retrive a Single UM
    router.get("/:id", UM.findOne);

    //Update a Unite de mesure
    router.put("/:id", UM.update);

    //Delete a UM
    router.delete("/:id", UM.delete);

    //Delete all Countries
    router.delete("/", UM.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", UM.getMin);
    router.get("/data/Max", UM.getMax);
    router.get("/data/Next/:id", UM.getNext);
    router.get("/data/Previous/:id", UM.getPrevious);

    app.use('/api/UM', router);

}