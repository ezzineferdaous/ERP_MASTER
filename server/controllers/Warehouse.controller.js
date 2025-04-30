const { UmbrellaSharp } = require('@mui/icons-material');
const db = require('../models');
const Warehouse = db.Warehouse;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new Warehouse
exports.create = (req, res) => {
  // Create
  const NewWarehouse = { CodeWarehouse: req.body.CodeWarehouse, NomWarehouse: req.body.NomWarehouse, Rue: req.body.Rue, NumRue: req.body.NumRue, CountryCode: req.body.CountryCode, City: req.body.City, ActiveInactive: req.body.ActiveInactive, CmptCharges: req.body.CmptCharges, CmptProduit: req.body.CmptProduit, };

  //Save to database 
  Warehouse.create(
    NewWarehouse, { fields: ['CodeWarehouse', 'NomWarehouse', 'Rue', 'NumRue', 'CountryCode', 'City', 'ActiveInactive','CmptCharges','CmptProduit' ], } 
  ).then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de Warehouse',
      });
    });
};

//Retrive all Item Groups from the database by Name
exports.findAll = (req, res) => {

  const CodeWarehouse = req.query.CodeWarehouse;
  var condition = CodeWarehouse ? { CodeWarehouse: { [Op.like]: `%${CodeWarehouse}%` } } : null;

  Warehouse.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Warehouse',
      });
    });
};

//Find a single Warehouse with an id = Code
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  console.log(id);

  Warehouse.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Warehouse : ' + Code,
      });
    });
};

exports.findByCode = (req, res) => {
  const codeWarehouse = req.params.CodeWarehouse;
  
  // console.log("codeWarehouse",codeWarehouse);

  
  Warehouse.findOne({ where: { CodeWarehouse: codeWarehouse } })
    .then((data) => {
      if (data) {
        res.send(data); 
      } else {
        res.status(404).send({
          message: `Warehouse with CodeWarehouse ${codeWarehouse} not found.`,
        }); 
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Warehouse with CodeWarehouse ${codeWarehouse}.`,
      });
    });
};


//Update a Warehouse by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  Warehouse.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Opération correctement achevée',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Erreur lors de la mise a jours id : ' + id,
      });
    });
};

exports.getMin = (req, res) => {
  Warehouse.min('id')
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getMax = (req, res) => {
  Warehouse.max('id')
    .then((id) => { res.send({ id: id }); })
    .catch((err) => {
      res.status(500).send({ message: err.message, });
    });
};

exports.getPrevious = (req, res) => {
  const id = req.params.id;
  Warehouse.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getNext = (req, res) => {
  const id = req.params.id;
  Warehouse.findOne({ where: { id: { [Op.gt]: id } } })
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//apply soft-deletion
//Delete a ItemGroup by the id passed by the request
exports.delete = (req, res) => {};

//Delete All
exports.deleteAll = (req, res) => {};