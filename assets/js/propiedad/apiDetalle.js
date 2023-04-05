import { getPropertiesForId } from "../services/PropertiesServices.js";
// import { clpToUf } from "../utils/getExchangeRate.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

export default async function apiDetalleCall(id, statusId, companyId){
    let {data} = await getPropertiesForId(id, statusId, companyId );

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

let indicator;
let img;






// console.log(id); // Imprimirá "134" si ese es el valor actual del parámetro "id"

data.images.forEach((images, index) => {img +=
    ` <div class="carousel-item ${ index == 0 ? "active" : ""} ">
        <img src="${images != undefined && images != null && images != "" ? images : "assets/img/Sin.png"}" />
     </div> 	
    `
    indicator += `
    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="${index}" ${index == 0 ? "class = active": ""} aria-current="true" aria-label="${index + 1}"></button>
    `
    })


document.getElementById('titleProp').innerHTML = 
`<div class="row justify-content-center">
    <div class="col-lg-6 text-center">
        <h3 style="text-transform: uppercase; color: #fff;">
            <b>${data.title}</b>
        </h3>
        <p style="font-size: 20px">
            <i class="fa-sharp fa-solid fa-location-dot"></i>
            ${data.city},${data.commune},
            <span>Chile</span>
        </p>
    </div>
</div> `

// document.getElementById('container-carrucel-imgProps').innerHTML = 
// `
// <div
//           id="hero-carousel"
//           class="carousel slide"
//           data-bs-ride="carousel"
//           data-bs-interval="5000"
//           style="height: 80vh !important;"
//         >
//          </div>
            
//           <a
//             class="carousel-control-prev"
//             href="#hero-carousel"
//             role="button"
//             data-bs-slide="prev"
//           >
//             <span
//               class="carousel-control-prev-icon bi bi-chevron-left"
//               aria-hidden="true"
//             ></span>
//           </a>
//           <a
//             class="carousel-control-next"
//             href="#hero-carousel"
//             role="button"
//             data-bs-slide="next"
//           >
//             <span
//               class="carousel-control-next-icon bi bi-chevron-right"
//               aria-hidden="true"
//             ></span>
//           </a>
//         </div>
// `

document.getElementById('container-descrip-propiedad').innerHTML = `
<div class="col-sm-8">
<p class="title" style="font-size: 38px"><b>UF ${clpToUf(data.price, ufValueAsNumber)}</b></p>
<p class="sub-title" style="font-size: 22px">
  CLP ${parseToCLPCurrency(data?.price)}
</p>

<h2 class="title" style="font-size: 30px">
  <b>Descripción</b>
</h2>
<div class="content">
  <p>
    ${data.description != null && data.description != undefined && data.description != "" ? data.description : "No registra descripción" }
  </p>
  <h5>Requisitos</h5>

  <ul>
    <li>
      Excepturi numquam nihil cumque odio. Et voluptate
      cupiditate.
    </li>

    <li>Excepturi numquam nihil cumque oe.</li>

    <li>Excepturi numquam nihil cumque oe.</li>
  </ul>
</div>
</div>
<div class="col-sm-4">
<div class="sidebar">
  <div class="sidebar-item search-form">
    <h3 class="sidebar-title text-uppercase">
      Detalles de la Propiedad
    </h3>
  </div>

  <div class="sidebar-item categories">
    <h3 class="sidebar-title"> ${data.operation} - ${data.types}</h3>

    <ul class="mt-3">
      <li>
        <a href="#"
          >País <span class="text-dark">Chile</span></a
        >
      </li>
      <li>
        <a href="#"
          >Región
          <span class="text-dark">${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}</span></a
        >
      </li>
      <li>
        <a href="#"
          >Ciudad <span class="text-dark">${data.commune  != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}</span></a
        >
      </li>
      <li>
        <a href="#"
          >Código <span class="text-dark">${data.id}</span></a
        >
      </li>
      <li>
        <a href="#"
          >Estado <span class="text-dark">${data.status}</span></a
        >
      </li>
      <li>
        <a href="#"
          >Superficie Construida
          <span class="text-dark">203 m<sup>${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}</sup></span></a
        >
      </li>
      <li>
        <a href="#"
          >Superficie Terreno
          <span class="text-dark">203 m<sup>${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}</sup></span></a
        >
      </li>
      <li>
        <a href="#"
          >Superficie Privada
          <span class="text-dark">203 m<sup>${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}</sup></span></a
        >
      </li>
      <li>
        <a href="#"
          >Habitaciones <span class="text-dark">${data.bedrooms != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}</span></a
        >
      </li>
      <li>
      <a href="#"
        >Habitaciones <span class="text-dark">${data.bathrooms != null && data.bathrooms != undefined && data.bathrooms != "" ? data.bathrooms : "0"}</span></a
      >
    </li>
      <li>
        <a href="#"
          >Estacionamientos
          <span class="text-dark">${data.coveredParkingLots != null && data.coveredParkingLots != undefined && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</span></a
        >
      </li>
    </ul>
  </div> 
</div>
</div>
`
document.getElementById('info-ubicacion').innerHTML = `
<i class="fa-sharp fa-solid fa-location-dot"></i>
<span>${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile</span>
`;

}