module.exports = (sequelize, DataTypes) => {
    const OWTR = sequelize.define('OWTR', {
      DocEntry: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, 
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
      },
      Filler: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      Towhs: {
        type: DataTypes.STRING(30),
        allowNull: false,
      }
    });    
  
    return OWTR;
  };
  