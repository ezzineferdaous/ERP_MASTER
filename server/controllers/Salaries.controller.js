const { UmbrellaSharp } = require('@mui/icons-material');
const db = require('../models');
const Salaries = db.Salaries;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new Salaries
exports.create = (req, res) => {
  const NewSalaries = { Code: req.body.Code, Prenom: req.body.Prenom, Nom: req.body.Nom, Post: req.body.Post, Service: req.body.Service, Active: req.body.Active, Agence: req.body.Agence, Image: req.body.Image, TelP: req.body.TelP, TelPo: req.body.TelPo, email: req.body.email, Adresse: req.body.Adresse, Sexe: req.body.Sexe, DateN: req.body.DateN, PayeN: req.body.PayeN, Nationalite: req.body.Nationalite, SituationF: req.body.SituationF, Nenfants: req.body.Nenfants, GovID: req.body.GovID, SalaireBase: req.body.SalaireBase, Remarque: req.body.Remarque, PJ: req.body.PJ, MDP: req.body.MDP, Profil: req.body.Profil, ID_Rubrique: req.body.ID_Rubrique, ID_Contrat: req.body.ID_Contrat  };
  //Save to database 
  Salaries.create(
    NewSalaries, { fields: ['Code', 'Prenom', 'Nom', 'Post', 'Service', 'Active', 'Active','Agence','Image', 'TelP', 'TelPo', 'email', 'Adresse', 'Sexe', 'DateN','PayeN', 'Nationalite', 'SituationF', 'Nenfants', 'GovID', 'SalaireBase', 'Remarque', 'PJ', 'MDP', 'Profil', 'ID_Rubrique', 'ID_Contrat'  ], } 
  ).then((data) => {
      res.send(data);
    }) .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de Salaries',
      });
    });
};

//Retrive all Salaries from the database by Name
exports.findAll = (req, res) => {
  const Code = req.query.ItemCode; 
  var condition = Code ? { Code: { [Op.like]: `%${Code}%` } } : null;

  Salaries.findAll({ where: condition }).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Salaries',
      });
    });
};

//Find a single Salaries with an id = Code
exports.findOne = (req, res) => {

  const id = req.params.id;
  Salaries.findByPk(id)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Salaries : ' + Code,
      });
    });

};

//Update a Salaries by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  Salaries.update(req.body, {
    where: { id: id },
  }).then((num) => {
      if (num == 1) {
        res.send({
          message: 'Opération correctement achevée',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getMin = (req, res) => {
  Salaries.min('id')
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
  Salaries.max('id')
    .then((id) => { res.send({ id: id }); })
    .catch((err) => {
      res.status(500).send({ message: err.message, });
    });
};

exports.getPrevious = (req, res) => {
  const id = req.params.id;
  Salaries.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
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
  Salaries.findOne({ where: { id: { [Op.gt]: id } } })
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};


// Authenticate Salaries by Prenom, Nom, and MDP
exports.authenticate = async (req, res) => {
 

  try {
    const { Prenom, Nom, password } = req.body;
    console.log('Request received:', { Prenom, Nom, password });
    const user = await Salaries.findOne({
      where: {
        Prenom,
        Nom,
        MDP: password , 
      },
    });

    if (user) {
      // console.log('User not found or invalid credentials');
      
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        {
          id: user.id,
          Prenom: user.Prenom,
          Nom: user.Nom,
          email: user.email,
          Image: user.Image,
        },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' } 
      );

      // console.log('User authenticated successfully:', user)

      res.status(200).send({
        message: 'Login successful',
        token,
        user,
      });
    } else {
      // res.status(401).send({ message: 'Invalid credentials' });
      return res.status(401).send({ message: 'Invalid credentials' });
      // res.status(404).send({ message: 'Invalid credentials 2' });
    }
  } catch (err) {
    // console.error('Error during authentication:', err);
    res.status(500).send({
      message: err.message || 'Error occurred during authentication',
    });
  }
};


//apply soft-deletion
//Delete a Salaries by the id passed by the request
exports.delete = (req, res) => {};

//Delete All
exports.deleteAll = (req, res) => {};
