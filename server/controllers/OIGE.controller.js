// OIGE.controller.js
const db = require("../models");
const OIGE = db.OIGE;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new OIGE
exports.create = (req, res)  => {
   
    // Create 21
    const NewOIGE = {
        DocEntry: req.body.DocEntry,
        DocNum: req.body.DocNum,
        DocDate: req.body.DocDate,
        Comment: req.body.Comment,
        UserSign: req.body.UserSign,
        
    };
    //Save to database
    OIGE.create(NewOIGE, { fields: ['DocEntry', 'DocNum', 'DocDate', 'Comment', 'UserSign',] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de OIGE"
            });
        });
};

//Retrive all OIGE from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    OIGE.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des OIGE"
        });
    });
};

//Find a single OIGE with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    OIGE.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de OIGE : " + id
        });
    });
};
//


//Update a OIGE by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    OIGE.update(req.body, {
        where : {id: id }
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Opération correctement achevée"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message : "Erreur lors de la mise a jours id : " + id
        });
    });
};

exports.getMin = (req, res)  => {
    OIGE.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    OIGE.max('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
exports.getMaxDoc = (req, res) => {
    OIGE.max('DocEntry')
    .then(DocEntry => {
        
        const nextDocEntry = DocEntry ? DocEntry + 1 : 1;
        res.send({ DocEntry: nextDocEntry });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getPrevious = (req, res)  => {
    const id = req.params.id;
    OIGE.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getNext = (req, res)  => {
    const id = req.params.id;
    OIGE.findOne({ where: { id: { [Op.gt]: id }}})
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
//apply soft-deletion
//Delete a CardGroup by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries 
exports.deleteAll = (req, res)  => {

};
 