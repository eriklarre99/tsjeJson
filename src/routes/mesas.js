const router = require('express').Router();
const path = require('path')
const XLSX = require('xlsx')

// --------------------------------------------------------------------------

const pathEXCEL = path.join( __dirname, '../bd/escuela.xls' ); 

const readEXCEL = async (ruta) => {
    const workbook = await XLSX.readFile(ruta);
    const woorkbookSheets = workbook.SheetNames 

    const sheet = woorkbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
    // console.log(woorkbookSheets);
    // console.log(dataExcel);
    return dataExcel
}

// --------------------------------------------------------------------------

router.get('/dev', async (req, res, next) => {
    const file = await readEXCEL(pathEXCEL);
    let i = 0;
    file.forEach( (item) => {
        i++;
        if (i < 10) {
            console.log("CI: ", item.cedula);
            console.log("Apellido: ", item.apellido);
            console.log("Nombre: ", item.nombre);
            console.log("Mesa: ", item.mesa);
            console.log("\n");
        }
    })

    res.send("server ready")
})

router.post('/api/dev', async (req, res, next) => {
    // const file = await readEXCEL(pathEXCEL);
    const { cedula, nombre } = req.body;    
    await console.log(nombre);
    res.send(`cedula is: ${cedula}`)
})




// --------------------------------------------------------------------------
router.get('/mesa1', async (req, res, next) => {
    const file = await readEXCEL(pathEXCEL)
    res.render('mesas/mesa1', {
        file
    })
})

router.get('/mesa2', async (req, res, next) => {
    const file = await readEXCEL(pathEXCEL)
    res.render('mesas/mesa2', {
        file: file
    })
})

// --------------------------------------------------------------------------




module.exports = router ;