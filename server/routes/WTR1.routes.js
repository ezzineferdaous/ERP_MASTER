module.exports = app => {

    const WTR1  = require("../controllers/WTR1.controller.js");
    var router = require("express").Router();

    // Create a new WTR1
    router.post("/", WTR1.create);

    // Retrieve all WTR1
    router.get("/", WTR1.findAll);

    // Retrieve a single WTR1
    router.get("/:id", WTR1.findOne);

    // Update a WTR1
    router.put("/:id", WTR1.update);

    // Delete a WTR1
    router.delete("/:id", WTR1.delete);

    // Delete all WTR1
    router.delete("/", WTR1.deleteAll);

    // Get Min and Max ids
    router.get("/data/Min/:docEntry", WTR1.getMin);
    router.get("/data/Max/:docEntry", WTR1.getMax);
    router.get("/data/Next/:docEntry", WTR1.getNext);
    router.get("/data/Previous/:docEntry", WTR1.getPrevious);

    app.use('/api/WTR1', router);

};
