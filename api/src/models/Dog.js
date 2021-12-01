const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, 
      primaryKey: true 
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING

    },

    createdID: { //esto es hecho para mejor diferenciar los elementos de la api con los de la db
      type: DataTypes.BOOLEAN, // Es decir todos los que yo creo, tendran esta propiedad. 
      allowNull: false,
      defaultValue: true,
    },

  });
};
