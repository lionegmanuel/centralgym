//horarios del gimnasio
const muscleHours = document.querySelectorAll('.muscle')
const funcionalHours = document.querySelectorAll('.funcional')
const aboutGymContainer = document.getElementById('aboutGym')
const descriptionAboutGym = aboutGymContainer.firstElementChild

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


//envio del formulario
const contactForm = document.getElementById('form')
const sendButtonContactForm = document.querySelector('.sendButton')
sendButtonContactForm.addEventListener('click', (e) => {
  e.preventDefault();
  //proceso de validaciones
  const name = document.getElementById('name').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const message = document.getElementById('message').value

  if (/^[a-zA-Z\s]{4,}$/.test(name) && /^[a-zA-Z\s]{4,}$/.test(lastName) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && /^[a-zA-Z0-9.!$\s]{40,}/.test(message)
  ) {
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
        break
      default:
        if (!(/^[a-zA-Z\s]{4,}$/.test(name))) {
          alert('Ingrese un nombre válido')
        }
    }
    switch (lastName) { //en el apellido se permite que esté vacío
      case '':
        alert('El campo apellido está vacío')
        break
      default:
        if (!(/^[a-zA-Z\s]{4,}$/.test(lastName))) {
          alert('Ingrese un apellid válido')
        }
    }
    switch (email) {
      case '':
        alert('El campo de email está vacío')
        break
      default:
        if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) alert('Email inválido. Por favor, ingrese un email válido')
    }
    switch (message) {
      default:
        if (!(/^[a-zA-Z0-9.!$\s]{40,}/.test(message))) alert('Ingrese una consulta válida')
    }

  }
})

