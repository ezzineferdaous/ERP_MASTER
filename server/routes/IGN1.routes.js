module.exports = app => {

    const IGN1  = require("../controllers/IGN1.controller.js");
    var router = require("express").Router();

    // Create a new IGN1
    router.post("/", IGN1.create);

    // Retrieve all IGN1
    router.get("/", IGN1.findAll);

    // Retrieve a single IGN1
    router.get("/:id", IGN1.findOne);

    // Update a IGN1
    router.put("/:id", IGN1.update);

    // Delete a IGN1
    router.delete("/:id", IGN1.delete);

    // Delete all IGN1
    router.delete("/", IGN1.deleteAll);

    // Get Min and Max ids
    router.get("/data/Min/:docEntry", IGN1.getMin);
    router.get("/data/Max/:docEntry", IGN1.getMax);
    router.get("/data/Next/:docEntry", IGN1.getNext);
    router.get("/data/Previous/:docEntry", IGN1.getPrevious);

    app.use('/api/IGN1', router);

};
