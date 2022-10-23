const { Router } = require('express');
// const {dbCombined} = require('../../DB/dbCombined');
const {dbApi} = require('../../DB/dbApi');
const router = Router();

router.get('/', async (req,res) => {
    const allDataDogs = await dbApi();

});

module.exports = router;