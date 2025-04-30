const db = require("../models");
const Country = db.Country;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new Country
exports.create = (req, res)  => {

    //Validate the request
    if(!req.body.Code) {
        res.status(400).send ({
            message : "Code et Nom de pays est Obligatoir"
        });
        return; 
    }

    // Create 
    const country = {
        Code: req.body.Code,
        Name: req.body.Name,
    };
    //Save to database
    Country.create(country, { fields: ['Code', 'Name'] } /* which attributes can be set */).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de pays"
            });
        });

};

//Retrive all Countries from the database by Name
exports.findAll = (req, res)  => {
    
    const Name = req.query.Name;
    var condition = Name ? { Name : { [Op.like]: `%${Name}%` } } : null;
    //var condition = Name ? { Name:  { [Op.like]: `%${Name}%` } } : null;

    Country.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des pays"
        });
    });
};

//Find a single country with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    Country.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de pays : " + Code
        });
    });
};
//


//Update a Country by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    Country.update(req.body, {
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
    Country.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    Country.max('id')
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
    Country.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    Country.findOne({ where: { id: { [Op.gt]: id }}})
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
//apply soft-deletion
//Delete a Country by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries 
exports.deleteAll = (req, res)  => {

};
 