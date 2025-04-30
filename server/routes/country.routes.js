module.exports = app => {
    
    const Country  = require("../controllers/country.controller.js");
    var router = require("express").Router();

    //Create a new Country
    router.post("/", Country.create);

    //Retrive all Countries
    router.get("/", Country.findAll);

    //Retrive a Single Country
    router.get("/:id", Country.findOne);

    //Update a Country
    router.put("/:id", Country.update);

    //Delete a Country
    router.delete("/:id", Country.delete);

    //Delete all Countries
    router.delete("/", Country.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Country.getMin);
    router.get("/data/Max", Country.getMax);
    router.get("/data/Next/:id", Country.getNext);
    router.get("/data/Previous/:id", Country.getPrevious);

    app.use('/api/Country', router);

}