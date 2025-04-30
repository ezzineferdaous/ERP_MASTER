module.exports = (sequelize, DataTypes) => {
    const INV1 = sequelize.define("INV1", {
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
            type: DataTypes.STRING(15),
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
          RemiseTotal : {
            type: DataTypes.FLOAT(16,2),
           
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
          UM: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
          },
          LineHT: {
            type: DataTypes.FLOAT(16,2),
          },
         
         
    })
    return INV1;
}