module.exports = (sequelize, DataTypes) => {
    const PCH1 = sequelize.define("PCH1", {
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
            allowNull: false
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
    return PCH1;
}