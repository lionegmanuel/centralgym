//horarios del gimnasio
const muscleHours = document.querySelector('.muscle')
const funcionalHours = document.querySelector('.funcional')

const addHeaderHour = () => {
  const newMuscleHeader = document.createElement('h3')
  const newFuncionalHeader = document.createElement('h3')
  newMuscleHeader.textContent = 'Musculación'
  newFuncionalHeader.textContent = 'Funcional'
  muscleHours.appendChild(newMuscleHeader)
  funcionalHours.appendChild(newFuncionalHeader)
}

//a partir de 890px:
if (window.matchMedia("(max-width: 890px)").matches) {
  addHeaderHour()
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
    document.getElementById('email').value=''
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

