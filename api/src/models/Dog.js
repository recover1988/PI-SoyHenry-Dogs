const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      height_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.height_min} - ${this.height_max}`;
        },
      },
      weight_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.weight_min} - ${this.weight_max}`;
        },
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://img.freepik.com/free-vector/illustration-dogs-collection_53876-17286.jpg?w=2000",
        validate: {
          isUrl: true,
        },
      },
      life_span: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
