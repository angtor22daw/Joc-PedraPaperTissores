/**
 * Aplicació en ExpressJS que crea una API REST senzilla
 * @author 15584112.clot@fje.edu
 * @version 2.0 10.10.21
 */
 const express = require('express'); // IMPORTAR BIBLIOTECA
 const app=express(); // UTILIZAR BIBLIOTECA app PUEDES CAMBIARLO POR OTRO NOMBRE
 
 app.use(express.urlencoded({extended: true}));
 app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body
 
 let partides = [/*
     {codiPartida:1},
     {codiPartida:2, vicJug1:0, vicJug2:0},
     {codiPartida:3, vicJug1:0, vicJug2:0}
     */
 ];

 app.get('/', (req, res)=>res.send('hola'));
 
 app.post('/iniciarJoc/:codiPartida', (req, res)=>{
    console.log('req.body.codiPartida');
    let partida={codiPartida: parseInt(req.body.codiPartida), vicJug1:0,vicJug2:0/*, nom: req.body.nom */};
    partides.push(partida);
    res.send(partides);
});

 app.get('/consultarEstatPartida/partides', (req, res)=>res.send(partides));
 app.get('/consultarEstatPartida/:codiPartida', (req, res)=>{
     let partida = partides.find(a =>a.codiPartida===parseInt(req.params.codiPartida));
     if (!partida) res.status(404, 'error');
     res.send(partida);
 });

 app.put('/moureJugador/codiPartida/jugador/tipusMoviment', (req, res)=>{
    let nouAlumne={codi: parseInt(req.body.codi), nom: req.body.nom };
    let alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    let index =alumnes.indexOf(alumne);
    alumnes[index]=nouAlumne; // Substitueix un alumne per altre
    res.send();
});
/*
app.put('/api/alumnes/:codi', (req, res)=>{
    let nouAlumne={codi: parseInt(req.body.codi), nom: req.body.nom };
    let alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    let index =alumnes.indexOf(alumne);
    alumnes[index]=nouAlumne; // Substitueix un alumne per altre
    res.send();
});
*/


 app.post('/api/alumnes', (req, res)=>{
    console.log('req.body.codi');
    let alumne={codi: parseInt(req.body.codi), nom: req.body.nom };
    alumnes.push(alumne);
    res.send(alumnes);
});
app.delete('/api/alumnes/:codi', (req, res)=>{
    var alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    var index =alumnes.indexOf(alumne); // indexOf et permet obtenir la posició d'un element dins d'una array
    alumnes.splice(index, 1); // (index,1) -> index es la posició on es comença a eliminar i 1 es la QUANTITAT d'elements eliminats
    res.send();
});

 
app.get('/api/aprobats', (req, res)=>{
    let aprobat = alumnes.find(a =>a.nota>=5);
    if (!aprobat) res.status(404, 'error');
    res.send(aprobat);
});
/* El usuaris tindran notes
Afegirem 2 operacions
-Mostrar Aprobats 
-Mitjana de les notes
-Canviar les notes d'una nota per un altre
*/
 app.listen(3000, ()=>console.log('inici servidor'));