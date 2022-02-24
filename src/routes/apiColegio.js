const express = require('express')
const router = express.Router()
const path = require('path')
const XLSX = require('xlsx')


const pathEXCEL = path.join( __dirname, '../bd/colegio-1.xls' ); 
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



// view list with EJS template
router.get('/apicolegio' , async (req, res , next) => {
    const file = await readEXCEL(pathEXCEL)
    // console.log(file);
    res.render('./apiColegio', { file })
    // res.send('ok')
})





module.exports =   { 
    router // se requiere e inicializa de manera distinta en el server
};