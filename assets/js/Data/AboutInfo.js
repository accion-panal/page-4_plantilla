import { AboutInformation } from "../Data/userId.js";

const loadInformation = ()=>{

let nosotros = document.getElementById('nosotro-info');
if (nosotros != null ){
    nosotros.innerHTML = `
    <p>
     ${AboutInformation.nosotros}
    </p>
    `};

let mision = document.getElementById('mision-info');
if (mision != null ){
    mision.innerHTML = `
    <h3>Nuestra Misión</h3>
    <p>
      ${AboutInformation.mision}
    </p>
`};

let vision =document.getElementById('vision-info');
if (vision != null ){
    vision.innerHTML = `<h3>Nuestra Visión</h3>
    <p>
      ${AboutInformation.vision}
    </p>`
}   

}

loadInformation();