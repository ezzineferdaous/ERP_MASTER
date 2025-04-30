module.exports = (sequelize, DataTypes) => {
  const OIGN = sequelize.define('OIGN', {
    DocEntry: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      
    },
    DocNum: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    DocDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Comment: {
      type: DataTypes.STRING(200) // Corrected from Remarque to Comment
    },
    UserSign: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  

  return OIGN;
};
