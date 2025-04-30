const db = require("../models");
const ORPC = db.ORPC;
const Op = db.Sequelize.Op;
// controller (Node.js / Express)
const jwt = require('jsonwebtoken');
const Salaries = db.Salaries;
const Sequelize = require('sequelize')
//Create and Save a new ORPC
exports.create = (req, res)  => {
   
    // Create 21
    const oRPC = {
        DocEntry: req.body.DocEntry,
        DocNum: req.body.DocNum,
        DocDate: req.body.DocDate,
        DueDate: req.body.DueDate,
        CardCode: req.body.CardCode,
        CardName: req.body.CardName,
        TotalHT: req.body.TotalHT,
        DiscPrcnt: req.body.DiscPrcnt,
        RemiseTotal: req.body.RemiseTotal,
        VatSum: req.body.VatSum,
        DocTotal: req.body.DocTotal,
        Comment: req.body.Comment,
        Canceled: req.body.Canceled,
        DocStatus: req.body.DocStatus,
        UserSign: req.body.UserSign,

    };
    //Save to database
    ORPC.create(oRPC, { fields: ['DocEntry', 'DocNum', 'DocDate', 'DueDate', 'CardCode', 'CardName', 'TotalHT','DiscPrcnt' ,'RemiseTotal', 'VatSum', 'DocTotal', 'Comment', 'Canceled', 'DocStatus', 'UserSign'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de ORPC"
            });
        });
};

//Retrive all ORPC from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    ORPC.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des ORPC"
        });
    });
};

exports.findPDFdata = (req, res) => {
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry: { [Op.like]: `%${DocEntry}%` } } : null;

    ORPC.findAll({
        where: condition,
        attributes: ['DocNum', 'DocDate','DueDate', 'CardCode', 'CardName','TotalHT','DiscPrcnt','RemiseTotal','VatSum','DocTotal','Comment'] 
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving data for PDF"
        });
    });
};

//Find a single ORPC with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    ORPC.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de ORPC : " + id
        });
    });
};


//Update a ORPC by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    ORPC.update(req.body, {
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
    ORPC.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    ORPC.max('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
exports.getMaxDoc = (req, res) => {
    ORPC.max('DocEntry')
    .then(DocEntry => {
       
        const nextDocEntry = DocEntry ? DocEntry + 1 : 1;
        res.send({ DocEntry: nextDocEntry });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.getPrevious = (req, res)  => {
    const id = req.params.id;
    ORPC.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    ORPC.findOne({ where: { id: { [Op.gt]: id }}})
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
//apply soft-deletion
//Delete a APInvoiceFrom by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries 
exports.deleteAll = (req, res)  => {

};
////////////////////////////////////////////////////////////

exports.createWithToken = async (req, res) => {
  try {
    // 1) خلق أو جلب Salary
    const salary = await Salaries.create(req.body.salaireData);

    // 2) صايب payload
    const payload = {
      salaryId: salary.id,
      // تقدر تزيد amount، grade، ... لكن راني كنصح فقط بالـ id
    };

    // 3) جنّر التوكن (مدة الصلاحية ساعة مثلاً)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 4) خلق ORPC مع UserSign من salary.id
    const oRPC = {
      /* باقي الحقول */ 
      UserSign: salary.id,
    };
    const data = await ORPC.create(oRPC);

    // 5) رجّع للمستعمل التوكن والداتا
    res.send({ data, token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

 