//base de datos (personas registradas en el gimnasio)
const request = indexedDB.open('consults')
request.addEventListener('upgradeneeded', () => {
  const db = request.result
  const dbName = db.name
  const objectStore = db.createObjectStore('consult', {
    autoIncrement: true
  })
  console.log('Base de datos: ', dbName)
})

const getDataDB = (idbTransactionMode) => { //recibe como parámetro el modo (escritura o lectura)
  //retorna => 
  //1-base de datos - Nombre de la base de datos - 3 - IDBTranstacion - 4 - ObjectStore
  const db = request.result
  const dbName = db.name
  const transtacion = db.transaction('consult', idbTransactionMode)
  const objectStore = transtacion.objectStore('consult')
  return [db, dbName, transtacion, objectStore]
}
//CRUD
const addObject = object => {
  const dbData = getDataDB('readwrite') //dataArray
  const objectStore = dbData[3]
  const addRequest = objectStore.add(object)

  addRequest.addEventListener('success', () => console.log('Objeto agregado a DB'))
  addRequest.addEventListener('error', () => console.log('El objeto NO pudo ser agregado a DB'))
}

const readObject = () => {
  const result = []
  const dbData = getDataDB('readonly')
  const readPointer = dbData[3].openCursor()
  readPointer.addEventListener('success', () => {
    if (readPointer.result != null) {
      console.log(readPointer.result.value)
      result.push(readPointer.result.value)
      readPointer.result.continue()
    }
  })
  return result
}

const updateObject = (object, key) => {
  const dbData = getDataDB('readwrite')
  const updateRequest = dbData[3].put(object, key)
  updateRequest.addEventListener('success', () => console.log(`Objeto con key ${key} fue modificado con éxito`))
  updateRequest.addEventListener('error', () => console.log(`El objeto con key de referencia ${key} NO pudo ser modificado`))
}

const deleteObject = key => {
  const dbData = getDataDB('readwrite')
  const deleteRequest = dbData[3].delete(key)
  deleteRequest.addEventListener('success', () => console.log(`Objeto con key de referencia ${key} fue eliminado con éxito`))
  deleteRequest.addEventListener('error', () => console.log(`El objeto con key de referencia ${key} NO pudo ser eliminado`))
}

const muscleHours = document.querySelectorAll('.muscle')
const funcionalHours = document.querySelectorAll('.funcional')
const aboutGymContainer = document.getElementById('aboutGym')
const descriptionAboutGym = aboutGymContainer ? aboutGymContainer.querySelector('.description') : null

const addHeaderHour = () => {
  //encabezados
  let newMuscleHeader;
  let newFuncionalHeader;

  muscleHours.forEach(curr => { //curr = div "muscle"
    newMuscleHeader = document.createElement('h3')
    newMuscleHeader.textContent = 'Musculación'
    curr.insertBefore(newMuscleHeader, curr.firstChild)
  });
  funcionalHours.forEach(curr => { //curr = div "funcional")
    newFuncionalHeader = document.createElement('h3')
    newFuncionalHeader.textContent = 'Funcional'
    curr.insertBefore(newFuncionalHeader, curr.firstChild)
  });

}

const addTittleAboutGym = () => {
  let removeTittle = descriptionAboutGym.querySelector('.tittle') //selecciona el titulo para eliminar
  descriptionAboutGym.removeChild(removeTittle)
  let newTittle = document.createElement('h2')
  newTittle.textContent = 'CONOCÉNOS'
  aboutGymContainer.insertBefore(newTittle, aboutGymContainer.firstChild)
}

//a partir de 890px:
if (window.matchMedia("(max-width: 890px)").matches) {
  addHeaderHour()
  addTittleAboutGym()
}


//envio del formulario => validaciones
const contactForm = document.getElementById('form')
const sendButtonContactForm = document.querySelector('.sendButton')
sendButtonContactForm.addEventListener('click', (e) => {
  e.preventDefault();
  //proceso de validaciones
  let showAlert = false; //permite detener la ejecucion del flujo "switch" cuando ya se muestre un alert
  const name = document.getElementById('name').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const message = document.getElementById('message').value

  if (/^[a-zA-Z\s]{4,}$/.test(name) && /^[a-zA-Z\s]{4,}$/.test(lastName) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && /^[a-zA-Z0-9.!$\s]{40,}/.test(message)
  ) {
    const consult = {
      nombre: name,
      apellido: lastName,
      email: email,
      mensaje: message
    }
    //guarda el objeto dentro de DB
    addObject(consult)
    console.log('Consulta registrada en DB')
    alert('¡Consulta enviada con éxito!')
    document.getElementById('name').value = ''
    document.getElementById('lastName').value = ''
    document.getElementById('email').value = ''
    document.getElementById('message').value = ''
    sendButtonContactForm.removeEventListener('click', e)
  } else { //cuando algunos de los campos no este correctamente completado
    switch (name) {
      case '':
        alert('El campo nombre está vacío')
        showAlert = true;
        break
      default:
        if (!(/^[a-zA-Z\s]{4,}$/.test(name))) {
          alert('Ingrese un nombre válido')
          showAlert = true;
        }
    }
    if (!showAlert) {
      switch (lastName) { //en el apellido se permite que esté vacío
        case '':
          alert('El campo apellido está vacío')
          showAlert = true;
          break
        default:
          if (!(/^[a-zA-Z\s]{4,}$/.test(lastName))) {
            alert('Ingrese un apellido válido')
            showAlert = true;
          }
      }
    }
    if (!showAlert) {
      switch (email) {
        case '':
          alert('El campo de email está vacío')
          showAlert = true;
          break
        default:
          if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
            alert('Email inválido. Por favor, ingrese un email válido')
            showAlert = true;
          }
      }
    }
    if (!showAlert) {
      switch (message) {
        default:
          if (!(/^[a-zA-Z0-9.!$\s]{40,}/.test(message))) {
            alert('Ingrese una consulta válida')
            showAlert = true;
          }
      }
    }
  }
})
