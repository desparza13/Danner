const path = require('path');
const express = require('express');

function cargarSwagger(req,res){
    res.status(200).send('Corriendo, ver /swagger');
}

module.exports =function(app){
    app.get('/',cargarSwagger)

    app.get('*', function(req,res){
        res.status(404).send('Página no encontrada');
    });
}