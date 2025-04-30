module.exports = app => {
    
    const City  = require("../controllers/city.controller.js");
    var router = require("express").Router();

    //Create a new City
    router.post("/", City.create);

    //Retrive all Countries
    router.get("/", City.findAll);

    //Retrive a Single City
    router.get("/:id", City.findOne);

    //Update a City
    router.put("/:id", City.update);

    //Delete a City
    router.delete("/:id", City.delete);

    //Delete all Countries
    router.delete("/", City.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", City.getMin);
    router.get("/data/Max", City.getMax);
    router.get("/data/Next/:id", City.getNext);
    router.get("/data/Previous/:id", City.getPrevious);

    app.use('/api/City', router);

}