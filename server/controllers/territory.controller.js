const db = require("../models");
const Territory = db.Territory;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new Partner
exports.create = (req, res)  => {
   
    // Create 21
    const territory = {
        descript: req.body.descript
    };
    //Save to database
    Territory.create(territory, { fields: ['descript'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création  territoir"
            });
        });
};

//Retrive all Partners from the database by Name
exports.findAll = (req, res)  => {
    
    const descript = req.query.descript;
    var condition = descript ? { descript : { [Op.like]: `%${descript}%` } } : null;

    Territory.findAll({ where : condition , order:[['descript','ASC']]})
    .then(data => {
            res.send(data);
    }).catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des Partenaire"
        });
    });
};

//Find a single Partner with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    Territory.findByPk(id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de Partenaire : " + id
        });
    });
};
//


//Update a Partner by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    Territory.update(req.body, {
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
    Territory.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    Territory.max('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getPrevious = (req, res)  => {
    const id = req.params.id;
    Territory.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    Territory.findOne({ where: { id: { [Op.gt]: id }}})
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
 