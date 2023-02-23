/**
 * AplicaciÃ³ en ExpressJS que crea una API REST senzilla
 * @authors 15584112.clot@fje.edu 15584150.clot@fje.edu
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
    let comprovar = true;

    for (let index = 0; index < partides.length; index++) {
        if (partides[index].codiPartida == req.body.codiPartida) {
            res.status(200, 'error');
            res.send('La partida amb el codi' + req.body.codiPartida + ' ja existeix!');
            res.end();
            comprovar = false;
        }
    }
    if (comprovar) {
        let partida = new Partida(req.body.codiPartida, "", "", "jug1", 0, 0);
        partides.push(partida);
        res.send("La partida amb el codi "+ req.body.codiPartida +" ha estat creada!");
    }

});


app.get('/consultarEstatPartida/partides', (req, res) => res.send(partides));
app.get('/consultarEstatPartida/:codiPartida', (req, res) => {
    let comprovar = true;
    for (let index = 0; index < partides.length; index++) {
        if (partides[index].codiPartida == req.body.codiPartida) {
            res.send(partides[index]);
            comprovar = false;
        }
    }
    if (comprovar) {
        res.status(200, 'error');
        res.send('La partida amb el codi ' + req.body.codiPartida + ' no existeix!');
        res.end();
    }
});

app.put('/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => {
    if (req.body.tipusMoviment != "pedra" && req.body.tipusMoviment != "paper" && req.body.tipusMoviment != "tisores") {
        res.status(404, 'error');
        res.send('El moviment no es correcte!');
        res.end();
    }

    let missatge = "";

    let comprovar = true;
    for (let index = 0; index < partides.length; index++) {
        if (partides[index].codiPartida == req.body.codiPartida) {
            if (partides[index].torn == req.body.jugador) {
                if (req.body.jugador == "jug1") {
                    partides[index].torn = "jug2";
                    contador++;
                    movJug1 = req.body.tipusMoviment;
                } else if (req.body.jugador == "jug2") {
                    partides[index].torn = "jug1";
                    contador++;
                    movJug2 = req.body.tipusMoviment;
                }
                comprovar = false;
            } else {
                comprovar = false;
                res.status(200, 'error');
                res.send('No es el torn del jugador ' + req.body.jugador);
                res.end();   
            }
        }

        if (contador == 2) {
            contador = 0;
            if (movJug1 == "paper" && movJug2 == "pedra") {
                missatge = 'El jugador 1 ha escollit PAPER, el Jugador 2 PEDRA. El Jugador 1 ha guanyat aquesta ronda.';
                partides[index].vicJug1++;
            } else if (movJug1 == "pedra" && movJug2 == "tisores") {
                missatge = "El jugador 1 ha escollit PEDRA, el Jugador 2 tisores. El Jugador 1 ha guanyat aquesta ronda.";
                partides[index].vicJug1++;
            } else if (movJug1 == "tisores" && movJug2 == "paper") {
                missatge = "El jugador 1 ha escollit tisores, el Jugador 2 PAPER. El Jugador 1 ha guanyat aquesta ronda.";
                partides[index].vicJug1++;
            } else if (movJug1 == "pedra" && movJug2 == "paper") {
                missatge = "El jugador 1 ha escollit PEDRA, el Jugador 2 PAPER. El Jugador 2 ha guanyat aquesta ronda.";
                partides[index].vicJug2++;
            } else if (movJug1 == "tisores" && movJug2 == "pedra") {
                missatge = "El jugador 1 ha escollit tisores, el Jugador 2 PEDRA. El Jugador 2 ha guanyat aquesta ronda.";
                partides[index].vicJug2++;
            } else if (movJug1 == "paper" && movJug2 == "tisores") {
                missatge = "El jugador 1 ha escollit PAPER, el Jugador 2 tisores. El Jugador 2 ha guanyat aquesta ronda.";
                partides[index].vicJug2++;
            }else if (movJug1 == movJug2) {
                partides[index].torn = "jug1";
                missatge = "Els dos jugadors heu escollit " + movJug1 + ". Es un EMPAT!";
            }
        }
        if (partides[index].vicJug1 == 3) {
            res.send(missatge + '\nFELICITATS JUGADOR 1 HAS GUANYAT LA PARTIDA!');
        } else if (partides[index].vicJug2 == 3) {
            res.send(missatge + '\nFELICITATS JUGADOR 2 HAS GUANYAT LA PARTIDA!');
        } else if (contador == 0){
            res.send(missatge);
        }else {
            res.send('El jugador  ' + partides[index].torn + ' ha de fer el seu moviment');
        }
    }

    if (comprovar) {
        res.status(200, 'error');
        res.send('La partida amb el codi ' + req.body.codiPartida + ' no existeix!');
        res.end();
    }

    res.send(partida);
});

app.delete('/acabarJoc/codiPartida', (req, res) => {
    let comprovar = true;
    for (let index = 0; index < partides.length; index++) {
        if (partides[index].codiPartida == req.body.codiPartida) {
            res.status(200, 'error');
            partides.splice(index, 1);
            res.send("Partida amb el codi " + req.body.codiPartida + " eliminada!");
            res.end();
            comprovar = false;
        }
    }
    if (comprovar) {
        res.send('La partida amb el codi ' + req.body.codiPartida + ' no existeix!');
    }


});


app.listen(3000, () => console.log('inici servidor'));

class Partida {

    constructor(codiPartida, jugador, moviment, torn, vicJug1, vicJug2) {
        this.codiPartida = codiPartida;
        this.jugador = jugador;
        this.moviment = moviment;
        this.torn = "jug1";
        this.vicJug1 = vicJug1;
        this.vicJug2 = vicJug2;
    }
    getCodiPartida() {
        return this.codiPartida;
    }
    setCodiPartida(codiPartida) {
        this.codiPartida = codiPartida;
    }
    getJugador() {
        return this.jugador;
    }
    setJugador(jugador) {
        this.jugador = jugador;
    }
    getMoviment() {
        return this.moviment;
    }
    setMoviment(moviment) {
        this.moviment = moviment;
    }
    getTorn() {
        return this.torn;
    }
    setTorn(torn) {
        this.torn = torn;
    }
    getVicJug1() {
        return this.vicJug1;
    }
    setVicJug1(vicJug1) {
        this.vicJug1 = vicJug1;
    }
    getVicJug2() {
        return this.vicJug2;
    }
    setVicJug2(vicJug2) {
        this.vicJug2 = vicJug2;
    }

    getPartida() {
        return this.codiPartida + " " + this.jugador + " " + this.moviment + " " + this.torn + " " + this.vicJug1 + " " + this.vicJug2;
    }

    toString() {
        return "Partida{" + "codiPartida=" + codiPartida + ", jugador=" + jugador + ", moviment=" + moviment + ", torn=" + torn + ", vicJug1=" + vicJug1 + ", vicJug2=" + vicJug2 + '}';
    }
}

