//Lista para almacenar las personas
let listaPersonas = [];

const objPersona = {
    id: '',
    nombre: '',
    ocupacion: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const ocupacionInput = document.querySelector('#ocupacion');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);


function validarFormulario(e) {
    e.preventDefault();

    //Validamos que los campos esten completos 
    if(nombreInput.value === '' || ocupacionInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarPersona();
        editando = false;
    } else {
        objPersona.id = Date.now();
        objPersona.nombre = nombreInput.value;
        objPersona.ocupacion = ocupacionInput.value;

        agregarPersona();
    }
}

function agregarPersona() {

    listaPersonas.push({...objPersona});

    mostrarPersonas();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objPersona.id = '';
    objPersona.nombre = '';
    objPersona.ocupacion = '';
}

function mostrarPersonas() {
    limpiarHTML();

    const divPersonas = document.querySelector('.div-personas');
    
    //Iteramos la lista de objetos
    listaPersonas.forEach(persona => {
        const {id, nombre, ocupacion} = persona;

        //Creamos el html que muestre las personas
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${ocupacion} `;
        parrafo.dataset.id = id;

        //Creamos el boton de editarPersona
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarPersona(persona);
        editarBoton.textContent = '.....';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        //Creamos el boton de eliminarPersona
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarPersona(id);
        eliminarBoton.textContent = '......';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divPersonas.appendChild(parrafo);
        divPersonas.appendChild(hr);
    });
} 

function cargarPersona(persona) {
    const {id, nombre, ocupacion} = persona;

    nombreInput.value = nombre;
    ocupacionInput.value = ocupacion;

    objPersona.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarPersona() {

    objPersona.nombre = nombreInput.value;
    objPersona.ocupacion = ocupacionInput.value;

    listaPersonas.map(persona => {

        if(persona.id === objPersona.id) {
            persona.id = objPersona.id;
            persona.nombre = objPersona.nombre;
            persona.ocupacion = objPersona.ocupacion;
        }
    });

    limpiarHTML();
    mostrarPersonas();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarPersona(id) {

    listaPersonas = listaPersonas.filter(persona => persona.id !== id);

    limpiarHTML();
    mostrarPersonas();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-personas');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}