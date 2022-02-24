const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid'); // version 4


const pathEXCEL = path.join( __dirname, '../bd/' ); 
// console.log(pathEXCEL);

const readEXCEL = async (ruta) => {
    const workbook = await XLSX.readFile(ruta);
    const woorkbookSheets = workbook.SheetNames 

    const sheet = woorkbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
    // console.log(woorkbookSheets);
    // console.log(dataExcel);
    return dataExcel
}

const pathOperador = path.join( __dirname, '../bd/operador.json' );
const json_operadores = fs.readFileSync(pathOperador, 'utf-8'); // para leer
let operadores = JSON.parse(json_operadores);


// Save
router.post('/newOperador' , (req, res , next) => {
    let operador = req.body.operador || '';
    let celular = req.body.celular || 'Sin cargar';
    let operadorJson = {
        id: uuidv4(),
        operador,
        celular,
        ci: '****'
    }
    console.log('Nuevo Operador: ' + operadorJson.operador);
    operadores.push(operadorJson);
    //save
    const new_operadores = JSON.stringify(operadores);
    fs.writeFileSync(pathOperador, new_operadores, 'utf-8');
    
    res.redirect('vistaOperador')
})




//DELETE
router.post('/deleteOperador', async (req, res) => {
    // const idAux = req.params.operador
    const idAux = req.body.id_operador

    operadores = operadores.filter(item => item.id != idAux );
    // saving data
    const new_operadores = JSON.stringify(operadores);
    await fs.writeFileSync(pathOperador, new_operadores, 'utf-8');

    // res.json('eliminado')
    res.redirect('vistaOperador')
})




router.get('/vistaOperador' , (req, res , next) => {
    res.render('vistaOperador', { file: operadores })
})




router.post('/OperadorUNICO' , async (req, res , next) => {
    const id = req.body.id_operador
    const operador = req.body.operador
    let jsonAux= [{
        id,
        operador
    }]
    res.render('vistaOperadorUNICO', { file: jsonAux })
})




const pathElectorCargado = path.join( __dirname, '../bd/electorCargado.json' );
const json_elctoresCargados = fs.readFileSync(pathElectorCargado, 'utf-8'); // para leer
var electoresCargados = JSON.parse(json_elctoresCargados);


router.post('/cargaELECTOR' , async (req, res , next) => {
    const id_operador = req.body.id_operador
    const nombre_operador = req.body.nombre
    const cedula_elector = req.body.cedula

    const allDATA = await readALLTSJE()

    var auxElectorResponse;
    allDATA.forEach((item) => {
        if (item.cedula == cedula_elector) {
            const auxElector = item
            console.log(auxElector);
            auxElector.id_operador = id_operador
            auxElector.nombre_operador = nombre_operador
            auxElector.cedulaAux = cedula_elector
            auxElectorResponse = auxElector
            console.log('Nueva Carga: '  );
            console.log( auxElector );
        }
    })


    electoresCargados.push(auxElectorResponse);
    //save
    const new_electorCargado = JSON.stringify(electoresCargados);
    fs.writeFileSync(pathElectorCargado, new_electorCargado, 'utf-8');

    // res.send(auxElectorResponse)
    res.render('electoresCargados', { file : electoresCargados})
})

router.get('/electoresCargados', async (req, res) => {
    console.log('visitando electoresCargados');
    console.log(electoresCargados);
    res.render('electoresCargados', { file : electoresCargados})
})



router.get('/dev123' , async (req, res , next) => {

    const allDATA = await readALLTSJE()

    console.log('--------------------- PRUEBA --------------------------------');

    console.log(allDATA[4793]);


    const id_operador = 50
    const nombre = 'messi'
    const cedula = 3198623


    const auxElector = allDATA[4793]

    auxElector.id_operador = id_operador
    auxElector.nombre_operador = nombre
    auxElector.cedulaAux = cedula
    
    console.log('--------------------- Elector --------------------------------');
    console.log(auxElector);



    res.send('ok')
})




const readALLTSJE = async () => {
    
    const pathBD = path.join( __dirname, '../bd/TSJEALL.json' );
    const json_bd = await fs.readFileSync(pathBD, 'utf-8'); // para leer
    const tsje = await JSON.parse(json_bd); // deco 
    // console.log(tsje);
    return tsje
}



module.exports =   { 
    router // se requiere e inicializa de manera distinta en el server
};