const { Dog, Temperament } = require("../db");
/*
OBTENGO DATO DE MI BASE DE DATOS LOCAL EN POSGRES
*/
module.exports = {
  dbPosgres: async () => {
    try {
      let dogsFromPosgres = await Dog.findAll({
        include: Temperament,
      });

      let dogsFromPos = dogsFromPosgres.map((dog) => {
        return {
          id: dog.id,
          name: dog.name,
          life_span: dog.life_span,
          image: dog.image,
          temperament: dog.temperaments.map((i) => i.name),
          weight_min: dog.weight_min,
          weight_max: dog.weight_max,
          height_min: dog.height_min,
          height_max: dog.height_max,
          userCreate: true,
        };
      });

      return dogsFromPos;
    } catch (err) {
      throw new Error("Data was not obtained from DB Posgres");
    }
  },
};
