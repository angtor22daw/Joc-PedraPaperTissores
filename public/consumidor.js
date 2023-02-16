
// function tirarMoviment() {
//     xhr = new XMLHttpRequest();
//     var x = document.getElementsByName("codiPartida").value;
//     var y = document.getElementsByClassName("jugador").value;
//     var z = document.getElementsByName("jugada").value;
//     xhr.open("PUT", "/moureJugador/" + x + "/" + y + "/" + z, true);
//     xhr.send();
// }

function crearPartida() {
    let formData = new FormData();
    formData.append("codiPartida", document.getElementById("codiPartida").value);
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/iniciarJoc/codiPartida", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "codiPartida": document.getElementById("codiPartida").value }));
}

// function tirarMoviment() {
//     var xhr = new XMLHttpRequest();
//     var formData = new FormData();
//     formData.append('codiPartida', document.getElementById("codiAcabarPartida").value);
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Partida deleted successfully!");
//         }
//     };

//     xhr.open("DELETE", "/acabarJoc/codiPartida", true);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhr.send(JSON.stringify({ "codiPartida": document.getElementById("codiAcabarPartida").value }));

// }

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