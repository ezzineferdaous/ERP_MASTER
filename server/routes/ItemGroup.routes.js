module.exports = (app) => {
  const ItemGroup = require('../controllers/ItemGroup.controller.js');
  var router = require('express').Router();

  //Create a new ItemGroup
  router.post('/', ItemGroup.create);

  //Retrive all ItemGroup
  router.get('/', ItemGroup.findAll);

  //Retrive a Single ItemGroup
  router.get('/:id', ItemGroup.findOne);

  //Update a ItemGroup
  router.put('/:id', ItemGroup.update);

  //Delete a ItemGroup
  router.delete('/:id', ItemGroup.delete);

  //Delete all ItemGroup
  router.delete('/', ItemGroup.deleteAll);

  // get Min and Max ids
  router.get('/data/Min', ItemGroup.getMin);
  router.get('/data/Max', ItemGroup.getMax);
  router.get('/data/Next/:id', ItemGroup.getNext);
  router.get('/data/Previous/:id', ItemGroup.getPrevious);

  app.use('/api/ItemGroup', router);
};
