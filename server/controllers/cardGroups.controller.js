const db = require("../models");
const CardGroups = db.CardGroups;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new CardGroups
exports.create = (req, res)  => {
   
    // Create 
    const cardGroup = {
        GroupCode: req.body.GroupCode,
        GroupName: req.body.GroupName,
        GroupType: req.body.GroupType,
        PriceList: req.body.PriceList,
        Discount: req.body.Discount,
    };
    //Save to database
    CardGroups.create(cardGroup, { fields: ['GroupCode', 'GroupName', 'GroupType', 'PriceList', 'Discount'] } /* which attributes can be set */).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de Groupe Partenaire"
            });
        });

};

//Retrive all Countries from the database by Name
exports.findAll = (req, res)  => {
    
    const GroupCode = req.query.GroupCode;
    var condition = GroupCode ? { GroupCode : { [Op.like]: `%${GroupCode}%` } } : null;

    CardGroups.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des Groupes Partenaire"
        });
    });
};

//Find a single CardGroups with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    CardGroups.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de Groupe Partenaire : " + Code
        });
    });
};
//


//Update a CardGroups by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    CardGroups.update(req.body, {
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
    CardGroups.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    CardGroups.max('id')
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
    CardGroups.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    CardGroups.findOne({ where: { id: { [Op.gt]: id }}})
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
 