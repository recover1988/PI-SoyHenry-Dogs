const { Dog, Temperament } = require("../db");
/*
OBTENGO DATO DE MI BASE DE DATOS LOCAL EN POSGRES
*/
module.exports = {
  dbPosgres: async () => {
    try {
      let dogsFromPosgres = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return dogsFromPosgres;
    } catch (err) {
      throw new Error("Data was not obtained from DB Posgres");
    }
  },
};
