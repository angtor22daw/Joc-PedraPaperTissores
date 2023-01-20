/**
 * Aplicació en ExpressJS que crea una API REST senzilla
 * @author 15584112.clot@fje.edu
 * @version 2.0 10.10.21
 */
const express = require('express'); // IMPORTAR BIBLIOTECA
const app = express(); // UTILIZAR BIBLIOTECA app PUEDES CAMBIARLO POR OTRO NOMBRE

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

let partides = [];

var contador = 0;
var movJug1 = "";
var movJug2 = "";

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use(express.static('public'));

// app.get('/', function (req, res) {
//     // COGE INDEX.HTML
//     res.send();
// });

app.get('/', (req, res) => res.send('hola'));

app.post('/iniciarJoc/codiPartida', (req, res) => {
    console.log('req.body.codiPartida');
    if (partides.find(a => a.codiPartida === parseInt(req.body.codiPartida))) {
        res.status(404, 'error');
    }else{
        let partida = { codiPartida: parseInt(req.body.codiPartida), jugador: null, moviment: null, torn: "jug1", vicJug1: 0, vicJug2: 0 };
        partides.push(partida);
        
    }
    res.send(partides);
});

app.get('/consultarEstatPartida/partides', (req, res) => res.send(partides));
app.get('/consultarEstatPartida/:codiPartida', (req, res) => {
    let partida = partides.find(a => a.codiPartida === parseInt(req.params.codiPartida));
    if (!partida) res.status(404, 'error');
    res.send(partida);
});

app.put('/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => {
    var partida = partides.find(a => a.codiPartida === parseInt(req.body.codiPartida));

    if (req.body.jugador == partida.torn) {
        partida.jugador = req.body.jugador;
        partida.moviment = ++contador;

        if (partida.torn == "jug1") {
            movJug1 = req.body.tipusMoviment;
            partida.torn = "jug2";
        } else {
            movJug2 = req.body.tipusMoviment;
            partida.torn = "jug1";
        }
    } else {
        res.status(404, 'No es el teu torn, espera a que l\'altre jugador faci el seu moviment');
    }
    if (contador == 2) {
        contador = 0;
        if (movJug1 == "pedra" && movJug2 == "paper") {
            partida.vicJug2++;
        } else if (movJug1 == "pedra" && movJug2 == "tissores") {
            partida.vicJug1++;
        } else if (movJug1 == "paper" && movJug2 == "pedra") {
            partida.vicJug1++;
        } else if (movJug1 == "paper" && movJug2 == "tissores") {
            partida.vicJug2++;
        } else if (movJug1 == "tissores" && movJug2 == "pedra") {
            partida.vicJug2++;
        } else if (movJug1 == "tissores" && movJug2 == "paper") {
            partida.vicJug1++;
        } else {
            movJug1 = "";
            movJug2 = "";
            partida.torn = "jug1";
            res.status(404, 'EMPAT - Torneu a jugar');
        }
    }
    if (partida.vicJug1 == 3) {
        res.status(404, 'FELICITATS jugador 1, has guanyat');
    } else if (partida.vicJug2 == 3) {
        res.status(404, 'FELICITATS jugador 2, has guanyat');
    }

    // console.log("movJug1: "+movJug1);
    // console.log("movJug2: "+movJug2);
    res.send(partida);

});

app.delete('/acabarJoc/:codiPartida', (req, res) => {
    let partida = partides.find(a => a.codiPartida === parseInt(req.params.codiPartida));
    if (!partida) res.status(404, 'error');
    let index = partides.indexOf(partida);
    partides.splice(index, 1);
    res.send(partides);
});

app.listen(3000, () => console.log('inici servidor'));
//PARA JUGAR
//http://localhost:3000/iniciarJoc/1

