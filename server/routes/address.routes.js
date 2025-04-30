// Address.routes.js
module.exports = app => {
    
    const Address  = require("../controllers/address.controller.js");
    var router = require("express").Router();

    //Create a new Address
    router.post("/", Address.create);

    //Retrive all Address
    router.get("/", Address.findAll);

    //Retrive all Address of a Partner
    router.get("/CardCode/", Address.findAllByCardCode);

    //Retrive a Single Address
    router.get("/:id", Address.findOne);

    //Update a Address
    router.put("/:id", Address.update);

    //Delete a Address
    router.delete("/:id", Address.delete);

    //Delete all Address
    router.delete("/", Address.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Address.getMin);
    router.get("/data/Max", Address.getMax);
    router.get("/data/Next/:id", Address.getNext);
    router.get("/data/Previous/:id", Address.getPrevious);

    app.use('/api/Address', router);

}