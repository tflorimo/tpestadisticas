
const fs = require('fs');
const equipoA = fs.readFileSync('equipo-A.txt', 'utf8').split('\n');
const equipoB = fs.readFileSync('equipo-B.txt', 'utf8').split('\n');
const log = fs.readFileSync('partido.log', 'utf8').split('\n');

// Recibe un tipo de punto y devuelve su valor
// TRY = 5 puntos
// CONVERSION = 2 puntos
const validoPunto = (tipoDePunto) => {
    switch (tipoDePunto) {
        case 'TRY':
            return 5;
        case 'CONVERSION':
            return 2;
        default:
            return 0;
    }
}

const calcularPuntosEquipo = (equipo) => {
    let puntosEquipo = 0
    let puntosJugador = 0
    for (let i = 0; i < equipo.length; i++) {
        let apellido = equipo[i].split(' ')[1]; // separo el apellido del nombre para ubicarlo en el log del partido, separo por el espacio en "Nombre Apellido"
        for (let j = 0; j < log.length; j++) { // recorro el log del partido
            if (log[j].includes(apellido)) { // si el apellido del jugador esta la posicion j del log, que sería cada línea
                let tipoDePunto = log[j].split(',')[1];
                puntosJugador = validoPunto(tipoDePunto)
                puntosEquipo += puntosJugador
            }
        }
    }
    return puntosEquipo
}

const obtenerGanador = () => {
    let puntosEquipoA = calcularPuntosEquipo(equipoA);
    let puntosEquipoB = calcularPuntosEquipo(equipoB);
    return puntosEquipoA > puntosEquipoB ? "Equipo A" : "Equipo B";
}

console.log("El ganador es: " + obtenerGanador())

// calcularPuntosEquipo(equipoB);