// Address.controller.js
const db = require("../models");
const Address = db.Address;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new Address
exports.create = (req, res)  => {
   
    // Create 
    const address = {
        Code: req.body.Code,
        AddressType: req.body.AddressType,
        Street: req.body.Street,
        Block: req.body.Block,
        CountryCode: req.body.CountryCode,
        CityCode: req.body.CityCode,
        ZIPCode: req.body.ZIPCode,
        CardCode: req.body.CardCode,
    };
    //Save to database
    Address.create(address, { fields: ['Code', 'AddressType', 'Street', 'Block', 'CountryCode', 'CityCode', 'ZIPCode', 'CardCode'] } /* which attributes can be set */).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création - Address"
            });
        });
};

//Retrive all Countries from the database by Name
exports.findAll = (req, res)  => {
    
    const Code = req.query.Code;
    var condition = Code ? { Code : { [Op.like]: `%${Code}%` } } : null;

    Address.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection - Address"
        });
    });
};

//Retrive all Countries from the database by Name
exports.findAllByCardCode = (req, res)  => {

    const CardCode = req.query.CardCode;
    var condition = CardCode ? { CardCode : { [Op.eq]: `${CardCode}` } } : { CardCode : { [Op.is]: null } };

    Address.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection - Address"
        });
    });
};

//Find a single Address with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    Address.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection - Address : " + Code
        });
    });
};
//


//Update a Address by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    Address.update(req.body, {
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
    Address.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    Address.max('id')
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
    Address.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    Address.findOne({ where: { id: { [Op.gt]: id }}})
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
 