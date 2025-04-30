module.exports = app => {
    const KPI = require('../controllers/KPI.controller.js');
    var router = require('express').Router();
  

    router.get('/calculate', KPI.calculate);

    router.get('/article', KPI.article);

    router.get('/client', KPI.Client);

    router.get('/famille', KPI.Famille);

    router.get('/jour', KPI.Jour);

    router.get('/stock', KPI.Stock);

    router.get('/magasin', KPI.Magasin);   


    router.get('/stokparmagsan', KPI.stokparmagsan);

  
    app.use('/api/KPI', router);
  };
  