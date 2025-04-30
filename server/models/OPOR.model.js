module.exports = (sequelize, DataTypes) => {
    const OPOR = sequelize.define("OPOR", {
        DocEntry: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            unique : true

          },
          DocNum: {
            type: DataTypes.CHAR(10),
            allowNull: false,

          }, 
          DocDate: {
            type: DataTypes.DATEONLY,
            allowNull:false,
            // defaultValue: DataTypes.NOW,
          }, 
          DueDate: {
            type: DataTypes.DATEONLY,   
            allowNull:false,                      
            // defaultValue: DataTypes.NOW,
          }, 
          CardCode: {
            type: DataTypes.CHAR(15),
            allowNull: false,

          },
          CardName: {
            type: DataTypes.STRING(100),
            allowNull: false,

          },
          TotalHT: {
            type: DataTypes.FLOAT(16,2),
            allowNull:false,
            
          },
          DiscPrcnt: {
            type: DataTypes.FLOAT(16,2),
            
            
          },
          RemiseTotal: {
            type: DataTypes.FLOAT(16,2),
            
          },
          VatSum: {
            type: DataTypes.FLOAT(16,2),
            
          },
          DocTotal: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
          },
          Comment: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: false,

          },
          Canceled: {
            type: DataTypes.CHAR(10),
            defaultValue:"No",
            allowNull: false,

            
          },
          DocStatus: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
              isIn: {
                args: [['C', 'O']], /* C = Closed  O = Open */
                msg: "Les valeur autorisée sont (Closed, Open)"
              },
              notNull: {
                msg: 'Veuillez saisir le Type de Status'
              }
            }
          },
          
          UserSign: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:2,

          },
    })
    return OPOR;
}