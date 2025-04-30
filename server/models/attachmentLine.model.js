module.exports = (sequelize, DataTypes) => {

    const AttachmentLine = sequelize.define("AttachmentLine", {      
      Line: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      srcPath: {
        type: DataTypes.STRING(255),
      },
      trgtPath: {
        type: DataTypes.STRING(255),
      },
      FileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      FileExt: {
        type: DataTypes.STRING(8),
      },
      UsrID: {
        type: DataTypes.INTEGER,
      }
    });    
    return AttachmentLine;

  };

 
