const db = require("../models");
const Partner = db.Partner;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new Partner
exports.create = (req, res)  => {
   
    // Create 21
    const partner = {
        CardCode: req.body.CardCode,
        CardName: req.body.CardName,
        CardType: req.body.CardType,
        GroupCode: req.body.GroupCode,
        Phone: req.body.Phone,
        Fax: req.body.Fax,
        MailAddres: req.body.MailAddres,
        ICE: req.body.ICE,
        FreeText: req.body.FreeText,
        Territory: req.body.Territory,
        ListNum: req.body.ListNum,
        CreditLine: req.body.CreditLine,
        DebtLine: req.body.DebtLine,
        Currency: req.body.Currency,
        Balance: req.body.Balance,
        Active: req.body.Active,
        IF: req.body.IF,
        RC: req.body.RC,
        ModePaiement: req.body.ModePaiement,
        VatStatus: req.body.VatStatus,
        ECVatCode: req.body.ECVatCode
    };
    //Save to database
    Partner.create(partner, { fields: ['CardCode', 'CardName', 'CardType', 'GroupCode', 'Phone', 'Fax', 'MailAddres', 'ICE', 'FreeText', 'Territory', 'ListNum', 'CreditLine', 'DebtLine', 'Currency', 'Balance',  'Active', 'IF',  'RC', 'ModePaiement', 'VatStatus', 'ECVatCode'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de Partenaire"
            });
        });
};

//Retrive all Partners from the database by Name
exports.findAll = (req, res)  => {
    
    const CardCode = req.query.CardCode;
    var condition = CardCode ? { CardCode : { [Op.like]: `%${CardCode}%` } } : null;

    Partner.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des Partenaire"
        });
    });
};

//Find a single Partner with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    Partner.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de Partenaire : " + id
        });
    });
};
//


//Update a Partner by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    Partner.update(req.body, {
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
    Partner.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    Partner.max('id')
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
    Partner.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    Partner.findOne({ where: { id: { [Op.gt]: id }}})
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
 