module.exports = app => {
    
    const Partner  = require("../controllers/partner.controller.js");
    var router = require("express").Router();

    //Create a new Partner
    router.post("/", Partner.create);

    //Retrive all Partner
    router.get("/", Partner.findAll);

    //Retrive a Single Partner
    router.get("/:id", Partner.findOne);

    //Update a Partner
    router.put("/:id", Partner.update);

    //Delete a Partner
    router.delete("/:id", Partner.delete);

    //Delete all Partner
    router.delete("/", Partner.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Partner.getMin);
    router.get("/data/Max", Partner.getMax);
    router.get("/data/Next/:id", Partner.getNext);
    router.get("/data/Previous/:id", Partner.getPrevious);

    app.use('/api/Partner', router);

}