const { Router } = require('express');
const {Dog , Temperament} = require('../../db');
const {dbCombined} = require('../../DB/dbCombined');
const router = Router();
const {uploadTemperamentToPosgres} = require('../../DB/dbApi');
const {Op} = require('sequelize');

// With this middleware charge to the DB Posgres the temperaments data
router.use( async (req,res,next)=>{
    const condicion = await Temperament.findByPk(130);
if(condicion === null){
    await uploadTemperamentToPosgres();
}
next()
});

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
        return res.status(404).send('An error occurred in the call', error);
    }
})

router.post('/', async (req,res)=>{
    const {
        name, 
        height_min, 
        height_max, 
        weight_min, 
        weight_max, 
        image, 
        life_span, 
        temperaments
    } = req.body;
    try {
        let dogUpload = await Dog.create({
            name,
            height_min, 
            height_max, 
            weight_min, 
            weight_max, 
            life_span,
            image,
        });

        if(temperaments.length){
            temperaments.map( async (temperament) =>{
                let temp = await Temperament.findOrCreate({where: { name: {[Op.iLike]:temperament}}});
                dogUpload.addTemperament(temp[0])
            })
        }
        return res.status(200).send("The dog was created!!");
    } catch (error) {
        return res.status(404).send('An error occurred');
    }

    
})

module.exports = router;