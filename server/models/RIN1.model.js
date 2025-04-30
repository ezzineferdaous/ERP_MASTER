module.exports = (sequelize, DataTypes) => {
  const RIN1 = sequelize.define("RIN1", {
      DocEntry: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        LineNum: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }, 

        ItemCode: {
          type: DataTypes.STRING(100)
        },

        ItemName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },

        Quantity: {
          type: DataTypes.FLOAT(16,2),
          allowNull: false,
        },

        WhsCode: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: false,
        },
        PrixHT: {
          type: DataTypes.FLOAT(16,2),
          allowNull: false,
        },
        Price: {
          type: DataTypes.FLOAT(16,2),
          allowNull: false,
        },
        Discount: {
          type: DataTypes.FLOAT(16,2),
          allowNull: false,
        },

        VAT: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: false,
        },

        LineTotal: {
          type: DataTypes.FLOAT(16,2),
          allowNull: false,
        },

        LineHT: {
          type: DataTypes.FLOAT(16,2),
        },
        
        UM: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: false,
        },
       
       
  })
  return RIN1;
}