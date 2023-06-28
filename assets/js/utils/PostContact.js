import { PropertyData } from "../Data/userId.js";


const form = document.getElementById('form-contact');
let respuesta= document.getElementById('respuesta');

let CompanyId = PropertyData.companyId;


form.addEventListener('submit', function(e) {
    e.preventDefault();

let firstName = document.getElementById('nombre');
let email = document.getElementById('email');
let subject = document.getElementById('sujeto');
let phone = document.getElementById('phone');
let message = document.getElementById('mensaje');

if(firstName.value==='' || email.value==='' || subject.value==='' ||phone.value==='' || message.value===''){
  /* console.log('campos vacios') */
  setTimeout(function () {
    respuesta.innerHTML = `<div class="alert alert-danger" role="alert" style="font-size:13px;">
    Los campos no deben estar vacios.
   <button type="button" class="btn-close text-end" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>`;
  }, 5000);
  return;
}


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
 
let raw = JSON.stringify({
  "companyId":CompanyId,
  "name": firstName.value,
  "lastName":"",
  "email": email.value,
  "phone": phone.value,
  "subject": subject.value,
  "message": message.value,
  "termsAndConditions": true,
  "action": "vender",
  "meetingDate":""
});
 
let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
//   redirect: 'follow'
};
 
fetch("https://aulen.partnersadvisers.info/contact/", requestOptions)
  .then(response => response.text())
  .then((result) => {
    console.log(result)
            if(result.status === 'ok') {
                //Vaciar Inputs
                firstName.value = '';
                email.value = '';
                phone.value = '';
                subject.value = '';
                message.value = '';
                //Mensaje de Alerta : Success
                respuesta.add()
                respuesta.innerHTML = `<div class="alert alert-success" role="alert">
                Formulario enviado exitosamente, Muchas gracias ${fullName.value}!!
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
               </div`;
                setTimeout(function () {
                    // Ocultar alerta despues de 5seg
                    respuesta.remove();
                }, 5000);
                return;
              }
            })
  .catch((error) => {
    respuesta.add(
    //Mensaje de Alerta : Error
    respuesta.innerHTML = `<div class="alert alert-danger" role="alert" style="font-size:13px;">
    Los campos no deben estar vacios.
   <button type="button" class="btn-close text-end" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>`);
    console.log('Error: ', error);
    setTimeout(function () {
        // Ocultar alerta despues de 5seg
        respuesta.remove();
    }, 5000);
  })
})

