const { Router } = require('express');
// const {dbCombined} = require('../../DB/dbCombined');
const {dbApi , uploadTemperamentToPosgres, dbTemperamentsList} = require('../../DB/dbApi');
const {Temperament} = require('../../db');
const router = Router();

router.get('/', async (req,res) => {
    let prueba2 = await uploadTemperamentToPosgres();
    try {
        let temperament = await Temperament.findAll({
            attributes:['id' , 'name']
        })
        res.status(200).json(temperament)
    } catch (error) {
        res.status(400).send('A error has presented in the DB API')
    }
});

module.exports = router;