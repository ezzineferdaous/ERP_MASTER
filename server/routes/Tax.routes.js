module.exports = app => {
    
    const Tax  = require("../controllers/tax.controller.js");
    var router = require("express").Router();

    //Create a new Tax
    router.post("/", Tax.create);

    //Retrive all Tax
    router.get("/", Tax.findAll);

    //Retrive a Single Tax
    router.get("/:id", Tax.findOne);

    router.get("/Rate/:Rate", Tax.findRate);

    //Update a Unite de mesure
    router.put("/:id", Tax.update);

    //Delete a Tax
    router.delete("/:id", Tax.delete);

    //Delete all Tax
    router.delete("/", Tax.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Tax.getMin);
    router.get("/data/Max", Tax.getMax);
    router.get("/data/Next/:id", Tax.getNext);
    router.get("/data/Previous/:id", Tax.getPrevious);

    app.use('/api/Tax', router);

}