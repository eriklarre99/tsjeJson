const express = require('express')
const router = express.Router()
const path = require('path')
const XLSX = require('xlsx')
const fs = require('fs')


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


// view main
router.get('/' , (req, res , next) =>{
    // res.render('index')
    // res.send('hey dom')
    res.redirect('unificado')
})    


const pathBD = path.join( __dirname, '../bd/TSJEALL.json' );
const json_bd = fs.readFileSync(pathBD, 'utf-8'); // para leer


router.get('/unificado' , async (req, res , next) => {
    let tsje = await JSON.parse(json_bd); // deco 
    res.render('unificado', {
        file: tsje
    })
})


router.get('/dev' , (req, res , next) => {
    // let tsje = JSON.parse(json_bd); // deco 
    // res.json(tsje)
    res.send('dev')
})

router.get('/test' , (req, res , next) => {
    res.send('test')
})

module.exports =   { 
    router // se requiere e inicializa de manera distinta en el server
};