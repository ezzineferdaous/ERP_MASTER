const db = require('../models');
const SousFamille = db.SousFamille;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new SousFamille
exports.create = (req, res) => {
  // Create
  const NewSousFamille = {
    CodeSFamille: req.body.CodeSFamille,
    NomSFamille: req.body.NomSFamille,
    CodeFamille: req.body.CodeFamille,
   };
     
  //Save to database 
  SousFamille.create(
    NewSousFamille, { fields: ['CodeSFamille', 'NomSFamille', 'CodeFamille'], } /* which attributes can be set */
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de Sous Famille',
      });
    });
};

//Retrive all Item Groups from the database by Name
exports.findAll = (req, res) => {

  const CodeFamille = req.query.CodeFamille;
  var condition = CodeFamille ? { CodeFamille: { [Op.like]: `%${CodeFamille}%` } } : null;

  SousFamille.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection des Sous Famille',
      });
    });
};

//Find a single Famille with an id = Code
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  console.log(id);

  SousFamille.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Sous Famille : ' + Code,
      });
    });
};
//

//Update a SousFamille by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  SousFamille.update(req.body, {
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
  SousFamille.min('id')
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
  SousFamille.max('id')
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getPrevious = (req, res) => {
  const id = req.params.id;
  SousFamille.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
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
  SousFamille.findOne({ where: { id: { [Op.gt]: id } } })
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
