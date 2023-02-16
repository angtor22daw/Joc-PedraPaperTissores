function crearPartida() {
    let formData = new FormData();
    formData.append("codiPartida", document.getElementById("codiPartida").value);
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/iniciarJoc/codiPartida", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "codiPartida": document.getElementById("codiPartida").value }));
}

function tirarMoviment() {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append('codiPartida', document.getElementById("codiPartidaMoviment").value);
    var radioJug = document.getElementsByName("jugador");
    var jugador;
    for (var i = 0; i < radioJug.length; i++) {
        if (radioJug[i].checked) {
            jugador = radioJug[i].value;
            formData.append('jugador', radioJug[i].value);
        }
    }
    var radioMov = document.getElementsByName("jugada");
    var tipusMoviment;
    for (var i = 0; i < radioMov.length; i++) {
        if (radioMov[i].checked) {
            tipusMoviment= radioMov[i].value;
            formData.append('jugada', radioMov[i].value);
        }
    }
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Moviment tirat successfully!");
        }
    };

    xhr.open("PUT", "/moureJugador/codiPartida/jugador/tipusMoviment", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log("codiPartida: " + document.getElementById("codiPartidaMoviment").value);
    console.log("jugador: " + jugador);
    console.log("moviment: " + tipusMoviment);
    xhr.send(JSON.stringify({ "codiPartida": document.getElementById("codiPartidaMoviment").value, "jugador": jugador, "tipusMoviment": tipusMoviment }));

}

function deletePartida() {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append('codiPartida', document.getElementById("codiAcabarPartida").value);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Partida deleted successfully!");
        }
    };

    xhr.open("DELETE", "/acabarJoc/codiPartida", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "codiPartida": document.getElementById("codiAcabarPartida").value }));

}