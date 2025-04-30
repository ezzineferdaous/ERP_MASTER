const { UmbrellaSharp } = require('@mui/icons-material');
const db = require('../models');
const UM = db.UM;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new UM
exports.create = (req, res) => {
  // Create
  const NewUM = {
    CodeUM: req.body.CodeUM,
    NomUM: req.body.NomUM,
   };
     
  //Save to database 
  UM.create(
    NewUM, { fields: ['CodeUM', 'NomUM'], } /* which attributes can be set */
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de UM',
      });
    });
};

//Retrive all Item Groups from the database by Name
exports.findAll = (req, res) => {

  const CodeUM = req.query.CodeUM;
  var condition = CodeUM ? { CodeUM: { [Op.like]: `%${CodeUM}%` } } : null;

  UM.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de UM',
      });
    });
};

//Find a single UM with an id = Code
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  console.log(id);

  UM.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de UM : ' + Code,
      });
    });
};
//

//Update a UM by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  UM.update(req.body, {
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
  UM.min('id')
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
  UM.max('id')
    .then((id) => { res.send({ id: id }); })
    .catch((err) => {
      res.status(500).send({ message: err.message, });
    });
};

exports.getPrevious = (req, res) => {
  const id = req.params.id;
  UM.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
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
  UM.findOne({ where: { id: { [Op.gt]: id } } })
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

exports.deleteAll = (req, res) => {};
