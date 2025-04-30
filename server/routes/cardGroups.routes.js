module.exports = app => {
    
    const CardGroups  = require("../controllers/cardGroups.controller.js");
    var router = require("express").Router();

    //Create a new CardGroups
    router.post("/", CardGroups.create);

    //Retrive all CardGroups
    router.get("/", CardGroups.findAll);

    //Retrive a Single CardGroups
    router.get("/:id", CardGroups.findOne);

    //Update a CardGroups
    router.put("/:id", CardGroups.update);

    //Delete a CardGroups
    router.delete("/:id", CardGroups.delete);

    //Delete all CardGroups
    router.delete("/", CardGroups.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", CardGroups.getMin);
    router.get("/data/Max", CardGroups.getMax);
    router.get("/data/Next/:id", CardGroups.getNext);
    router.get("/data/Previous/:id", CardGroups.getPrevious);

    app.use('/api/CardGroups', router);

}