const db = require("../models");
const AttachmentLine = db.AttachmentLine;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')
 
//Retrive all AttachmentLine from the database by Name
exports.findAll = (req, res)  => {
    
    const AbsEntry = req.query.AbsEntry;
    var condition = AbsEntry ? { AbsEntry : { [Op.like]: `%${AbsEntry}%` } } : null;

    AttachmentLine.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des lignes d'attachment"
        });
    });
};

//Find a single AttachmentLine with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    AttachmentLine.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection dse lignes d'attachment : " + Code
        });
    });
};

//Retrive all Countries from the database by Name
exports.findAllByAttachmentId = (req, res)  => {
    const AttachmentId = req.query.AttachmentId;
    var condition = AttachmentId ? { AttachmentId : { [Op.eq]: `${AttachmentId}` } } : { AttachmentId : { [Op.is]: null } };

     AttachmentLine.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection - AttachmentLine"
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
 