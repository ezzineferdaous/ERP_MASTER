const db = require("../models");
const Attachment = db.Attachment;
const AttachmentLine = db.AttachmentLine;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')
const IncomingForm = require('formidable').IncomingForm;

//Create and Save a new City
exports.create = (req, res)  => {
    try {
        
        if(!req.body.AttachmentLines) {
            res.status(400).send ({ message : "PJ lignes sont Obligatoir" });
            return; 
        }

        const result = db.sequelize.transaction(async (t) => {
        Attachment.create({
            AttachmentLines: req.body.AttachmentLines,
        },{
            include: ['AttachmentLines'],
        }).then(data => {
            res.send(data);                
        }).catch(err => {
            res.status(500).send ({
                message: err.message || "Erreur lors de la selection d'attachment"
            });
        });
        });

    } catch (error) {
        console.log("Error : "+ error);
    }
};

//Upload the file
/*exports = function upload(req, res) {
    var form = new IncomingForm()
  
    form.on('file', (field, file) => {
      // Do something with the file
      // e.g. save it to the database
      // you can access it using file.path
      console.log(file.path);
    })
    form.on('end', () => {
      res.json()
    })
    form.parse(req)
  }*/

//Retrive all Attachment from the database by Name
exports.findAll = (req, res)  => {
    
    const AbsEntry = req.query.AbsEntry;
    var condition = AbsEntry ? { AbsEntry : { [Op.like]: `%${AbsEntry}%` } } : null;

    Attachment.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection d'attachment"
        });
    });
};

//Find a single Attachment with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    Attachment.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection d'attachment : " + Code
        });
    });
};

//apply soft-deletion
//Delete a City by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries 
exports.deleteAll = (req, res)  => {

};
 