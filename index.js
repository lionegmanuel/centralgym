const contactForm = document.getElementById('form')
const sendButtonContactForm = document.querySelector('.sendButton')
sendButtonContactForm.addEventListener('click', () => {
  //proceso de validaciones
  const name = document.getElementById('name').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const message = document.getElementById('message').value
  if (name != null && name.lengh > 0 && name != ' ' && lastName != null && lastName.lengh > 0 && lastName != ' '
    && email != null && email != ' ' && email.lengh>0 && email.includes('@') && message != '' && message != ' '
  ) {
    alert('¡Consulta enviada con éxito!')
  } else { //cuando algunos de los campos no este correctamente completado
    if (name === null || name.lengh <= 0 || name === ' ') console.log('Error en el campo de texto NOMBRE')
    if (lastName === null || lastName.lengh <= 0 && lastName === ' ') console.log('Error en el campo de texto del APELLIDO')
    if (email === null || email === ' ' || email.lengh <= 0 || !(email.includes('@'))) console.log('Error en el campo de texto del EMAIL')
    else console.log('Error en el campo e texto del MENSAJE')
  }
})

