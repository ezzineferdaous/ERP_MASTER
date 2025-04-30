module.exports = app => {
    
    const Currency  = require("../controllers/currency.controller.js");
    var router = require("express").Router();

    //Create a new Currency
    router.post("/", Currency.create);

    //Retrive all Currency
    router.get("/", Currency.findAll);

    //Retrive a Single Currency
    router.get("/:id", Currency.findOne);

    //Update a Currency
    router.put("/:id", Currency.update);

    //Delete a Currency
    router.delete("/:id", Currency.delete);

    //Delete all Countries
    router.delete("/", Currency.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Currency.getMin);
    router.get("/data/Max", Currency.getMax);
    router.get("/data/Next/:id", Currency.getNext);
    router.get("/data/Previous/:id", Currency.getPrevious);

    app.use('/api/Currency', router);

}