// index.js
const express = require('express');
const cors = require('cors');
const upload = require('./upload');
require('dotenv').config();
const app = express();

var corsOptions = {
  origin: process.env.REACT_APP_SERVER_URL,
  credentials: true,
}; 
console.log(process.env.REACT_APP_SERVER_URL)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync({ force: false, alter: { drop: false }}); // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our application.' });
});

require('./routes/country.routes')(app);
require('./routes/city.routes')(app);
require('./routes/cardGroups.routes')(app);
require('./routes/partner.routes')(app);
require('./routes/address.routes')(app);
require('./routes/attachment.routes')(app);
require('./routes/attachmentLine.routes')(app);
require('./routes/territory.routes')(app);
require('./routes/currency.routes')(app);
require('./routes/ItemGroup.routes')(app);
require('./routes/OIGN.routes')(app);
require('./routes/IGN1.routes')(app);
require('./routes/OWTR.routes')(app);
require('./routes/WTR1.routes')(app);
require('./routes/famille.routes')(app);
require('./routes/IGE1.routes')(app);
require('./routes/OIGE.routes')(app);
require('./routes/IQR1.routes')(app);
require('./routes/OIQR.routes')(app);
require('./routes/ORDN.routes')(app);
require('./routes/ORPD.routes')(app);
require('./routes/ORDR.routes')(app);
require('./routes/RDN1.routes')(app);
require('./routes/RDP1.routes')(app);
require('./routes/PCH1.routes')(app);
require('./routes/OPCH.routes')(app);
require('./routes/POR1.routes')(app);
require('./routes/OPOR.routes')(app);
require('./routes/PDN1.routes')(app);
require('./routes/OPDN.routes')(app);
require('./routes/OQUT.routes')(app);
require('./routes/QUT1.routes')(app);
require('./routes/ODLN.routes')(app);
require('./routes/DLN1.routes')(app);
require('./routes/OINV.routes')(app);
require('./routes/INV1.routes')(app);
require('./routes/SousFamille.routes')(app);
require('./routes/OQUT.routes')(app);
require('./routes/QUT1.routes')(app);
require('./routes/ODLN.routes')(app);
require('./routes/DLN1.routes')(app);
require('./routes/UM.routes')(app);
require('./routes/Warehouse.routes')(app);
require('./routes/Item.routes')(app);
require('./routes/ORIN.routes')(app);
require('./routes/KPI.routes')(app);
require('./routes/RIN1.routes')(app);
require('./routes/ORDN.routes')(app);
require('./routes/RDN1.routes')(app);
require('./routes/Tax.routes')(app);
require('./routes/ORDR.routes')(app);
require('./routes/RDR1.routes')(app);
require('./routes/ORPC.routes')(app);
require('./routes/RPC1.routes')(app);
require('./routes/Stock.routes')(app);
require('./routes/Salaries.routes')(app);
require('./routes/Stock.routes')(app);
require('./routes/pricelist.routes')(app);
require('./routes/pricelistLine.routes')(app);
require('./routes/Stock.routes')(app);
 
// Set up a route for file uploads
app.post('/api/upload', upload.single('image'), (req, res) => {
   console.log("/upload");
   console.log("req.file.filename:"+req.file.filename);
   console.log("file:"+req.file);
  
  if (req.file == undefined) {
    return res.status(400).send({statusCode: 400, message: 'Aucun fichier sélectionné'});
  }

  if(!req.file) {
    return res.status(200).send({
      statusCode: 200,
      message: 'File already exists: ' + req.body.fileName // Or another way to reference the existing file
    });
  }
  return res.status(200).send({ statusCode: 200, message: req.file.filename }); 

});

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
