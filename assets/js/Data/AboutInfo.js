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
};

/* IMAGEN DE VISION Y MISION*/
let fotonosotros = document.getElementById('fotoabout');
if (fotonosotros !==null){
  fotonosotros.innerHTML = `
  <img src='${AboutInformation.fotonosotros}' style='width: 100%; height: 90%; float: left;'/>
  `;
}


}

loadInformation();


