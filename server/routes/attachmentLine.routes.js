module.exports = app => {
    
    const AttachmentLine  = require("../controllers/attachmentLine.controller.js");
    var router = require("express").Router();

    //Retrive all AttachmentLine
    router.get("/", AttachmentLine.findAll);

    //Retrive AttachmentLine by Attachmentid
    router.get("/Lines/", AttachmentLine.findAllByAttachmentId);
    
    //Retrive a Single AttachmentLine
    router.get("/:id", AttachmentLine.findOne); 

    

    app.use('/api/AttachmentLine', router);

}