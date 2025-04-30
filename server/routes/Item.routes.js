module.exports = app => {
    
    const Item  = require("../controllers/Item.controller.js");
    var router = require("express").Router();
 
    //Create a new Item
    router.post("/", Item.create);

    //Retrive all Items
    router.get("/", Item.findAll);

    //Retrive a Single Item
    router.get("/:id", Item.findOne);

    //Update Item
    router.put("/:id", Item.update);

    //Delete a Item
    router.delete("/:id", Item.delete); 

    //Delete all Items
    router.delete("/", Item.deleteAll);
 
    //Update Stoke Item
    router.post("/stock", Item.Stock);
 
    /*router.post("/upload", upload.single('image'), (req, res) => {
        // Handle the uploaded file
        res.json({ message: 'File uploaded successfully!' });
    });*/
 
    // get Min and Max ids
    router.get("/data/Min", Item.getMin);
    router.get("/data/Max", Item.getMax);
    router.get("/data/Next/:id", Item.getNext);
    router.get("/data/Previous/:id", Item.getPrevious);

    app.use('/api/Item', router);

}