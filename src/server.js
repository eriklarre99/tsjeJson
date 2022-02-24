const express = require('express')
const path = require('path')
const morgan = require('morgan')


// initializacion
const app = express();


// settings
app.set('port', process.env.PORT || 4000 )
app.set('views', path.join(__dirname , 'views'))
app.set('view engine', 'ejs')



// public static files 
app.use(express.static(path.join(__dirname , 'public')))

// middlewares
app.use(morgan('short'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use( require('./routes/index').router )
app.use( require('./routes/mesas'))
app.use( require('./routes/apiColegio').router)
app.use( require('./routes/apiEscuela').router)
app.use( require('./routes/operador').router)
// app.use( require('./routes/operador.routes').router)




// 404 error page
app.use( (req, res, next ) =>{
    // res.status(404).send('404 Page Not Found')
    res.render('404')
})

// server running
app.listen( app.get('port') , () => {
    console.log(`   --- SERVER ON PORT --> http://localhost:${app.get('port')}`);
})
