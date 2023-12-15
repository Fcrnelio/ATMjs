// Arreglo de cuentas - array - lista de elementos a los que puedes acceder mediante su indice numerico
var cuentas = [
  // OBJETO QUE CONTIENE 3 LLAVES
  {
    nombre: "Mali",
    saldo: 200, 
    password: "1" 
  },
  { nombre: "Gera", saldo: 290, password: "2" },
  { nombre: "Maui", saldo: 67, password: "3" },
];
// scope global, disponible en todo el archivo
var cuentaSeleccionada = null;

// Función para autenticar la cuenta - codigo de bloque reutilizable
function autenticar() {
  // 0, 1 , 2 - === compara el tipo de dato y el valor sean estrictamente iguales
  cuentaSeleccionada = document.getElementById("seleccionarCuenta").value;
  var password = document.getElementById("password").value;
  // el if requiere un valor boolean
  if (cuentas[cuentaSeleccionada].password === password) {
    document.getElementById("opciones").classList.remove("oculto");
    document.getElementById("login").classList.add("oculto");
    document.getElementById("bienvenida").innerHTML =
      "Bienvenid@ " + cuentas[cuentaSeleccionada].nombre;
  } else {
    alert("Contraseña incorrecta. Inténtalo de nuevo.");
    cuentaSeleccionada = null;
  }
}

// Función para consultar saldo
function consultarSaldo() {
  var saldo = cuentas[cuentaSeleccionada].saldo;
  mostrarResultado("Saldo actual: $" + saldo);
}

function errorMonto() {
  alert("Ingresa un monto válido.");
}

// Función para ingresar monto
function ingresarMonto() {
  var monto = parseFloat(prompt("Ingresa el monto a ingresar:"));

  if (!isNaN(monto) && monto > 0) {
    var nuevoMonto = cuentas[cuentaSeleccionada].saldo + monto;
    if (nuevoMonto <= 990) {
      cuentas[cuentaSeleccionada].saldo += monto;
      mostrarResultado(
        "Se ha ingresado $" +
          monto +
          ". Nuevo saldo: $" +
          cuentas[cuentaSeleccionada].saldo
      );
    } else {
      errorMonto();
    }
  } else {
    errorMonto();
  }
}

// Función para retirar monto
function retirarMonto() {
  var monto = parseFloat(prompt("Ingresa el monto a retirar:"));
  if (
    !isNaN(monto) &&
    monto > 0 &&
    monto <= cuentas[cuentaSeleccionada].saldo &&
    cuentas[cuentaSeleccionada].saldo - monto >= 10
  ) {
    // operador de disminucion y reasignacion de valor -=
    cuentas[cuentaSeleccionada].saldo -= monto;
    mostrarResultado(
      "Se ha retirado $" +
        monto +
        ". Nuevo saldo: $" +
        cuentas[cuentaSeleccionada].saldo
    );
  } else {
    alert("Monto inválido o excede los límites.");
  }
}

// Función para mostrar el resultado - el mensaje es el parametro de la funcion
function mostrarResultado(mensaje) {
  document.getElementById("resultado").classList.remove("oculto");
  document.getElementById("resultado").innerHTML = mensaje;
}

function cerrarSesion() {
  cuentaSeleccionada = null;
  alert("Sesion terminada");
  document.getElementById("opciones").classList.add("oculto");
  document.getElementById("login").classList.remove("oculto");
  document.getElementById("resultado").classList.add("oculto");
  /// reset es un metodo para resetear el formulario
  document.getElementById("formulario").reset();
}
