
const fs = require('fs');
const equipoA = fs.readFileSync('equipo-A.txt', 'utf8').split('\n');
const equipoB = fs.readFileSync('equipo-B.txt', 'utf8').split('\n');
const log = fs.readFileSync('partido.log', 'utf8').split('\n');

// Recibe un tipo de punto y devuelve su valor
// TRY = 5 puntos
// CONVERSION = 2 puntos
const validoPunto = (tipoDePunto) => {
    switch (tipoDePunto) {
        case "TRY":
            return 5;
        case "CONVERSION":
            return 2;
        default:
            return 0;
    }
}

// Recibe un equipo y devuelve su puntaje, sumando los puntos de cada jugador y almacenándolos como puntos del equipo
// Recorre el array de jugadores del equipo, obtiene el apellido del jugador, lo busca en el log de partidos, si lo encuentra, valida el tipo de punto y lo suma al puntaje del equipo
const calcularPuntosEquipo = (equipo) => {
    let valoresEquipo = {
        puntosEquipo: 0
    }

    let tempMax = 0;

    for (let i = 0; i < equipo.length; i++) {
        let apellido = equipo[i].split(' ')[1]; // separo el apellido del nombre para ubicarlo en el log del partido, separo por el espacio en "Nombre Apellido"
        apellido = apellido.replace(/(\r\n|\n|\r)/gm, "") // elimino los saltos de linea (en la notebook del trabajo aparecian, en mi pc particular no)
        for (let j = 0; j < log.length; j++) { // recorro el log del partido
            if (log[j].includes(apellido)) { // si el apellido del jugador esta la posicion j del log, que sería cada línea
                // acumulo los puntos del jugador en el equipo y sumo todos los puntos de ese jugador
                let tipoDePunto = log[j].split(',')[1];
                tipoDePunto = tipoDePunto.replace(/(\r\n|\n|\r)/gm, "") // elimino los saltos de linea (en la notebook del trabajo aparecian, en mi pc particular no)
                valoresEquipo["puntosEquipo"] += validoPunto(tipoDePunto)
            }
        }
    }
    return valoresEquipo
}

const acumularPuntosJugador = (jugador) => {
    let puntosJugador = 0;
    for (let i = 0; i < log.length; i++) {
        if (log[i].includes(jugador)) {
            let tipoDePunto = log[i].split(',')[1];
            tipoDePunto = tipoDePunto.replace(/(\r\n|\n|\r)/gm, "") // elimino los saltos de linea (en la notebook del trabajo aparecian, en mi pc particular no)
            puntosJugador += validoPunto(tipoDePunto)
        }
    }
    return puntosJugador
}

// Obtiene el mejor jugador sin importar de que equipo sea
const obtenerMejorJugador = () => {
    let mejorJugador = {
        nombreJugador: "",
        puntosJugador: 0
    }



    let equipos = []

    equipoA.forEach(jugador => {
        equipos.push(jugador.replace(/(\r\n|\n|\r)/gm, ""))
    });
    equipoB.forEach(jugador => {
        equipos.push(jugador.replace(/(\r\n|\n|\r)/gm, " "))
    });


    for (let i = 0; i < log.length; i++){
        
    }
}




// Devuelve la distribucion de puntos por tipo de anotación
const obtenerDistribucionPuntos = (partido) => {
    let distribucion = {
        TRY: 0,
        CONVERSION: 0
    }

    for(let i = 0; i < partido.length;i++){
        let tipoDePunto = partido[i].split(',')[1]
        tipoDePunto = tipoDePunto.replace(/(\r\n|\n|\r)/gm, "") // elimino los saltos de linea (en la notebook del trabajo aparecian, en mi pc particular no)
        distribucion[tipoDePunto] += validoPunto(tipoDePunto)
    }

    return distribucion
}

// Imprime el resultado del partido
const obtenerGanador = () => {
    let valoresEquipoA = calcularPuntosEquipo(equipoA);
    let valoresEquipoB = calcularPuntosEquipo(equipoB);
    
    if (valoresEquipoA.puntosEquipo > valoresEquipoB.puntosEquipo) {
        valoresEquipoA.nombreEquipo = "Equipo A"
        return valoresEquipoA
    } else {
        valoresEquipoB.nombreEquipo = "Equipo B"
        return valoresEquipoB
    }
}



console.log("El ganador es: " + JSON.stringify(obtenerGanador()))
console.log("La distribución de puntos es: " + JSON.stringify(obtenerDistribucionPuntos(log)))
obtenerMejorJugador()
// obtenerMejorJugador()

