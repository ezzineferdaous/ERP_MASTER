const db = require("../models");
const OINV = db.OINV;
const INV1 = db.INV1;
const ORIN = db.ORIN;
const RIN1 = db.RIN1;
const ORDR = db.ORDR; 
const Stock = db.Stock;
const Item = db.Item;
const Famille = db.Famille;
const { Op } = db.Sequelize;
const Sequelize = require('sequelize');

exports.calculate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    console.log("start data :", startDate);
    console.log("end Date :", endDate);

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    
    const oinvResult = await OINV.sum('DocTotal', {
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
    });

    
    const oinvCount = await OINV.count({
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
    });

  
    const ORINResult = await ORIN.sum('DocTotal', {
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
    });

    
    const ORINCount = await ORIN.count({
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
    });

   
    const ORDRCount = await ORDR.count({
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
    });

    const oinvTotal = oinvResult || 0;
    const ORINTotal = ORINResult || 0;
    const difference = oinvTotal - ORINTotal;

    
    res.json({
      data: {
        oinvTotal,
        oinvCount, 
        ORINTotal,
        ORINCount, 
        ORDRCount, 
        difference,
      },
    });

  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: 'An error occurred while calculating the totals.' });
  }
};

exports.article = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      console.log("start data ARTICLE :", startDate);
      console.log("end Date ARTICLE :", endDate);
  
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }
  
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
  
      
      const inv1Sales = await INV1.findAll({
        attributes: [
          'ItemCode', 
          'ItemName', 
          [Sequelize.fn('sum', Sequelize.col('Quantity')), 'totalQuantity'],
        ],
        include: [
          {
            model: OINV,
            required: true,
            where: {
              DocDate: {
                [Op.between]: [start, end],
              },
            },
            attributes: [],
          },
        ],
        group: ['ItemCode', 'ItemName'],
        // order: [[Sequelize.fn('sum', Sequelize.col('Quantity')), 'DESC']],  
        // limit: 10,
      });

      
  
   
      const rin1Sales = await RIN1.findAll({
        attributes: [
          'ItemCode',
          'ItemName',
          [Sequelize.fn('sum', Sequelize.col('Quantity')), 'totalQuantity'],
        ],
        include: [
          {
            model: ORIN,
            required: true,
            where: {
              DocDate: {
                [Op.between]: [start, end],
              },
            },
            attributes: [],
          },
        ],
        group: ['ItemCode','ItemName'],
      });
  
      
      const inv1SalesData = inv1Sales.map(item => ({
        ItemCode: item.ItemCode,
        ItemName: item.ItemName,
        totalQuantity: item.dataValues.totalQuantity,
      }));
  
      const rin1SalesData = rin1Sales.map(item => ({
        ItemCode: item.ItemCode,
        ItemName: item.ItemName,
        totalQuantity: item.dataValues.totalQuantity,
      }));
  
     
      const articleSales = inv1SalesData.map(invItem => {
        const rinItem = rin1SalesData.find(rin => rin.ItemCode === invItem.ItemCode) || { totalQuantity: 0 };
        const difference = invItem.totalQuantity - rinItem.totalQuantity;
        return { ItemCode: invItem.ItemCode, ItemName: invItem.ItemName, quantitySold: difference };
      });
  
      
      articleSales.sort((a, b) => b.quantitySold - a.quantitySold);
  
      
      res.json({
        data: articleSales.slice(0, 10),
      });
  
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: 'An error occurred while calculating the top selling articles.' });
    }
};


exports.Client = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // console.log("start data Client :", startDate);
    // console.log("end Date Client :", endDate);

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

  
    const oinvResult = await OINV.findAll({
      attributes: [
        'CardCode',
        'CardName',  
        [Sequelize.fn('sum', Sequelize.col('DocTotal')), 'totalDocTotal']
      ],
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
      group: ['CardCode', 'CardName'], 
    });

    
    const orinResult = await ORIN.findAll({
      attributes: [
        'CardCode',
        'CardName', 
        [Sequelize.fn('sum', Sequelize.col('DocTotal')), 'totalDocTotal']
      ],
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
      group: ['CardCode', 'CardName'], 
    });

    const oinvData = oinvResult.map(item => ({
      CardCode: item.CardCode,
      CardName: item.CardName,
      totalDocTotal: item.dataValues.totalDocTotal,
    }));

    // console.log("card name data oinvData :", oinvData);

    const orinData = orinResult.map(item => ({
      CardCode: item.CardCode,
      CardName: item.CardName,
      totalDocTotal: item.dataValues.totalDocTotal,
    }));
    // console.log("card name data orinData :", orinData);

    
    const clientSales = oinvData.map(oinvItem => {
      const orinItem = orinData.find(orin => orin.CardCode === oinvItem.CardCode) || { totalDocTotal: 0, CardName: "Unknown" };
      const difference = oinvItem.totalDocTotal - orinItem.totalDocTotal;
      if (difference <= 0) {
        return null; // Ignorer cet élément si la différence est <= 0
      }
      return {
        CardCode: oinvItem.CardCode,     //orinItem.CardCode === "Unknown" ? oinvItem.CardCode : orinItem.CardCode,
        CardName: oinvItem.CardName, // orinItem.CardName === "Unknown" ? oinvItem.CardName : orinItem.CardName,
        difference,
      };
    }).filter(item => item !== null);
    // console.log("card name data :", clientSales);

    res.json({
      data: clientSales,
    });

  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: 'An error occurred while calculating the client totals.' });
  }
};


exports.Famille = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }
    // console.log("start data famille :", startDate);
    // console.log("end Date famille :", endDate);

    const start = new Date(startDate);
    const end = new Date(endDate);

    
    // console.log("start  famille :", start);
    // console.log("end  famille :", end);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const inv1Sales = await db.INV1.findAll({
      attributes: [
        'ItemCode',
        [Sequelize.fn('sum', Sequelize.col('LineTotal')), 'totalLineTotal'],
      ],
      include: [
        {
          model: db.OINV,
          required: true,
          where: {
            DocDate: {
              [Op.between]: [start, end], 
            },
          },
          attributes: [],
        },
      ],
      group: ['ItemCode'],
    });
    // console.log("INV1 Sales famille :", inv1Sales);

    
    const rin1Sales = await db.RIN1.findAll({
      attributes: [
        'ItemCode',
        [Sequelize.fn('sum', Sequelize.col('LineTotal')), 'totalLineTotal'],
      ],
      include: [
        {
          model: db.ORIN,
          required: true,
          where: {
            DocDate: {
              [Op.between]: [start, end], 
            },
          },
          attributes: [],
        },
      ],
      group: ['ItemCode'],
    });
    // console.log("RIN1 Sales famille :", rin1Sales);

    
    const combinedSales = inv1Sales.map(invItem => {
      
      const rinItem = rin1Sales.find(rin => rin.ItemCode === invItem.ItemCode) || { totalLineTotal: 0 };

      
      const invLineTotal = typeof invItem.dataValues.totalLineTotal === 'number' ? invItem.dataValues.totalLineTotal : 0;
      const rinLineTotal = typeof rinItem.totalLineTotal === 'number' ? rinItem.totalLineTotal : 0;

      
      const chiffreAffaires = invLineTotal - rinLineTotal;

      return { ItemCode: invItem.ItemCode, chiffreAffaires };
    });

    // console.log("combinedSales Sales famille :", combinedSales);

    
    const familleSales = {};
    
   
    for (const sale of combinedSales) {
      
      const itemRecord = await db.Item.findOne({ where: { ItemCode: sale.ItemCode } });

     
      const familleCode = itemRecord ? itemRecord.CodeFamille : null;

      if (familleCode) {
        
        if (!familleSales[familleCode]) {
          familleSales[familleCode] = { chiffreAffaires: 0 };
        }
        familleSales[familleCode].chiffreAffaires += sale.chiffreAffaires;
      }
    }

    // console.log("familleSales Sales famille :", familleSales);

    
    const familleResults = await Promise.all(
      Object.keys(familleSales).map(async familleCode => {
        
        const famille = await db.Famille.findOne({ where: { CodeFamille: familleCode } });
        return {
          CodeFamille: familleCode,
          NomFamille: famille ? famille.NomFamille : 'Unknown', 
          ChiffreAffaires: familleSales[familleCode].chiffreAffaires,
        };
      })
    );
    // console.log("famille data  famille:", familleResults);

    
    res.json({ data: familleResults });

  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'An error occurred while calculating the famille totals.' });
  }
};


exports.Jour = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    console.log("start data Jour :", startDate);
    console.log("end Date Jour :", endDate);

    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log("start  Jour :", start);
    console.log("end  Jour :", end);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    
    const oinvResults = await OINV.findAll({
      attributes: [
        [Sequelize.literal('CAST([DocDate] AS DATE)'), 'DocDate'],
        [Sequelize.fn('sum', Sequelize.col('DocTotal')), 'totalFactures'],
      ],
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
      group: [Sequelize.literal('CAST([DocDate] AS DATE)')],
      raw: true,
    });
    console.log("oinvResults  Jour :", oinvResults);

    
    const orinResults = await ORIN.findAll({
      attributes: [
        [Sequelize.literal('CAST([DocDate] AS DATE)'), 'DocDate'],
        [Sequelize.fn('sum', Sequelize.col('DocTotal')), 'totalAvoir'],
      ],
      where: {
        DocDate: {
          [Op.between]: [start, end],
        },
      },
      group: [Sequelize.literal('CAST([DocDate] AS DATE)')],
      raw: true,
    });

    console.log("orinResults  Jour :", orinResults);

   
    const dailySales = [];


    oinvResults.forEach(oinv => {
      const date = oinv.DocDate;
      const totalFactures = oinv.totalFactures;

      
      const orin = orinResults.find(orin => orin.DocDate === date);
      const totalAvoir = orin ? orin.totalAvoir : 0;

      
      const chiffreAffaires = totalFactures - totalAvoir;

      dailySales.push({
        date,
        chiffreAffaires,
      });
    });

    console.log("oinvResults  Jour :", oinvResults);

    
    orinResults.forEach(orin => {
      const date = orin.DocDate;
      const totalAvoir = orin.totalAvoir;

      
      if (!dailySales.some(item => item.date === date)) {
        dailySales.push({
          date,
          chiffreAffaires: -totalAvoir,
        });
      }
    });

    console.log("orinResults  Jour :", orinResults);

    
    dailySales.sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log("dailySales  Jour :", dailySales);

    
    res.json({
      data: dailySales,
    });

  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error:'An error occurred while calculating daily sales.'});
  }
};


exports.Stock = async (req, res) => {
  try {
    const items = await db.Item.findAll({
      attributes: ['ItemCode', 'ItemName', 'EnStock'],
    });

    const stockData = items.map(item => ({
      ItemCode: item.ItemCode,
      ItemName: item.ItemName,
      EnStock: item.EnStock,
    }));

    res.json({
      data: stockData,
    });
  } catch (err) {
    console.error("Error fetching stock data:", err);
    res.status(500).json({ error: 'An error occurred while fetching stock data.' });
  }
};


exports.Magasin = async (req, res) => {
  try {
    const { Magasin } = req.query;

    console.log("magsan :",Magasin);

    if (!Magasin) {
      return res.status(400).json({ error: 'Magasin is required' });
    }

    const items = await db.Item.findAll({
      where: {
        Magasin: {
          [Op.like]: `%${Magasin}%`, 
        },
      },
      attributes: ['ItemCode', 'ItemName', 'EnStock'],
    });

    const magasinData = items.map(item => ({
      ItemCode: item.ItemCode,
      ItemName: item.ItemName,
      EnStock: item.EnStock,
    }));
    console.log("magsan data:", magasinData);

    res.json({
      data: magasinData,
    });
  } catch (err) {
    console.error("Error fetching magasin data:", err);
    res.status(500).json({ error: 'An error occurred while fetching magasin data.' });
  }
};





exports.stokparmagsan = async (req, res) => {
  try {
    const { WhsCode } = req.query;

    console.log("WhsCode :", WhsCode);

    if (!WhsCode) {
      return res.status(400).json({ error: 'WhsCode is required' });
    }

    if (WhsCode === 'ALL') {
      // Fetch all items as in exports.Stock
      const items = await Item.findAll({
        attributes: ['ItemCode', 'ItemName', 'EnStock'],
      });

      // Filter items with EnStock > 0
      const stockData = items
        .filter(item => item.EnStock > 0)
        .map(item => ({
          ItemCode: item.ItemCode,
          ItemName: item.ItemName,
          EnStock: item.EnStock,
        }));

      return res.json({
        data: stockData,
      });
    }

    // Fetch data from Item and Stock tables for specific WhsCode
    const stockData = await Stock.findAll({
      attributes: [
        'ItemCode',
        [Sequelize.fn('sum', Sequelize.col('OutQty')), 'totalOutQty'],
        [Sequelize.fn('sum', Sequelize.col('InQty')), 'totalInQty'],
      ],
      where: {
        WhsCode: {
          [Op.eq]: WhsCode,
        },
      },
      group: ['ItemCode'],
      raw: true,
    });

    const itemData = await Item.findAll({
      attributes: ['ItemCode', 'ItemName'],
      where: {
        ItemCode: {
          [Op.in]: stockData.map(stock => stock.ItemCode),
        },
      },
      raw: true,
    });

    // Calculate stock for each item
    const result = stockData
      .map(stockItem => {
        const item = itemData.find(item => item.ItemCode === stockItem.ItemCode);
        const totalOutQty = parseFloat(stockItem.totalOutQty || 0);
        const totalInQty = parseFloat(stockItem.totalInQty || 0);
        const availableStock = totalInQty - totalOutQty;

        return {
          ItemCode: stockItem.ItemCode,
          ItemName: item ? item.ItemName : 'Unknown',
          AvailableStock: availableStock,
        };
      })
      .filter(item => item.AvailableStock > 0); // Filter out items with AvailableStock <= 0

    // Respond with the result
    res.json({
      data: result,
    });
  } catch (err) {
    console.error("Error fetching stock data for magasin:", err);
    res.status(500).json({ error: 'An error occurred while fetching stock data.' });
  }
};


