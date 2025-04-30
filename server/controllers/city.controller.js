const db = require("../models");
const City = db.City;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new City
exports.create = (req, res)  => {

    //Validate the request
    if(!req.body.Code || !req.body.Name  || !req.body.CntCode) {
        res.status(400).send ({
            message : "Code et Nom de ville est Obligatoir"
        });
        return; 
    }

    // Create 
    const city = {
        Code: req.body.Code,
        Name: req.body.Name,
        CntCode: req.body.CntCode,
    };
    //Save to database
    City.create(city, { fields: ['Code', 'Name', 'CntCode'] } /* which attributes can be set */).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de ville"
            });
        });

};

//Retrive all Countries from the database by Name
exports.findAll = (req, res)  => {
    
    const CntCode = req.query.CntCode;
    var condition = CntCode ? { CntCode : { [Op.like]: `%${CntCode}%` } } : null; 
    //var condition = Name ? { Name:  { [Op.like]: `%${Name}%` } } : null;

    City.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des ville"
        });
    });
};

//Find a single City with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    City.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de ville : " + Code
        });
    });
};
//


//Update a City by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    City.update(req.body, {
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
    City.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    City.max('id')
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
    City.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    City.findOne({ where: { id: { [Op.gt]: id }}})
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
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
 