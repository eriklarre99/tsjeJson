const mongoose = require('mongoose')
const { Schema } = mongoose;

const electorSchema = new Schema(
    {
        cedula: { type: String, required: true, unique: true },
        apellido: String,
        nombre: String,
        direccion: String,
        barrio: String,
        afiliacion: String,
        fecha_nac: String,
        local: String,
        mesa: String,
        orden: String
    },
    {
        timestamps: true
    }
)

//models of database, collections and Schema
module.exports = mongoose.model('electores', electorSchema);