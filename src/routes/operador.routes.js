const router = require('express').Router()
const pool = require('../database')


// Listar Operadores 
router.get('/vistaOperador' , async (req, res) => {
    const operadores = await pool.query("SELECT * FROM operador");
    // res.send(operadores)
    res.render('vistaOperador', { file: operadores })
})



router.post('/newOperador', async (req, res) => {
    let { operador, celular } = req.body;
    if (celular == '') celular = 'sin cargar' 
    console.log(operador, celular);

    const getData = await pool.query(`INSERT INTO operador ( nombre, celular) VALUES ( '${operador}', '${celular}' )  `)
    // console.log(' get Data -> ' , getData);
    res.redirect("vistaOperador");
    // res.send({operador, celular});
})


module.exports = {
    router
}