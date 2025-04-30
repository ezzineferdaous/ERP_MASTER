module.exports = (sequelize, DataTypes) => {
    const POR1 = sequelize.define("POR1", {
        DocEntry: {
            type: DataTypes.INTEGER,
            allowNull: false,


            
          },
          LineNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            

          }, 
          ItemCode: {
            type: DataTypes.STRING(15)
          },
          ItemName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            

          },
          Quantity: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
            
          },
          WhsCode: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: false,

          },
          PriceHT: {
            type: DataTypes.FLOAT(16,2),
          },
          VAT: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
          },
          Price: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
          },
          Discount: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
          },
          RemiseTotal: {
            type: DataTypes.FLOAT(16,2),
            
          },
          
          LineTotal: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
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
    return POR1;
}