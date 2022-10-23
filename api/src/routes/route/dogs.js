const { Router } = require('express');
const {Dog , Temperament} = require('../../db');
const {dbCombined} = require('../../DB/dbCombined');
const router = Router();


router.get('/', async (req,res)=>{
    const {name} = req.query;
    const allDataDogs = await dbCombined();
    
    try {
        if(name){
            let foundDogs = allDataDogs.filter(dog => new RegExp(name,'ig').test(dog.name));
            
            foundDogs.length > 0 ? res.status(200).json(foundDogs) : res.status(404).send('Dog not found')
        }else{
            return res.status(200).json(allDataDogs)
        }
        
    } catch (error) {
        return res.status(404).send('An error occurred in the call', error);
    }
});

router.get('/:idRaza', async (req,res)=>{
    const {idRaza} = req.params;
    const allDataDogs = await dbCombined();
    try {
        let foundByIdRaza = allDataDogs.filter( dog => idRaza === dog.name);
        if(foundByIdRaza.length > 0){
            res.status(200).json(foundByIdRaza);
        }else{
            res.status(404).send('A dog with that idRaza was not found')
        }  
    } catch (error) {
        
    }
})

router.post('/', async (req,res)=>{
    const {
        name, 
        height, 
        weight, 
        image, 
        life_span, 
        temperaments
    } = req.body;

    let dog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image,
    });
    let relateTemperament = await Temperament.findAll({
        where: {name: temperaments},
    })
    dog.addTemperament(relateTemperament);
    res.status(200).send("The dog was created!!");
})

module.exports = router;