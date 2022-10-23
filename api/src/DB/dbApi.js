const axios = require('axios');
const { MY_API_KEY } = process.env;
const {Temperament} = require('../db');
/*
OBTENGO LOS DATOS DE LA API DE DOGS
Obtengo los datos de la API de perros.
Los guardo en un array separando los datos que necesito.
Para el peso y la altura hay dos medidas en la API que son imperial y metrica.Voy a usar la metrica
que usa Kilos para el peso y para la altura centimetros.
La api usa un metodo getter para el wigth, heigth y life_span.
Los voy a separar y poner en arrays.
*/
let urlApi = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`;

const dbApi = async ()=>{
    { try {
        let response = await axios.get(urlApi);
        let dogsFromApi = await response.data;
        
        let dbDogsFromApi = await dogsFromApi.map( dog => {
            
            let arrayDogTemperament = [];
            if(dog.temperament){
                arrayDogTemperament  = dog.temperament.match(/\w+/ig); // RegExp me trae solo los palabras
            };

            let arrayDogWeight = [];
            if(dog.weight.metric){
                arrayDogWeight = dog.weight.metric.match(/\d+/g); // me trae solo los digitos
            };

            let arrayDogHeight = [];
            if(dog.height.metric){
                arrayDogHeight = dog.height.metric.match(/\d+/g);
            };

            return {
                id : dog.id,
                name : dog.name,
                life_span : dog.life_span,
                image: dog.image.url,
                temperament : arrayDogTemperament,
                weight_min: arrayDogWeight?.[0],
                weight_max: arrayDogWeight?.[1],
                height_min : arrayDogHeight?.[0],
                height_max : arrayDogHeight?.[1]
            }
        })
        
        return dbDogsFromApi;    
        
    } catch (error) {
        throw new Error('No data fetched from "thedogapi"')
    }}
        
};

const dbTemperamentsList = async () =>{
    let dataFromApi = await dbApi();
    let temperamentList= dataFromApi.map( dog => dog.temperament);
    let temperamentListOrdered = temperamentList.flat().sort();
    let temperamentWR = new Set(temperamentListOrdered);
    
    return [... temperamentWR]
}

const uploadTemperamentToPosgres = async() =>{
    let arrayDogsTemperaments = await dbTemperamentsList();
    let arrayTemperament = arrayDogsTemperaments.map( temperament =>  { 
        let obj = {};
        obj['name'] = temperament;
        return obj 
    })
    const temperaments = Temperament.bulkCreate(arrayTemperament)
    return temperaments
}

module.exports = {dbApi , dbTemperamentsList , uploadTemperamentToPosgres}



