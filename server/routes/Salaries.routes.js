module.exports = app => {
    
    const Salaries  = require("../controllers/Salaries.controller.js");
    var router = require("express").Router();
 
    //Create a new Salaries
    router.post("/", Salaries.create);

    //Retrive all Salaries
    router.get("/", Salaries.findAll);

    //Retrive a Single Salaries
    router.get("/:id", Salaries.findOne);

    //Update Salaries
    router.put("/:id", Salaries.update);

    //Delete a Salaries
    router.delete("/:id", Salaries.delete);

    //Delete all Salaries
    router.delete("/", Salaries.deleteAll);
 
    router.post('/login', Salaries.authenticate);
 
    // get Min and Max ids
    router.get("/data/Min", Salaries.getMin);
    router.get("/data/Max", Salaries.getMax);
    router.get("/data/Next/:id", Salaries.getNext);
    router.get("/data/Previous/:id", Salaries.getPrevious);

    app.use('/api/Salaries', router);

}