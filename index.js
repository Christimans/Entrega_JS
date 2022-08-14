// Funcion de bienvenida Header 

let ingreso = document.getElementById('header')

let validaciones = document.querySelectorAll('#header input')

// funcion de parametros en la que puede escribir solo letras con espacios y puede llevar acentos con un maximo de 20 caracteres
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,20}$/,
  apellido:  /^[a-zA-ZÀ-ÿ\s]{1,20}$/,
}

// Funcion de validacion de campos

const validaciondeinput = {
  nombre: false,
  apellido: false
}

const validaciondeingreso = (e) => {
  switch (e.target.name) {
    case "nombre":
      if (expresiones.nombre.test(e.target.value)){
        document.getElementById('validationnombre').classList.remove('is-invalid');
        document.getElementById('validationnombre').classList.add('is-valid');   
        validaciondeinput['nombre'] = true;  
      }else {
        document.getElementById('validationnombre').classList.add('is-invalid');
        document.getElementById('validationnombre').classList.remove('is-valid');
      }
    break;

    case "apellido":
      if (expresiones.apellido.test(e.target.value)){
        document.getElementById('validationapellido').classList.remove('is-invalid');
        document.getElementById('validationapellido').classList.add('is-valid');
        validaciondeinput['apellido'] = true;        
      }else {
        document.getElementById('validationapellido').classList.add('is-invalid');
        document.getElementById('validationapellido').classList.remove('is-valid');
      }
    break;
  }
}

validaciones.forEach((input) => {
  input.addEventListener('keyup', validaciondeingreso)
  input.addEventListener('blur', validaciondeingreso)

  
});

ingreso.addEventListener('click', () => {
  
  if (validaciondeinput.nombre && validaciondeinput.apellido) {
   logging()
   obtenerDatos()
  }
})

function logging () {
  let nombre = document.getElementById('validationnombre')
  let apellido = document.getElementById('validationapellido')
  header.innerHTML = `
  <h1>BIENVENIDO ${nombre.value.toUpperCase()} ${apellido.value.toUpperCase()}</h1>` 

}
// Info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};
// FUNCION DE SEGUNDA VENTANA

let segundo =  document.getElementById("segundo")


async function obtenerDatos (){
  try {
    let response = await fetch ("db.json")

    let data = await response.json()

    let cardInput = `<div class="card">
          <div class="card-body">
              <h4 class="card-title">Arma tu espacios</h4>
            <div class="mb-3">
              <label for="bedroom" class="form-label">Elige la cantidad de ${data.espacio[0].lugar}</label>
              <input type="number" class="form-control datosInput" id="bedroom" placeholder="">
            </div>
        
            <div class="mb-3">
              <label for="bath" class="form-label">Elige la cantidad de ${data.espacio[1].lugar}</label>
              <input type="number" class="form-control datosInput" id="bath" placeholder="">
            </div>
            <div class="mb-3">
              <label for="kitchen" class="form-label">Elige la cantidad de ${data.espacio[2].lugar}</label>
              <input type="number" class="form-control datosInput" id="kitchen" placeholder="">
            </div>
            <div class="mb-3">
              <label for="livingroom" class="form-label">Elige la cantidad de ${data.espacio[3].lugar}</label>
              <input type="number" class="form-control datosInput" id="livingroom" placeholder="">
            </div>
            <div class="mb-3">
              <label for="barbecue" class="form-label">Elige la cantidad de ${data.espacio[4].lugar}</label>
              <input type="number" class="form-control datosInput" id="barbecue" placeholder="">
            </div>
            <div class="mb-3">
              <label for="garage" class="form-label">Elige la cantidad de ${data.espacio[5].lugar}</label>
              <input type="number" class="form-control datosInput" id="garage" placeholder="">
            </div>
            <div class="mb-3">
              <label for="gameroom" class="form-label">Elige la cantidad de ${data.espacio[6].lugar}</label>
              <input type="number" class="form-control datosInput" id="gameroom" placeholder="">
            </div>
        
            <button id="enviardatos" type="button" class="btn btn-outline-dark">Enviar</button>
          </div>
        </div>`

    segundo.innerHTML = cardInput

    const DATAINPUT = []

  let enviardatos = document.getElementById("enviardatos")

  enviardatos.addEventListener("click", (e) => {

    let datosInput = document.querySelectorAll(".datosInput")

    datosInput.forEach(e => { DATAINPUT.push(e.value) } )   

    const contenedor = []

    for (let i = 0 ; i < DATAINPUT.length ; i++ ){

     contenedor.push(DATAINPUT[i] * data.espacio[i].dimension)   

    }
    Swal.fire({
      title: `usteded eligio : ${DATAINPUT[0]} 
      ${data.espacio[0].lugar} igual a ${contenedor[0]}m² 
      ${DATAINPUT[1]} ${data.espacio[1].lugar} igual a ${contenedor[1]}m² 
      ${DATAINPUT[2]} ${data.espacio[2].lugar} igual a ${contenedor[2]}m² 
      ${DATAINPUT[3]} ${data.espacio[3].lugar} igual a ${contenedor[3]}m² 
      ${DATAINPUT[4]} ${data.espacio[4].lugar} igual a ${contenedor[4]}m² 
      ${DATAINPUT[5]} ${data.espacio[5].lugar} igual a ${contenedor[5]}m² 
      ${DATAINPUT[6]} ${data.espacio[6].lugar} igual a ${contenedor[6]}m² `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'confirmar',
      denyButtonText: `no confirmar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Gracias por contar con nosotro', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

    
    console.log(contenedor)
  } )
   
  } catch (error) {

    console.log(error)
    
  }
}


setDate();
