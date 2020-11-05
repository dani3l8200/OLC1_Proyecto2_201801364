const express = require('express');
const parser = require('../util/Gramatica')

let Router = express.Router();
Router.get('/', (req,res) =>{
    res.send('Traductor JS/Python');
})

Router.post('/TraductorJS', (req, res) => {
            let data = req.body
            try {
                console.log(data['data'])
                let auxData = JSON.stringify(data['data']);
                let test = JSON.parse(auxData)
                console.log(test);
                const arrayReturnToString = parser.parse(test);
                if (arrayReturnToString.length > 1 && arrayReturnToString.length <= 3) {
                    console.log(arrayReturnToString[1]);

                    let results = {
                        'astDot': arrayReturnToString[0],
                        'traduccion': arrayReturnToString[1],
                        'Tokens': arrayReturnToString[2]
                    }

                    res.status(200).send({
                        code: '200',
                        data: results
                    })

                } else if (arrayReturnToString.length == 1) {
                    console.log(arrayReturnToString[0]);
                    let results = {
                        'errorsS': arrayReturnToString[0]
                    }
                    res.status(200).send({
                        code: '200',
                        errors: results
                    })
                } else {
                    res.status(500).send('Error en el parsing');
                    console.log('error parsing');
                }
            } catch (error) {
                console.log(error);
                return;
            }
        })
    


module.exports = Router;