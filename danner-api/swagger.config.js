module.exports={
    swaggerDefinition:{
        swagger:"2.0",
        info:{
            "title":"API Danner",
            "description": "",
            "version": "1.0.0",
            "servers": ["https://danner-api.onrender.com/"]
        }
    },
    apis: ['index.js', 'src/routes/*.js', 'rutas.js']
}