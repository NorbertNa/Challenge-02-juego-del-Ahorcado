//Variables iniciales de control, array de inicio para las palabras de la matríz y una palabra seleccionada de manera aleatoria.
var listaPalabras = ["HTML", "ALURA", "PROGRAMA", "CSS", "CURSO", "ORACLE", "ONE", "ESTUDIO", "PALABRA", "SECCION", "SPAN", "INPUT", "VARIABLE", "BORDE", "RADIO", "SCRIPT"];
var palabraNuevaArray = "";
var numIntentos = 0;
var estadoLetra = "";
var letrasIngresadas = "";

//Variables para extraer elementos del HTML para añadir o remover elementos.
var textoFluidoJugar = document.getElementById("contenedor-botones");
var textoFluidoPalabra = document.getElementById("contenedor-dos");
var textoFluidoAhorcado = document.getElementById("contenedor-botones-tres");
var tecladoInvisibilizar = document.getElementById("teclado-virtual");

//Variables para añadir oyentes de eventos, control de botones.
var jugar = document.querySelector("#jugar");
var anhadirPalabra = document.querySelector("#anhadir");
var jugarDeNuevo = document.querySelector("#nuevo-juego");
var guardarYEmpezar = document.querySelector("#anhadir-palabra");
var cancelar = document.querySelector("#cancelar");
var desistir = document.querySelector("#desistir");

//Oyentes de eventos que concluyan en iniciar el juego, como lo son la presión de los botones "Guardar y empezar" y "Jugar".
guardarYEmpezar.addEventListener('click', function()
{
    var palabraNueva = document.getElementById("palabra-nueva").value.toUpperCase();
    anhadirPalabraDiccionario(palabraNueva);
    palabraNuevaArray = "";
});
jugar.addEventListener('click', function()
{
    iniciarJuego();
});

//Oyente de evento para la función que despliega el menú para añadir palabra al diccionario.
anhadirPalabra.addEventListener('click', function()
{
    pantallaAnhadir();
});

//Oyentes de eventos para ir a la página de nuevo juego, o página inicial.
cancelar.addEventListener('click', function()
{
    nuevoJuego();
});
jugarDeNuevo.addEventListener('click', function()
{
    for (var i = 0; i < 10; i++)
    {
        document.querySelector(".contenedor-imagenes-ahorcado").children[i].classList.add("invisible");
    }
    document.getElementById("palabra-nueva").value = "";
    if (palabra.length != 0)
    {
        eliminarAreaDeJuego(palabra);
    }
    document.removeEventListener('keypress', logKey);
    nuevoJuego();
});

//Oyente de evento para desistir.
desistir.addEventListener('click', function()
{
    document.getElementById("palabra-nueva").value = "";
    palabraNuevaArray = "";
    if (palabra.length != 0)
    {
        eliminarAreaDeJuego(palabra);
    }
    document.removeEventListener('keypress', logKey);
    rendirse();
})
function iniciarJuego()
{
    //Detecta la persión del botón de inicio y cambia la página ala página del juego.
    textoFluidoJugar.classList.add("invisible");
    tecladoInvisibilizar.classList.remove("invisible");
    textoFluidoPalabra.classList.add("invisible");
    textoFluidoAhorcado.classList.remove("invisible");

    //Selección aleatoria de palabra
    globalThis.palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];

    //Reset del elemento en el input para palabra nueva.
    for (var i = 0; i < 10; i++)
    {
        document.querySelector(".contenedor-imagenes-ahorcado").children[i].classList.add("invisible");
    }
    document.getElementById('espacio-letras-incorrectas').textContent = "";
    document.getElementById("palabra-nueva").value = "";
    palabraNuevaArray = "";
    letrasIngresadas = "";
    document.querySelector('.cuadro-dialogo').textContent = "Intentos: " + letrasIngresadas;
    dibujarAreaPalabraJuego(palabra);
    addEventListener('keypress', logKey);
}

function verificarLetra(letraAVerificar)
{
    //Básicamente, si la letra que se presione corresponde a una letra y no a un caracter especial.
        //document.addEventListener('keypress', logKey);
    var estadoLetra;
    estadoLetra = "incorrecto";
    var controlLetras = 0;

    for (var i = 0; i < palabra.length; i++)
    {
        if (palabra[i] == letraAVerificar)
        //Aquí muestra la letra correcta.
        {
            document.getElementsByTagName("span")[i].classList.remove("texto-invisible");
            estadoLetra = "correcto";
        }
    }
        //Aquí muestra la letra incorrecta.
    if (estadoLetra == "incorrecto" && letrasIngresadas.includes(letraAVerificar) == false)
    {
        mostrarLetraIncorrecta(letraAVerificar);
        letrasIngresadas = letrasIngresadas + letraAVerificar;
        controlLetras = 1;
    }
    numIntentos = letrasIngresadas.length;
    document.querySelector('.cuadro-dialogo').textContent = "Intentos: " + numIntentos;
    mensajeGanador(palabra);
}

function logKey(letter)
{
    //Esta función guarda en una variable la tecla presionada.
    var letraPresionada = `${letter.key}`.toUpperCase();
    verificarLetra(letraPresionada);
    construirAhogado();
}

function logKeySecond(letter)
{
    //Esta función guarda en una variable la tecla presionada.
    var letraPresionada = letter.toUpperCase();
    verificarLetra(letraPresionada);
    construirAhogado();
}

function anhadirLetra(letra)
{
    //En pocas palabras, si la corresponde al índice se añade en el espacio correspondiente.
    palabraNuevaArray = document.getElementById("palabra-nueva").value + letra;
    document.getElementById("palabra-nueva").value = palabraNuevaArray;
    logKeySecond(letra);
}

function dibujarAreaPalabraJuego(palabra)
{
    //Esta función tiene como objetivo construir las áreas de texto correspondiente a cada letra para el juego del ahorcado.
    for (var i = 0; i < palabra.length; i++)
    {
        globalThis.area = document.createElement('span');
        area.textContent = palabra[i];
        document.getElementById("area-para-letras-juego").appendChild(area);
        area.classList.add("texto-invisible");
        area.classList.add("area-de-juego");
    }
}

function eliminarAreaDeJuego(palabra)
{
    //Esta función lo que hace es eliminar el área de juego creada a partir de la función "dibujarAreaPalabraJuego".
    while (document.getElementById("area-para-letras-juego").firstChild)
    {
        document.getElementById("area-para-letras-juego").removeChild(document.getElementById("area-para-letras-juego").firstChild);
    }
}

function mostrarLetraIncorrecta(letraIncorrecta)
{
    //Si no correpsonde la letra, se muestra debajo del espacio para la palabra.
    var espacioLetrasIncorrectas = document.getElementById('espacio-letras-incorrectas');
    espacioLetrasIncorrectas.textContent = espacioLetrasIncorrectas.textContent + letraIncorrecta;
}

function mensajeGanador(palabra)
{
    //En el momento que se gana, mostrar un mensaje.
    var j = 0;
    for (var i = 0; i < palabra.length; i++)
    {
        if(document.getElementsByTagName("span")[i].classList.value.includes('texto-invisible') == false)
        {
            j++;
        }
        if(j == palabra.length)
        {
            alert("¡Felicidades, has ganado!");
        }
    }
}

function construirAhogado()
{
    //Aquí se dibuja el layout del ahorcado de manera procedural.
    var espacioAhogado = document.querySelector('.contenedor-imagenes-ahorcado');
    espacioAhogado.children[numIntentos - 1].classList.remove("invisible");
    if(numIntentos == 10)
    {
        perdiste();
    }
}

function nuevoJuego()
{
    //Función para designar un nuevo juego al momento de presionar el botón correspondiente.
    textoFluidoJugar.classList.remove("invisible");
    textoFluidoPalabra.classList.add("invisible");
    tecladoInvisibilizar.classList.add("invisible");
    textoFluidoAhorcado.classList.add("invisible");
    document.getElementById("palabra-nueva").value = "";
    letrasIngresadas = "";
    document.querySelector('.cuadro-dialogo').textContent = "Intentos: " + letrasIngresadas;
}

function pantallaAnhadir()
{
    //En esta función se añaden palabras de un input type text al array principal.
    textoFluidoJugar.classList.add("invisible");
    textoFluidoPalabra.classList.remove("invisible");
    tecladoInvisibilizar.classList.remove("invisible");
    textoFluidoAhorcado.classList.add("invisible");
}

function anhadirPalabraDiccionario(palabraNueva)
{
    //Función que añade a listaPalabras una palabra de máximo ocho caracteres.
    if (palabraNueva.length <= 8 && palabraNueva.length != 0)
    {
        listaPalabras.push(palabraNueva);
        iniciarJuego();
        return true;
    }
    else if (palabraNueva.length == 0)
    {
        alert("¡No has escrito nada!");
        return false;
    }
    else
    {
        alert("¡La palabra no puede ser añadida, máximo debe contener 8 caracteres!");
        return false;
    }
}

function rendirse()
{
    alert("¡Es una pena! La palabra a adivinar era: " + palabra);
    nuevoJuego();
}

function perdiste()
{
    alert("¡Perdiste, es una lástima! La palabra correcta era: '" + palabra + "'");
    for (var i = 0; i < 10; i++)
    {
        document.querySelector(".contenedor-imagenes-ahorcado").children[i].classList.add("invisible");
    }
    nuevoJuego();
}

//OPCIONAL, AL FINAL

function guiaRapida()
{
    //Pequeña guía mostrada al principio para enseñar al espectador a utilizar la página. Aún por decidir el formato.
}

function mensajeEspecial()
{
    //Idear mecánica para mensajes especiales como el ganador sin ninguna letra incorrecta o el que estuvo a una letra de perder. Mensajes tipo "Eres intocable" o "Salvado por la campana", etc.
}