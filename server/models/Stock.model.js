module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
      TransType: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      DocNum: {
        type: DataTypes.STRING(100),
        notEmpty: true, 
        allowNull: false,
      },
      CardCode: {
        type: DataTypes.CHAR(15),
        notEmpty: false, 
        

      },
      ItemCode: {
        type: DataTypes.STRING(15),
        notEmpty: true, 
      },
      LineNum: {
        type: DataTypes.INTEGER,
        notEmpty: true, 
     
      },
      InQty: {
        type: DataTypes.FLOAT,
        notEmpty: true, 
      },
      OutQty: {
        type: DataTypes.FLOAT,
        notEmpty: true, 
      },
      WhsCode: {
        type: DataTypes.STRING(15),
        notEmpty: true, 
        allowNull: false
      },
      Price: {
        type: DataTypes.FLOAT,
        notEmpty: true, 
        allowNull: false
      }
    });
  
    return Stock;
  };
  