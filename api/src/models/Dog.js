const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    weight:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/free-vector/illustration-dogs-collection_53876-17286.jpg?w=2000',
      validate:{
        isUrl: true,
      }
    },
    life_span:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      get(){
        let lifeValue = this.getDataValue('life_span');
        return lifeValue ? `${lifeValue} years` : null
      }
    },
  });
};
