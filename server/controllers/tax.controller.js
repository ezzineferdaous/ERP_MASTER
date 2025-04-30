const db = require('../models');
const Tax = db.Tax;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new Currency
exports.create = (req, res) => {
  //Validate the request
  if (!req.body.Code || !req.body.Name) {
    res.status(400).send({
      message: 'Code et Nom de devise est Obligatoir',
    });
    return;
  }
  // Create
  const tax = {
    Code: req.body.Code,
    Name: req.body.Name,
    Rate: req.body.Rate,    
  };
  //Save to database
  Tax.create(tax, { fields: ['Code', 'Name', 'Rate', 'Active'] } /* which attributes can be set */)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de ville',
      });
    });
};

//Retrive all Tax from the database by Name
exports.findAll = (req, res) => {
  const Name = req.query.Name;
  var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null;

  Tax.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection des ville',
      });
    });
};

//Find a single Tax with an id = Code
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tax.findByPk(id)
  .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de ville : ' + Code,
      });
    });
};
exports.findRate= (req, res) => {
  const rate = req.params.Rate;
  Tax.findByPk(rate)
  .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de ville : ' + Code,
      });
    });
};
//

//Update a Tax by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  Tax.update(req.body, {
    where: { id: id },
  }).then((num) => {
      if (num == 1) {
        res.send({
          message: 'Opération correctement achevée',
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'Erreur lors de la mise a jours id : ' + id,
      });
    });
};

exports.getMin = (req, res) => {
  Tax.min('id')
    .then((id) => {
      res.send({ id: id });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getMax = (req, res) => {
  Tax.max('id').then((id) => {
      res.send({ id: id });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getPrevious = (req, res) => {
  const id = req.params.id;
  Tax.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
    .then((id) => {
      res.send({ id: id });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getNext = (req, res) => {
  const id = req.params.id;
  Tax.findOne({ where: { id: { [Op.gt]: id } } })
  .then((id) => {
      res.send({ id: id });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
//apply soft-deletion
//Delete a City by the id passed by the request
exports.delete = (req, res) => {};

//Delete All Tax

exports.deleteAll = (req, res) => {};

exports.deleteAll = (req, res) => {};
