module.exports = (sequelize, DataTypes) => {
    const IGN1 = sequelize.define("IGN1", {
      DocEntry: {
        type: DataTypes.INTEGER,
        allowNull: false,

      },
      LineNum: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ItemCode: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      ItemName: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      Quantity: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false
      },
      WhsCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Price: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false
      },
      Discount: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false
      },
      LineTotal: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false
      },
      UM: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });

  
    return IGN1;
  };
  