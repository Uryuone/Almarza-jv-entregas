let nombre = prompt("Ingrese su nombre: ");
let rut = prompt("Ingrese su RUT: ");

while (nombre === "" || rut === ""){
    alert("Por favor, ingrese su nombre y su RUT.");
    nombre = prompt("Ingrese su nombre: ");
    rut = prompt("Ingrese su RUT: ");
}

let monto = prompt("Ingrese monto a aportar: ");

while (monto === "") {
    alert("Por favor, ingrese el monto a aportar.");
    monto = prompt("Ingrese monto a aportar: ");
}

let cant_causas;

do {
    cant_causas = prompt("¿En cuántas causas le gustaría dividir su donación?");
} while (cant_causas === "");

let montoTotal = parseFloat(monto);
let montoPorCausa;

if (montoTotal >= 10000 && cant_causas > 1) {
    montoPorCausa = montoTotal / cant_causas;

    for (let i = 1; i <= cant_causas; i++) {
        let nombreCausa = prompt(`Ingrese el nombre de la causa ${i}:`);
        alert(`Usted ha donado ${montoPorCausa} a la causa "${nombreCausa}".`);
    }
} else {
    alert("Su donación total es menor a $10000 o la cantidad de causas es insuficiente para dividir la donación.");
}

alert("Los datos de su donación son: " + "Nombre: " + nombre + "  " + "RUT: " + rut + "  " + "Cantidad de causas a la que donará: " + cant_causas + "  " + "Monto por causa: " + montoPorCausa + "  " + "Monto total a donar: " + monto );


